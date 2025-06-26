import { Link } from "wouter";
import { PlayCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PlayCircle className="h-8 w-8 text-primary-orange" />
              <span className="text-xl font-bold">NewsPlay</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Seu portal de notícias em tempo real. Informação confiável, atualizada a cada 25 segundos diretamente do WordPress.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-orange">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Nossa Equipe
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-primary-orange transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-orange">Categorias</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categoria/politica" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Política
                </Link>
              </li>
              <li>
                <Link href="/categoria/economia" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Economia
                </Link>
              </li>
              <li>
                <Link href="/categoria/esportes" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Esportes
                </Link>
              </li>
              <li>
                <Link href="/categoria/tecnologia" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Tecnologia
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-orange">Políticas</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidade" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-primary-orange transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {currentYear} NewsPlay. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Desenvolvido por{" "}
            <span className="text-primary-orange font-medium">André Miranda</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
