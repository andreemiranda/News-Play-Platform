import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ChevronRight, ArrowLeft, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { useWordPressData, usePosts, useCategory } from "@/hooks/useWordPressData";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug || "";
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const perPage = 10;

  const { categories, isLoading: dataLoading } = useWordPressData();
  const { category, isLoading: categoryLoading } = useCategory(categorySlug);
  
  // Find category ID from slug
  const categoryData = categories.find(cat => cat.slug === categorySlug);
  const categoryId = categoryData?.id;

  const { posts, total, pages, isLoading: postsLoading } = usePosts(
    currentPage, 
    perPage, 
    categoryId
  );

  const isLoading = dataLoading || categoryLoading || postsLoading;

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug]);

  if (isLoading && !categoryData) {
    return (
      <div className="space-y-8">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Header skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Posts skeleton */}
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
    );
  }

  if (!categoryData) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
        <p className="text-gray-600 mb-6">
          A categoria "{categorySlug}" não existe ou não está mais disponível.
        </p>
        <Link href="/">
          <Button className="gradient-button">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar à página inicial
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-primary-orange transition-colors">
              Início
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <span className="text-gray-400">Categorias</span>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li className="text-gray-800">{categoryData.name}</li>
        </ol>
      </nav>

      {/* Back Button */}
      <div>
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
      </div>

      {/* Category Header */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <FolderOpen className="h-8 w-8 text-primary-orange" />
          <h1 className="text-3xl md:text-4xl font-bold text-primary-blue">
            {categoryData.name}
          </h1>
        </div>
        
        {categoryData.description && (
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            {categoryData.description}
          </p>
        )}
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <span className="bg-primary-orange text-white px-2 py-1 rounded-full text-xs mr-2">
              {categoryData.count}
            </span>
            {categoryData.count === 1 ? 'notícia' : 'notícias'}
          </span>
          {total > 0 && (
            <span>
              • Exibindo {posts.length} de {total} resultados
            </span>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary-blue">
            Notícias de {categoryData.name}
          </h2>
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

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                categories={categories}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-gray-500">
              Não há notícias disponíveis nesta categoria no momento.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Aguarde a sincronização com o WordPress ou verifique outras categorias.
            </p>
          </div>
        )}

        {/* Pagination */}
        {posts.length > 0 && pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      {/* Stats Display */}
      {total > 0 && (
        <div className="text-center text-sm text-gray-500 border-t pt-4">
          <p>
            Exibindo {posts.length} de {total} notícias em {categoryData.name}
            {pages > 1 && ` • Página ${currentPage} de ${pages}`}
          </p>
        </div>
      )}

      {/* Related Categories */}
      {categories.length > 1 && (
        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary-blue mb-4">
            Outras Categorias
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter(cat => cat.slug !== categorySlug)
              .slice(0, 6)
              .map((cat) => (
                <Link key={cat.id} href={`/categoria/${cat.slug}`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-primary-orange hover:text-white transition-colors"
                  >
                    {cat.name}
                    <span className="ml-2 bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      {cat.count}
                    </span>
                  </Button>
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
