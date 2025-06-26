import { Link } from "wouter";
import { Eye, MessageCircle, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WPPost } from "@shared/schema";
import { formatDate } from "@/utils/dateUtils";
import { stripHtml } from "@/utils/textUtils";

interface PostCardProps {
  post: WPPost;
  categories?: Array<{ id: number; name: string; slug: string }>;
  featured?: boolean;
}

export default function PostCard({ post, categories = [], featured = false }: PostCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const authorName = post._embedded?.author?.[0]?.name || "NewsPlay";
  
  const postCategories = post.categories.map(catId => {
    return categories.find(c => c.id === catId);
  }).filter(Boolean).slice(0, 2);

  const excerpt = stripHtml(post.excerpt.rendered);

  if (featured) {
    return (
      <Card className="news-card overflow-hidden mb-8">
        {featuredImage && (
          <div className="relative">
            <img
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              {postCategories[0] && (
                <Badge className="bg-primary-orange text-white">
                  {postCategories[0].name}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Por {authorName}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-orange transition-colors">
            <Link href={`/post/${post.id}`}>
              {post.title.rendered}
            </Link>
          </h1>
          
          <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <Link href={`/post/${post.id}`}>
              <span className="inline-flex items-center text-primary-orange hover:text-secondary-orange transition-colors font-medium">
                Leia mais
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            
            <div className="flex items-center space-x-4 text-gray-500 text-sm">
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                1.2k
              </span>
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                24
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="news-card overflow-hidden">
      <div className="md:flex">
        {featuredImage && (
          <div className="md:w-48 md:flex-shrink-0 relative">
            <img
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              className="w-full h-48 md:h-32 object-cover"
              loading="lazy"
            />
            <div className="absolute top-2 left-2">
              {postCategories[0] && (
                <Badge 
                  className="text-xs"
                  style={{
                    backgroundColor: getRandomCategoryColor(postCategories[0].id),
                    color: 'white'
                  }}
                >
                  {postCategories[0].name}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <CardContent className="p-6 flex-1">
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Por {authorName}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-orange transition-colors">
            <Link href={`/post/${post.id}`}>
              {post.title.rendered}
            </Link>
          </h3>
          
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <Link href={`/post/${post.id}`}>
              <span className="text-primary-orange hover:text-secondary-orange transition-colors text-sm font-medium">
                Continuar lendo
              </span>
            </Link>
            
            <div className="flex items-center space-x-3 text-gray-500 text-xs">
              <span className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                856
              </span>
              <span className="flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                12
              </span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function getRandomCategoryColor(categoryId: number): string {
  const colors = [
    "hsl(14, 100%, 60%)", // primary-orange
    "hsl(221, 58%, 37%)", // secondary-blue
    "hsl(142, 71%, 45%)", // green
    "hsl(262, 83%, 58%)", // purple
    "hsl(346, 87%, 43%)", // red
  ];
  
  return colors[categoryId % colors.length];
}
