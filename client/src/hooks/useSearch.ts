import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SearchResponse, SearchIndex } from "@shared/schema";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<{
    category?: string;
    tag?: string;
    author?: string;
    dateFrom?: string;
    dateTo?: string;
  }>({});
  const [isSearchActive, setIsSearchActive] = useState(false);

  const buildSearchQuery = (query: string, filters?: typeof searchFilters) => {
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("q", query.trim());
    }
    if (filters?.category) {
      params.set("category", filters.category);
    }
    if (filters?.tag) {
      params.set("tag", filters.tag);
    }
    if (filters?.author) {
      params.set("author", filters.author);
    }
    if (filters?.dateFrom) {
      params.set("date_from", filters.dateFrom);
    }
    if (filters?.dateTo) {
      params.set("date_to", filters.dateTo);
    }
    return params.toString();
  };

  const { data: searchResults, isLoading: searchLoading, error: searchError } = useQuery<SearchResponse>({
    queryKey: ["/api/search", searchQuery, searchFilters],
    enabled: isSearchActive && (!!searchQuery.trim() || Object.keys(searchFilters).some(key => searchFilters[key as keyof typeof searchFilters])),
    staleTime: 10000,
  });

  const performSearch = (query: string, filters?: typeof searchFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters || {});
    setIsSearchActive(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchFilters({});
    setIsSearchActive(false);
  };

  const highlightSearchTerms = (text: string, query: string): string => {
    if (!query.trim()) return text;
    
    const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
    let highlightedText = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="search-highlight">$1</span>');
    });
    
    return highlightedText;
  };

  // Real-time search functionality for instant results
  const [instantResults, setInstantResults] = useState<SearchIndex[]>([]);
  const [instantLoading, setInstantLoading] = useState(false);

  const performInstantSearch = async (query: string) => {
    if (!query.trim()) {
      setInstantResults([]);
      return;
    }

    setInstantLoading(true);
    try {
      const params = new URLSearchParams({ q: query });
      const response = await fetch(`/api/search?${params}`);
      const data: SearchResponse = await response.json();
      setInstantResults(data.results.slice(0, 5)); // Show top 5 results for instant search
    } catch (error) {
      console.error("Instant search error:", error);
      setInstantResults([]);
    } finally {
      setInstantLoading(false);
    }
  };

  return {
    searchQuery,
    searchFilters,
    searchResults: searchResults?.results || [],
    searchTotal: searchResults?.total || 0,
    searchLoading,
    searchError,
    isSearchActive,
    instantResults,
    instantLoading,
    performSearch,
    clearSearch,
    highlightSearchTerms,
    performInstantSearch,
    setSearchQuery,
    setSearchFilters,
  };
}

// Hook for URL-based search (when coming from search page)
export function useUrlSearch() {
  const [searchParams, setSearchParams] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const author = searchParams.get("author") || "";
  const dateFrom = searchParams.get("date_from") || "";
  const dateTo = searchParams.get("date_to") || "";

  const filters = {
    ...(category && { category }),
    ...(tag && { tag }),
    ...(author && { author }),
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
  };

  const { data: searchResults, isLoading, error } = useQuery<SearchResponse>({
    queryKey: ["/api/search", query, filters],
    enabled: !!(query || Object.keys(filters).length > 0),
    staleTime: 10000,
  });

  return {
    query,
    filters,
    results: searchResults?.results || [],
    total: searchResults?.total || 0,
    isLoading,
    error,
  };
}
