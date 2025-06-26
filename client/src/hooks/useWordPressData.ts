import { useQuery } from "@tanstack/react-query";
import type { PostsResponse, CategoriesResponse, TagsResponse, SyncStatus, WPPost } from "@shared/schema";

export function useWordPressData() {
  const { data: postsData, isLoading: postsLoading, error: postsError } = useQuery<PostsResponse>({
    queryKey: ["/api/posts"],
    staleTime: 5000,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery<CategoriesResponse>({
    queryKey: ["/api/categories"],
    staleTime: 60000, // Categories change less frequently
    refetchInterval: 60000,
  });

  const { data: tagsData, isLoading: tagsLoading } = useQuery<TagsResponse>({
    queryKey: ["/api/tags"],
    staleTime: 60000,
    refetchInterval: 60000,
  });

  const { data: recentPostsData, isLoading: recentLoading } = useQuery<{ posts: WPPost[] }>({
    queryKey: ["/api/posts/recent"],
    staleTime: 5000,
    refetchInterval: 30000,
  });

  const { data: syncStatus, isLoading: syncLoading } = useQuery<SyncStatus>({
    queryKey: ["/api/sync/status"],
    staleTime: 1000,
    refetchInterval: 5000, // Check sync status every 5 seconds
  });

  return {
    posts: postsData?.posts || [],
    categories: categoriesData?.categories || [],
    tags: tagsData?.tags || [],
    recentPosts: recentPostsData?.posts || [],
    syncStatus,
    isLoading: postsLoading || categoriesLoading || tagsLoading || recentLoading || syncLoading,
    error: postsError,
    total: postsData?.total || 0,
    pages: postsData?.pages || 0,
  };
}

export function usePosts(page = 1, perPage = 10, categoryId?: number, tagId?: number) {
  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  queryParams.set("per_page", perPage.toString());
  if (categoryId) queryParams.set("category", categoryId.toString());
  if (tagId) queryParams.set("tag", tagId.toString());

  const { data, isLoading, error } = useQuery<PostsResponse>({
    queryKey: ["/api/posts", page, perPage, categoryId, tagId],
    staleTime: 5000,
    refetchInterval: 30000,
  });

  return {
    posts: data?.posts || [],
    total: data?.total || 0,
    pages: data?.pages || 0,
    isLoading,
    error,
  };
}

export function usePost(id: number) {
  const { data: post, isLoading, error } = useQuery<WPPost>({
    queryKey: ["/api/posts", id],
    staleTime: 30000,
    enabled: !!id,
  });

  return {
    post,
    isLoading,
    error,
  };
}

export function usePostBySlug(slug: string) {
  const { data: post, isLoading, error } = useQuery<WPPost>({
    queryKey: ["/api/posts/slug", slug],
    staleTime: 30000,
    enabled: !!slug,
  });

  return {
    post,
    isLoading,
    error,
  };
}

export function useCategory(slug: string) {
  const { data: category, isLoading, error } = useQuery({
    queryKey: ["/api/categories", slug],
    staleTime: 60000,
    enabled: !!slug,
  });

  return {
    category,
    isLoading,
    error,
  };
}

export function usePopularTags(count = 10) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/tags/popular", count],
    staleTime: 60000,
  });

  return {
    tags: data?.tags || [],
    isLoading,
    error,
  };
}

export function useTriggerSync() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/sync/trigger"],
    enabled: false, // Only trigger manually
  });

  return {
    data,
    isLoading,
    error,
  };
}
