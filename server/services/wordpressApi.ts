import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type { WPPost, WPCategory, WPTag, WPPage, WPMedia, WPAuthor } from '@shared/schema';

export class WordPressApi {
  private client: AxiosInstance;
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.WP_BASE_URL || 'https://tocanteen.com.br/wp-json/';
    this.apiKey = process.env.WP_API_KEY || 'wpapi_db57e3c87a1adbecf8a82e1efc0ddb3ff26e64ff6b95faaf';
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'NewsPlay-Client/1.0',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(`WordPress API Error: ${error.message}`, {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      }
    );
  }

  async checkStatus(): Promise<boolean> {
    try {
      const response = await this.client.get('/wp-apirest/v1/status/');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get('/wp-apirest/v1/test/');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async getPosts(params: {
    page?: number;
    per_page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<{ data: WPPost[]; total: number; pages: number }> {
    try {
      const queryParams = {
        _embed: true,
        page: params.page || 1,
        per_page: params.per_page || 10,
        orderby: params.orderby || 'date',
        order: params.order || 'desc',
        ...params,
      };

      const response: AxiosResponse<WPPost[]> = await this.client.get('/wp/v2/posts', {
        params: queryParams,
      });

      const total = parseInt(response.headers['x-wp-total'] || '0');
      const pages = parseInt(response.headers['x-wp-totalpages'] || '1');

      return {
        data: response.data,
        total,
        pages,
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { data: [], total: 0, pages: 0 };
    }
  }

  async getPost(id: number): Promise<WPPost | null> {
    try {
      const response: AxiosResponse<WPPost> = await this.client.get(`/wp/v2/posts/${id}`, {
        params: { _embed: true },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      return null;
    }
  }

  async getPostBySlug(slug: string): Promise<WPPost | null> {
    try {
      const response = await this.getPosts({ per_page: 1, search: slug });
      const post = response.data.find(p => p.slug === slug);
      return post || null;
    } catch (error) {
      console.error(`Error fetching post by slug ${slug}:`, error);
      return null;
    }
  }

  async getCategories(params: {
    page?: number;
    per_page?: number;
    hide_empty?: boolean;
  } = {}): Promise<{ data: WPCategory[]; total: number }> {
    try {
      const queryParams = {
        page: params.page || 1,
        per_page: params.per_page || 100,
        hide_empty: params.hide_empty !== false,
      };

      const response: AxiosResponse<WPCategory[]> = await this.client.get('/wp/v2/categories', {
        params: queryParams,
      });

      const total = parseInt(response.headers['x-wp-total'] || '0');

      return {
        data: response.data,
        total,
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { data: [], total: 0 };
    }
  }

  async getTags(params: {
    page?: number;
    per_page?: number;
    hide_empty?: boolean;
  } = {}): Promise<{ data: WPTag[]; total: number }> {
    try {
      const queryParams = {
        page: params.page || 1,
        per_page: params.per_page || 100,
        hide_empty: params.hide_empty !== false,
      };

      const response: AxiosResponse<WPTag[]> = await this.client.get('/wp/v2/tags', {
        params: queryParams,
      });

      const total = parseInt(response.headers['x-wp-total'] || '0');

      return {
        data: response.data,
        total,
      };
    } catch (error) {
      console.error('Error fetching tags:', error);
      return { data: [], total: 0 };
    }
  }

  async getPages(params: {
    page?: number;
    per_page?: number;
  } = {}): Promise<{ data: WPPage[]; total: number }> {
    try {
      const queryParams = {
        page: params.page || 1,
        per_page: params.per_page || 20,
      };

      const response: AxiosResponse<WPPage[]> = await this.client.get('/wp/v2/pages', {
        params: queryParams,
      });

      const total = parseInt(response.headers['x-wp-total'] || '0');

      return {
        data: response.data,
        total,
      };
    } catch (error) {
      console.error('Error fetching pages:', error);
      return { data: [], total: 0 };
    }
  }

  async getMedia(ids: number[]): Promise<WPMedia[]> {
    if (ids.length === 0) return [];

    try {
      const response: AxiosResponse<WPMedia[]> = await this.client.get('/wp/v2/media', {
        params: {
          include: ids.join(','),
          per_page: 100,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching media:', error);
      return [];
    }
  }

  async getAuthors(ids: number[]): Promise<WPAuthor[]> {
    if (ids.length === 0) return [];

    try {
      const response: AxiosResponse<WPAuthor[]> = await this.client.get('/wp/v2/users', {
        params: {
          include: ids.join(','),
          per_page: 100,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  }

  async getPostsByCategory(categoryId: number, params: {
    page?: number;
    per_page?: number;
  } = {}): Promise<{ data: WPPost[]; total: number; pages: number }> {
    return this.getPosts({
      ...params,
      categories: [categoryId],
    });
  }

  async getPostsByTag(tagId: number, params: {
    page?: number;
    per_page?: number;
  } = {}): Promise<{ data: WPPost[]; total: number; pages: number }> {
    return this.getPosts({
      ...params,
      tags: [tagId],
    });
  }

  async searchPosts(query: string, params: {
    page?: number;
    per_page?: number;
  } = {}): Promise<{ data: WPPost[]; total: number; pages: number }> {
    return this.getPosts({
      ...params,
      search: query,
    });
  }
}

export const wordpressApi = new WordPressApi();
