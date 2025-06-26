import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, PlayCircle, FolderSync } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWordPressData } from "@/hooks/useWordPressData";
import { useSearch } from "@/hooks/useSearch";

export default function Header() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { categories } = useWordPressData();
  const { syncStatus } = useWordPressData();
  const { performSearch } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const formatSyncTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const mainCategories = categories.slice(0, 5);

  return (
    <header className="gradient-header shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-3 border-b border-white/20">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-secondary-orange transition-colors">
              <PlayCircle className="h-8 w-8 text-primary-orange" />
              <span className="text-xl font-bold">NewsPlay</span>
            </Link>
            
            {/* FolderSync Status */}
            <div className="hidden md:flex items-center space-x-2 text-white/80 text-sm">
              <FolderSync className={`h-4 w-4 text-primary-orange ${syncStatus?.isSync ? 'animate-spin' : ''}`} />
              <span>
                {syncStatus?.isSync 
                  ? 'Sincronizando...' 
                  : syncStatus?.lastSync 
                    ? `Última sync: ${formatSyncTime(syncStatus.lastSync)}`
                    : 'Aguardando sincronização'
                }
              </span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Buscar notícias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
            </form>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className={`py-3 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <ul className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-white">
            <li>
              <Link 
                href="/" 
                className="hover:text-primary-orange transition-colors font-medium block py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </Link>
            </li>
            {mainCategories.map((category) => (
              <li key={category.id}>
                <Link 
                  href={`/categoria/${category.slug}`}
                  className="hover:text-primary-orange transition-colors block py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/sobre" 
                className="hover:text-primary-orange transition-colors block py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link 
                href="/contato" 
                className="hover:text-primary-orange transition-colors block py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
