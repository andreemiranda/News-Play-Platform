import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, User, Eye, MessageCircle, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { usePost, usePostBySlug, useWordPressData } from "@/hooks/useWordPressData";
import { formatDate } from "@/utils/dateUtils";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostDetail() {
  const params = useParams();
  const postId = params.id ? parseInt(params.id) : null;
  const postSlug = params.slug;

  const { post: postById, isLoading: loadingById } = usePost(postId || 0);
  const { post: postBySlug, isLoading: loadingBySlug } = usePostBySlug(postSlug || "");
  const { categories, tags } = useWordPressData();

  const post = postById || postBySlug;
  const isLoading = loadingById || loadingBySlug;

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Post content skeleton */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <Skeleton className="w-full h-64" />
          <div className="p-8 space-y-6">
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </article>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
        <p className="text-gray-600 mb-6">
          O post que você está procurando não existe ou não está mais disponível.
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

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const authorName = post._embedded?.author?.[0]?.name || "NewsPlay";
  
  const postCategories = (post.categories || []).map(catId => {
    return categories.find(c => c.id === catId);
  }).filter(Boolean);

  const postTags = (post.tags || []).map(tagId => {
    return tags.find(t => t.id === tagId);
  }).filter(Boolean);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title?.rendered || 'NewsPlay',
        text: post.excerpt?.rendered || '',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

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
          {postCategories[0] && (
            <>
              <li>
                <Link 
                  href={`/categoria/${postCategories[0].slug}`}
                  className="hover:text-primary-orange transition-colors"
                >
                  {postCategories[0].name}
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3 w-3" />
              </li>
            </>
          )}
          <li className="text-gray-800 line-clamp-1">
            {post.title?.rendered || 'NewsPlay'}
          </li>
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

      {/* Post Content */}
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {featuredImage && (
          <div className="relative">
            <img
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title?.rendered || 'NewsPlay'}
              className="w-full h-64 md:h-96 object-cover"
              loading="eager"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {postCategories.slice(0, 2).map((category) => category && (
                <Badge key={category.id} className="bg-primary-orange text-white">
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Por {authorName}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              1.2k visualizações
            </span>
            <span className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              24 comentários
            </span>
          </div>

          {/* Post Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title?.rendered || 'NewsPlay'}
          </h1>

          {/* Post Content */}
          <div 
            className="post-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }}
          />

          {/* Post Tags */}
          {postTags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {postTags.map((tag) => tag && (
                  <Link key={tag.id} href={`/tag/${tag.slug}`}>
                    <Badge variant="outline" className="hover:bg-primary-orange hover:text-white transition-colors cursor-pointer">
                      {tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleShare}
              variant="outline"
              className="inline-flex items-center"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {postCategories.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-primary-blue mb-6">
            Mais notícias de {postCategories[0]?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This would need to be implemented with a separate API call */}
            <Card className="news-card">
              <CardContent className="p-4">
                <p className="text-gray-500 text-sm">
                  Posts relacionados serão carregados em breve...
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
