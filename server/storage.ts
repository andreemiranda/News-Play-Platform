import type { 
  WPPost, 
  WPCategory, 
  WPTag, 
  WPPage, 
  WPMedia, 
  WPAuthor, 
  SyncStatus, 
  SearchIndex,
  PostsResponse,
  CategoriesResponse,
  TagsResponse,
  SearchResponse
} from '@shared/schema';

export interface IStorage {
  // Posts
  savePost(post: WPPost): void;
  getPost(id: number): WPPost | undefined;
  getPostBySlug(slug: string): WPPost | undefined;
  getAllPosts(): WPPost[];
  getPostsByCategory(categoryId: number, page?: number, perPage?: number): PostsResponse;
  getPostsByTag(tagId: number, page?: number, perPage?: number): PostsResponse;
  getPosts(page?: number, perPage?: number): PostsResponse;
  getRecentPosts(count: number): WPPost[];
  clearPosts(): void;
  getPostsCount(): number;

  // Categories
  saveCategory(category: WPCategory): void;
  getCategory(id: number): WPCategory | undefined;
  getCategoryBySlug(slug: string): WPCategory | undefined;
  getAllCategories(): WPCategory[];
  getCategoriesCount(): number;

  // Tags
  saveTag(tag: WPTag): void;
  getTag(id: number): WPTag | undefined;
  getTagBySlug(slug: string): WPTag | undefined;
  getAllTags(): WPTag[];
  getPopularTags(count: number): WPTag[];
  getTagsCount(): number;

  // Pages
  savePage(page: WPPage): void;
  getPage(id: number): WPPage | undefined;
  getPageBySlug(slug: string): WPPage | undefined;
  getAllPages(): WPPage[];

  // Media
  saveMedia(media: WPMedia): void;
  getMedia(id: number): WPMedia | undefined;
  getAllMedia(): WPMedia[];

  // Authors
  saveAuthor(author: WPAuthor): void;
  getAuthor(id: number): WPAuthor | undefined;
  getAllAuthors(): WPAuthor[];

  // Search
  updateSearchIndex(searchIndex: SearchIndex[]): void;
  search(query: string, filters?: { category?: string; tag?: string; author?: string; dateFrom?: string; dateTo?: string }): SearchResponse;
  cleanOldSearchIndex(): void;

  // Sync Status
  updateSyncStatus(status: SyncStatus): void;
  getSyncStatus(): SyncStatus;
}

export class MemStorage implements IStorage {
  private posts: Map<number, WPPost> = new Map();
  private categories: Map<number, WPCategory> = new Map();
  private tags: Map<number, WPTag> = new Map();
  private pages: Map<number, WPPage> = new Map();
  private media: Map<number, WPMedia> = new Map();
  private authors: Map<number, WPAuthor> = new Map();
  private searchIndex: SearchIndex[] = [];
  private syncStatus: SyncStatus = {
    lastSync: new Date().toISOString(),
    postsCount: 0,
    categoriesCount: 0,
    tagsCount: 0,
    isOnline: false,
    nextSync: new Date(Date.now() + 25000).toISOString(),
  };

  // Posts
  savePost(post: WPPost): void {
    this.posts.set(post.id, post);
  }

  getPost(id: number): WPPost | undefined {
    return this.posts.get(id);
  }

  getPostBySlug(slug: string): WPPost | undefined {
    return Array.from(this.posts.values()).find(post => post.slug === slug);
  }

  getAllPosts(): WPPost[] {
    return Array.from(this.posts.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  getPosts(page = 1, perPage = 10): PostsResponse {
    const allPosts = this.getAllPosts();
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const posts = allPosts.slice(start, end);
    
    return {
      posts,
      total: allPosts.length,
      pages: Math.ceil(allPosts.length / perPage),
    };
  }

  getPostsByCategory(categoryId: number, page = 1, perPage = 10): PostsResponse {
    const allPosts = this.getAllPosts().filter(post => 
      post.categories.includes(categoryId)
    );
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const posts = allPosts.slice(start, end);
    
    return {
      posts,
      total: allPosts.length,
      pages: Math.ceil(allPosts.length / perPage),
    };
  }

  getPostsByTag(tagId: number, page = 1, perPage = 10): PostsResponse {
    const allPosts = this.getAllPosts().filter(post => 
      post.tags.includes(tagId)
    );
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const posts = allPosts.slice(start, end);
    
    return {
      posts,
      total: allPosts.length,
      pages: Math.ceil(allPosts.length / perPage),
    };
  }

  getRecentPosts(count: number): WPPost[] {
    return this.getAllPosts().slice(0, count);
  }

  clearPosts(): void {
    this.posts.clear();
  }

  getPostsCount(): number {
    return this.posts.size;
  }

  // Categories
  saveCategory(category: WPCategory): void {
    this.categories.set(category.id, category);
  }

  getCategory(id: number): WPCategory | undefined {
    return this.categories.get(id);
  }

  getCategoryBySlug(slug: string): WPCategory | undefined {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  getAllCategories(): WPCategory[] {
    return Array.from(this.categories.values()).sort((a, b) => b.count - a.count);
  }

  getCategoriesCount(): number {
    return this.categories.size;
  }

  // Tags
  saveTag(tag: WPTag): void {
    this.tags.set(tag.id, tag);
  }

  getTag(id: number): WPTag | undefined {
    return this.tags.get(id);
  }

  getTagBySlug(slug: string): WPTag | undefined {
    return Array.from(this.tags.values()).find(tag => tag.slug === slug);
  }

  getAllTags(): WPTag[] {
    return Array.from(this.tags.values()).sort((a, b) => b.count - a.count);
  }

  getPopularTags(count: number): WPTag[] {
    return this.getAllTags().slice(0, count);
  }

  getTagsCount(): number {
    return this.tags.size;
  }

  // Pages
  savePage(page: WPPage): void {
    this.pages.set(page.id, page);
  }

  getPage(id: number): WPPage | undefined {
    return this.pages.get(id);
  }

  getPageBySlug(slug: string): WPPage | undefined {
    return Array.from(this.pages.values()).find(page => page.slug === slug);
  }

  getAllPages(): WPPage[] {
    return Array.from(this.pages.values());
  }

  // Media
  saveMedia(media: WPMedia): void {
    this.media.set(media.id, media);
  }

  getMedia(id: number): WPMedia | undefined {
    return this.media.get(id);
  }

  getAllMedia(): WPMedia[] {
    return Array.from(this.media.values());
  }

  // Authors
  saveAuthor(author: WPAuthor): void {
    this.authors.set(author.id, author);
  }

  getAuthor(id: number): WPAuthor | undefined {
    return this.authors.get(id);
  }

  getAllAuthors(): WPAuthor[] {
    return Array.from(this.authors.values());
  }

  // Search
  updateSearchIndex(searchIndex: SearchIndex[]): void {
    this.searchIndex = searchIndex;
  }

  search(query: string, filters?: { 
    category?: string; 
    tag?: string; 
    author?: string; 
    dateFrom?: string; 
    dateTo?: string;
  }): SearchResponse {
    if (!query.trim() && !filters) {
      return { results: [], total: 0 };
    }

    let results = this.searchIndex;

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.excerpt.toLowerCase().includes(searchTerm) ||
        item.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        item.author.toLowerCase().includes(searchTerm)
      );
    }

    // Apply filters
    if (filters) {
      if (filters.category) {
        results = results.filter(item => 
          item.categories.some(cat => cat.toLowerCase().includes(filters.category!.toLowerCase()))
        );
      }

      if (filters.tag) {
        results = results.filter(item =>
          item.tags.some(tag => tag.toLowerCase().includes(filters.tag!.toLowerCase()))
        );
      }

      if (filters.author) {
        results = results.filter(item =>
          item.author.toLowerCase().includes(filters.author!.toLowerCase())
        );
      }

      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        results = results.filter(item => new Date(item.date) >= fromDate);
      }

      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        results = results.filter(item => new Date(item.date) <= toDate);
      }
    }

    // Sort by relevance (date for now)
    results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      results,
      total: results.length,
    };
  }

  cleanOldSearchIndex(): void {
    // Keep only search index for posts that still exist
    const existingPostIds = new Set(this.posts.keys());
    this.searchIndex = this.searchIndex.filter(item => existingPostIds.has(item.postId));
  }

  // Sync Status
  updateSyncStatus(status: SyncStatus): void {
    this.syncStatus = status;
  }

  getSyncStatus(): SyncStatus {
    return this.syncStatus;
  }
}

export const storage = new MemStorage();
