import { z } from "zod";

// WordPress Post Schema
export const wpPostSchema = z.object({
  id: z.number(),
  date: z.string(),
  date_gmt: z.string(),
  modified: z.string(),
  slug: z.string(),
  status: z.string(),
  type: z.string(),
  link: z.string(),
  title: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
    protected: z.boolean().optional(),
  }),
  excerpt: z.object({
    rendered: z.string(),
    protected: z.boolean().optional(),
  }),
  author: z.number(),
  featured_media: z.number(),
  comment_status: z.string(),
  categories: z.array(z.number()),
  tags: z.array(z.number()),
  _embedded: z.object({
    author: z.array(z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })).optional(),
    "wp:featuredmedia": z.array(z.object({
      id: z.number(),
      source_url: z.string(),
      alt_text: z.string(),
      media_details: z.object({
        width: z.number(),
        height: z.number(),
        sizes: z.record(z.object({
          source_url: z.string(),
          width: z.number(),
          height: z.number(),
        })).optional(),
      }).optional(),
    })).optional(),
    "wp:term": z.array(z.array(z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
      taxonomy: z.string(),
    }))).optional(),
  }).optional(),
});

// WordPress Category Schema
export const wpCategorySchema = z.object({
  id: z.number(),
  count: z.number(),
  description: z.string(),
  link: z.string(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  parent: z.number(),
});

// WordPress Tag Schema
export const wpTagSchema = z.object({
  id: z.number(),
  count: z.number(),
  description: z.string(),
  link: z.string(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
});

// WordPress Page Schema
export const wpPageSchema = z.object({
  id: z.number(),
  date: z.string(),
  slug: z.string(),
  status: z.string(),
  type: z.string(),
  link: z.string(),
  title: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
    protected: z.boolean().optional(),
  }),
  excerpt: z.object({
    rendered: z.string(),
    protected: z.boolean().optional(),
  }),
  author: z.number(),
  featured_media: z.number(),
  parent: z.number(),
  menu_order: z.number(),
});

// WordPress Media Schema
export const wpMediaSchema = z.object({
  id: z.number(),
  date: z.string(),
  slug: z.string(),
  type: z.string(),
  link: z.string(),
  title: z.object({
    rendered: z.string(),
  }),
  author: z.number(),
  media_type: z.string(),
  mime_type: z.string(),
  source_url: z.string(),
  alt_text: z.string(),
  media_details: z.object({
    width: z.number(),
    height: z.number(),
    file: z.string(),
    sizes: z.record(z.object({
      file: z.string(),
      width: z.number(),
      height: z.number(),
      mime_type: z.string(),
      source_url: z.string(),
    })).optional(),
  }).optional(),
});

// WordPress Author Schema
export const wpAuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  description: z.string(),
  link: z.string(),
  slug: z.string(),
  avatar_urls: z.record(z.string()).optional(),
});

// Sync Status Schema
export const syncStatusSchema = z.object({
  lastSync: z.string(),
  postsCount: z.number(),
  categoriesCount: z.number(),
  tagsCount: z.number(),
  isOnline: z.boolean(),
  nextSync: z.string(),
});

// Search Index Schema
export const searchIndexSchema = z.object({
  postId: z.number(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  author: z.string(),
  date: z.string(),
});

// Export types
export type WPPost = z.infer<typeof wpPostSchema>;
export type WPCategory = z.infer<typeof wpCategorySchema>;
export type WPTag = z.infer<typeof wpTagSchema>;
export type WPPage = z.infer<typeof wpPageSchema>;
export type WPMedia = z.infer<typeof wpMediaSchema>;
export type WPAuthor = z.infer<typeof wpAuthorSchema>;
export type SyncStatus = z.infer<typeof syncStatusSchema>;
export type SearchIndex = z.infer<typeof searchIndexSchema>;

// API Response Schemas
export const postsResponseSchema = z.object({
  posts: z.array(wpPostSchema),
  total: z.number(),
  pages: z.number(),
});

export const categoriesResponseSchema = z.object({
  categories: z.array(wpCategorySchema),
});

export const tagsResponseSchema = z.object({
  tags: z.array(wpTagSchema),
});

export const searchResponseSchema = z.object({
  results: z.array(searchIndexSchema),
  total: z.number(),
});

export type PostsResponse = z.infer<typeof postsResponseSchema>;
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;
export type TagsResponse = z.infer<typeof tagsResponseSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
