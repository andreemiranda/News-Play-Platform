import { wordpressApi } from './wordpressApi';
import { storage } from '../storage';
import type { WPPost, WPCategory, WPTag, WPPage, WPMedia, WPAuthor, SearchIndex } from '@shared/schema';

export class SyncManager {
  private syncInterval: NodeJS.Timeout | null = null;
  private currentCategoryIndex = 0;
  private isSync = false;
  private lastSyncTime = new Date();

  constructor() {
    this.startSyncLoop();
  }

  private startSyncLoop() {
    // Initial sync
    this.performSync();

    // Set up 25-second interval
    this.syncInterval = setInterval(() => {
      this.performSync();
    }, 25000);

    console.log('WordPress sync manager started - syncing every 25 seconds');
  }

  private async performSync() {
    if (this.isSync) {
      console.log('Sync already in progress, skipping...');
      return;
    }

    this.isSync = true;
    const startTime = Date.now();

    try {
      console.log('Starting WordPress sync...');

      // Check connection first
      const isOnline = await wordpressApi.checkStatus();
      
      if (!isOnline) {
        console.warn('WordPress API is not responding');
        storage.updateSyncStatus({
          lastSync: new Date().toISOString(),
          isOnline: false,
          nextSync: new Date(Date.now() + 25000).toISOString(),
          postsCount: storage.getPostsCount(),
          categoriesCount: storage.getCategoriesCount(),
          tagsCount: storage.getTagsCount(),
        });
        return;
      }

      // Sync categories and tags first (they're needed for posts)
      await this.syncCategories();
      await this.syncTags();

      // Sync recent posts (8 most recent)
      await this.syncRecentPosts();

      // Sync posts by category rotation
      await this.syncPostsByCategory();

      // Sync pages occasionally (every 10 syncs)
      if (Date.now() % 10 === 0) {
        await this.syncPages();
      }

      // Update search index
      this.updateSearchIndex();

      // Update sync status
      storage.updateSyncStatus({
        lastSync: new Date().toISOString(),
        isOnline: true,
        nextSync: new Date(Date.now() + 25000).toISOString(),
        postsCount: storage.getPostsCount(),
        categoriesCount: storage.getCategoriesCount(),
        tagsCount: storage.getTagsCount(),
      });

      const duration = Date.now() - startTime;
      console.log(`WordPress sync completed in ${duration}ms`);

      // Garbage collection to manage memory
      this.performGarbageCollection();

    } catch (error) {
      console.error('Sync error:', error);
      storage.updateSyncStatus({
        lastSync: new Date().toISOString(),
        isOnline: false,
        nextSync: new Date(Date.now() + 25000).toISOString(),
        postsCount: storage.getPostsCount(),
        categoriesCount: storage.getCategoriesCount(),
        tagsCount: storage.getTagsCount(),
      });
    } finally {
      this.isSync = false;
      this.lastSyncTime = new Date();
    }
  }

  private async syncCategories() {
    try {
      const { data: categories } = await wordpressApi.getCategories({ per_page: 100 });
      
      for (const category of categories) {
        storage.saveCategory(category);
      }

      console.log(`Synced ${categories.length} categories`);
    } catch (error) {
      console.error('Error syncing categories:', error);
    }
  }

  private async syncTags() {
    try {
      const { data: tags } = await wordpressApi.getTags({ per_page: 100 });
      
      for (const tag of tags) {
        storage.saveTag(tag);
      }

      console.log(`Synced ${tags.length} tags`);
    } catch (error) {
      console.error('Error syncing tags:', error);
    }
  }

  private async syncRecentPosts() {
    try {
      const { data: posts } = await wordpressApi.getPosts({ 
        per_page: 8,
        orderby: 'date',
        order: 'desc',
      });

      for (const post of posts) {
        storage.savePost(post);
      }

      console.log(`Synced ${posts.length} recent posts`);
    } catch (error) {
      console.error('Error syncing recent posts:', error);
    }
  }

  private async syncPostsByCategory() {
    try {
      const categories = storage.getAllCategories();
      
      if (categories.length === 0) {
        console.log('No categories available for rotation sync');
        return;
      }

      // Rotate through categories
      const category = categories[this.currentCategoryIndex];
      this.currentCategoryIndex = (this.currentCategoryIndex + 1) % categories.length;

      const { data: posts } = await wordpressApi.getPostsByCategory(category.id, {
        per_page: 5,
      });

      for (const post of posts) {
        storage.savePost(post);
      }

      console.log(`Synced ${posts.length} posts from category: ${category.name}`);
    } catch (error) {
      console.error('Error syncing posts by category:', error);
    }
  }

  private async syncPages() {
    try {
      const { data: pages } = await wordpressApi.getPages({ per_page: 20 });
      
      for (const page of pages) {
        storage.savePage(page);
      }

      console.log(`Synced ${pages.length} pages`);
    } catch (error) {
      console.error('Error syncing pages:', error);
    }
  }

  private updateSearchIndex() {
    try {
      const posts = storage.getAllPosts();
      const categories = storage.getAllCategories();
      const tags = storage.getAllTags();

      // Create search index entries
      const searchIndex: SearchIndex[] = posts.map(post => {
        const postCategories = post.categories.map(catId => {
          const category = categories.find(c => c.id === catId);
          return category ? category.name : '';
        }).filter(Boolean);

        const postTags = post.tags.map(tagId => {
          const tag = tags.find(t => t.id === tagId);
          return tag ? tag.name : '';
        }).filter(Boolean);

        // Get author name from embedded data or fallback
        let authorName = 'NewsPlay';
        if (post._embedded?.author?.[0]) {
          authorName = post._embedded.author[0].name;
        }

        return {
          postId: post.id,
          title: post.title.rendered,
          content: this.stripHtml(post.content.rendered),
          excerpt: this.stripHtml(post.excerpt.rendered),
          categories: postCategories,
          tags: postTags,
          author: authorName,
          date: post.date,
        };
      });

      storage.updateSearchIndex(searchIndex);
      console.log(`Updated search index with ${searchIndex.length} entries`);
    } catch (error) {
      console.error('Error updating search index:', error);
    }
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
  }

  private performGarbageCollection() {
    try {
      // Keep only last 500 posts to manage memory
      const posts = storage.getAllPosts();
      if (posts.length > 500) {
        const sortedPosts = posts.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const postsToKeep = sortedPosts.slice(0, 500);
        storage.clearPosts();
        postsToKeep.forEach(post => storage.savePost(post));
        console.log(`Garbage collection: kept ${postsToKeep.length} most recent posts`);
      }

      // Clean old search index entries
      storage.cleanOldSearchIndex();
    } catch (error) {
      console.error('Error during garbage collection:', error);
    }
  }

  public getStatus() {
    return {
      isSync: this.isSync,
      lastSyncTime: this.lastSyncTime,
      nextSyncTime: new Date(this.lastSyncTime.getTime() + 25000),
      currentCategoryIndex: this.currentCategoryIndex,
    };
  }

  public stop() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('WordPress sync manager stopped');
    }
  }

  // Manual sync trigger
  public async triggerSync() {
    if (!this.isSync) {
      await this.performSync();
    }
  }
}

export const syncManager = new SyncManager();
