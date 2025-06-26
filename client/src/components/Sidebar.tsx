import { useState } from "react";
import { Link } from "wouter";
import { FolderOpen, Clock, Tags, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWordPressData } from "@/hooks/useWordPressData";
import { useSearch } from "@/hooks/useSearch";
import { formatRelativeTime } from "@/utils/dateUtils";

export default function Sidebar() {
  const { categories, tags, recentPosts } = useWordPressData();
  const { performSearch } = useSearch();
  const [advancedSearch, setAdvancedSearch] = useState({
    term: "",
    category: "",
    period: "",
  });

  const handleAdvancedSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: any = {};
    if (advancedSearch.category && advancedSearch.category !== "all") {
      filters.category = advancedSearch.category;
    }
    if (advancedSearch.period && advancedSearch.period !== "any") {
      const days = parseInt(advancedSearch.period);
      const dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - days);
      filters.dateFrom = dateFrom.toISOString();
    }

    performSearch(advancedSearch.term, filters);
  };

  const popularTags = tags.slice(0, 8);
  const topCategories = categories.slice(0, 6);

  return (
    <aside className="lg:w-80 lg:flex-shrink-0 space-y-6">
      {/* Categories Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary-blue">
            <FolderOpen className="h-5 w-5 text-primary-orange mr-2" />
            Categorias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {topCategories.map((category) => (
              <li key={category.id}>
                <Link href={`/categoria/${category.slug}`}>
                  <div className="flex items-center justify-between text-gray-700 hover:text-primary-orange transition-colors py-2 px-3 rounded hover:bg-gray-50 cursor-pointer">
                    <span>{category.name}</span>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Posts Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary-blue">
            <Clock className="h-5 w-5 text-primary-orange mr-2" />
            Últimas Notícias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.slice(0, 5).map((post) => {
              const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
              const authorName = post._embedded?.author?.[0]?.name || "NewsPlay";
              
              return (
                <article key={post.id} className="flex space-x-3">
                  {featuredImage && (
                    <img
                      src={featuredImage.source_url}
                      alt={featuredImage.alt_text || post.title.rendered}
                      className="w-16 h-12 object-cover rounded flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-primary-orange transition-colors">
                      <Link href={`/post/${post.id}`}>
                        {post.title.rendered}
                      </Link>
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatRelativeTime(post.date)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tags Cloud Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary-blue">
            <Tags className="h-5 w-5 text-primary-orange mr-2" />
            Tags Populares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`}>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-orange hover:text-white transition-colors cursor-pointer">
                  {tag.name}
                </span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Search Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary-blue">
            <Search className="h-5 w-5 text-primary-orange mr-2" />
            Busca Avançada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdvancedSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Termo
              </label>
              <Input
                type="text"
                placeholder="Digite sua busca..."
                value={advancedSearch.term}
                onChange={(e) => setAdvancedSearch({ ...advancedSearch, term: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <Select
                value={advancedSearch.category}
                onValueChange={(value) => setAdvancedSearch({ ...advancedSearch, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Período
              </label>
              <Select
                value={advancedSearch.period}
                onValueChange={(value) => setAdvancedSearch({ ...advancedSearch, period: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer data</SelectItem>
                  <SelectItem value="1">Último dia</SelectItem>
                  <SelectItem value="7">Última semana</SelectItem>
                  <SelectItem value="30">Último mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full gradient-button">
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>
    </aside>
  );
}
