import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { syncManager } from "./services/syncManager";

export async function registerRoutes(app: Express): Promise<Server> {
  // WordPress data endpoints
  app.get("/api/posts", (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.per_page as string) || 10;
      const categoryId = req.query.category ? parseInt(req.query.category as string) : undefined;
      const tagId = req.query.tag ? parseInt(req.query.tag as string) : undefined;

      let result;
      if (categoryId) {
        result = storage.getPostsByCategory(categoryId, page, perPage);
      } else if (tagId) {
        result = storage.getPostsByTag(tagId, page, perPage);
      } else {
        result = storage.getPosts(page, perPage);
      }

      res.json(result);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/recent", (req, res) => {
    try {
      const count = parseInt(req.query.count as string) || 8;
      const posts = storage.getRecentPosts(count);
      res.json({ posts });
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      res.status(500).json({ error: "Failed to fetch recent posts" });
    }
  });

  app.get("/api/posts/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = storage.getPost(id);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/posts/slug/:slug", (req, res) => {
    try {
      const slug = req.params.slug;
      const post = storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/categories", (req, res) => {
    try {
      const categories = storage.getAllCategories();
      res.json({ categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", (req, res) => {
    try {
      const slug = req.params.slug;
      const category = storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/tags", (req, res) => {
    try {
      const tags = storage.getAllTags();
      res.json({ tags });
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  });

  app.get("/api/tags/popular", (req, res) => {
    try {
      const count = parseInt(req.query.count as string) || 10;
      const tags = storage.getPopularTags(count);
      res.json({ tags });
    } catch (error) {
      console.error("Error fetching popular tags:", error);
      res.status(500).json({ error: "Failed to fetch popular tags" });
    }
  });

  app.get("/api/search", (req, res) => {
    try {
      const query = req.query.q as string || '';
      const category = req.query.category as string;
      const tag = req.query.tag as string;
      const author = req.query.author as string;
      const dateFrom = req.query.date_from as string;
      const dateTo = req.query.date_to as string;

      const filters: any = {};
      if (category) filters.category = category;
      if (tag) filters.tag = tag;
      if (author) filters.author = author;
      if (dateFrom) filters.dateFrom = dateFrom;
      if (dateTo) filters.dateTo = dateTo;

      const result = storage.search(query, Object.keys(filters).length > 0 ? filters : undefined);
      res.json(result);
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ error: "Failed to perform search" });
    }
  });

  app.get("/api/sync/status", (req, res) => {
    try {
      const status = storage.getSyncStatus();
      const managerStatus = syncManager.getStatus();
      
      res.json({
        ...status,
        isSync: managerStatus.isSync,
        nextSyncTime: managerStatus.nextSyncTime,
      });
    } catch (error) {
      console.error("Error fetching sync status:", error);
      res.status(500).json({ error: "Failed to fetch sync status" });
    }
  });

  app.post("/api/sync/trigger", async (req, res) => {
    try {
      await syncManager.triggerSync();
      res.json({ message: "Sync triggered successfully" });
    } catch (error) {
      console.error("Error triggering sync:", error);
      res.status(500).json({ error: "Failed to trigger sync" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
