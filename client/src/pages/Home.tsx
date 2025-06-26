import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { useWordPressData, usePosts } from "@/hooks/useWordPressData";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const perPage = 10;

  const { categories, isLoading: dataLoading } = useWordPressData();
  const { posts, total, pages, isLoading: postsLoading } = usePosts(currentPage, perPage);

  const isLoading = dataLoading || postsLoading;

  // Get featured post (most recent)
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="space-y-8">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Featured post skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Skeleton className="w-full h-64" />
            <div className="p-6 space-y-4">
              <div className="flex space-x-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Regular posts skeleton */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <Skeleton className="w-full md:w-48 h-48 md:h-32" />
                  <div className="p-6 flex-1 space-y-3">
                    <div className="flex space-x-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-primary-orange transition-colors">
              Início
            </a>
          </li>
          <li>
            <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
          </li>
          <li className="text-gray-800">Últimas Notícias</li>
        </ol>
      </nav>

      {/* Featured News Section */}
      {featuredPost && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-primary-blue">Destaques</h2>
          <PostCard post={featuredPost} categories={categories} featured={true} />
        </section>
      )}

      {/* News Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary-blue">Últimas Notícias</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Ordenar por:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="views">Mais lidas</SelectItem>
                <SelectItem value="comments">Mais comentadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* News Grid */}
        {regularPosts.length > 0 ? (
          <div className="space-y-6">
            {regularPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                categories={categories}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma notícia encontrada.</p>
            <p className="text-gray-400 text-sm mt-2">
              Aguarde a sincronização com o WordPress ou verifique sua conexão.
            </p>
          </div>
        )}

        {/* Load More / Pagination */}
        {regularPosts.length > 0 && (
          <>
            {currentPage < pages && (
              <div className="text-center">
                <Button 
                  onClick={handleLoadMore}
                  className="gradient-button inline-flex items-center px-8 py-3"
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isLoading ? "Carregando..." : "Carregar mais notícias"}
                </Button>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>

      {/* Stats Display */}
      {total > 0 && (
        <div className="text-center text-sm text-gray-500 border-t pt-4">
          <p>
            Exibindo {regularPosts.length + (featuredPost ? 1 : 0)} de {total} notícias
            {pages > 1 && ` • Página ${currentPage} de ${pages}`}
          </p>
        </div>
      )}
    </div>
  );
}
