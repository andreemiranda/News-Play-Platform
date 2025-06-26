import { Link } from "wouter";
import { ChevronRight, PlayCircle, Target, Users, Award, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
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
          <li className="text-gray-800">Sobre Nós</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="gradient-header text-white p-8 md:p-12">
          <div className="flex items-center space-x-4 mb-6">
            <PlayCircle className="h-12 w-12 text-primary-orange" />
            <h1 className="text-4xl md:text-5xl font-bold">NewsPlay</h1>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed opacity-90">
            Seu portal de notícias em tempo real, conectado diretamente ao WordPress com sincronização automática a cada 25 segundos.
          </p>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary-blue mb-4">Nossa Missão</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              O NewsPlay foi criado com o objetivo de fornecer informações precisas, atualizadas e confiáveis 
              em tempo real. Nossa plataforma utiliza tecnologia avançada de sincronização automática com 
              WordPress, garantindo que nossos leitores tenham acesso às notícias mais recentes assim que 
              são publicadas.
            </p>

            <h2 className="text-2xl font-bold text-primary-blue mb-4">Nossa História</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Fundado em 2024, o NewsPlay nasceu da necessidade de criar um portal de notícias moderno, 
              rápido e eficiente. Desenvolvido por André Miranda, o projeto combina as melhores práticas 
              de desenvolvimento web com uma experiência de usuário excepcional.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Nossa equipe está comprometida em manter os mais altos padrões de qualidade jornalística, 
              oferecendo conteúdo relevante e bem estruturado para nossos leitores.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardHeader>
            <Zap className="h-12 w-12 text-primary-orange mx-auto mb-2" />
            <CardTitle className="text-primary-blue">Tempo Real</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Sincronização automática a cada 25 segundos garante as notícias mais atualizadas.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Target className="h-12 w-12 text-primary-orange mx-auto mb-2" />
            <CardTitle className="text-primary-blue">Precisão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Informações verificadas e confiáveis de fontes autorizadas e credenciadas.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Users className="h-12 w-12 text-primary-orange mx-auto mb-2" />
            <CardTitle className="text-primary-blue">Comunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Plataforma pensada para conectar leitores com conteúdo relevante e atual.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Award className="h-12 w-12 text-primary-orange mx-auto mb-2" />
            <CardTitle className="text-primary-blue">Qualidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Compromisso com a excelência editorial e experiência de usuário superior.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Technology Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-primary-blue">Tecnologia e Inovação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary-blue mb-3">
                Sincronização Inteligente
              </h3>
              <p className="text-gray-700 mb-4">
                Nosso sistema de sincronização automatizada conecta-se diretamente à API do WordPress, 
                garantindo que o conteúdo seja atualizado a cada 25 segundos. Isso permite que nossos 
                leitores tenham acesso imediato às últimas notícias.
              </p>
              
              <h3 className="text-lg font-semibold text-primary-blue mb-3">
                Interface Moderna
              </h3>
              <p className="text-gray-700">
                Desenvolvido com React e tecnologias modernas, o NewsPlay oferece uma experiência 
                de navegação fluida, responsiva e intuitiva em todos os dispositivos.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary-blue mb-3">
                Busca Avançada
              </h3>
              <p className="text-gray-700 mb-4">
                Sistema de busca em tempo real permite encontrar rapidamente o conteúdo desejado, 
                com filtros por categoria, data, autor e palavras-chave.
              </p>
              
              <h3 className="text-lg font-semibold text-primary-blue mb-3">
                Performance Otimizada
              </h3>
              <p className="text-gray-700">
                Cache inteligente e otimizações avançadas garantem carregamento rápido e 
                economia de recursos, proporcionando a melhor experiência possível.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-primary-blue">Nossa Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="inline-block bg-gradient-to-br from-primary-blue to-secondary-blue text-white rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">AM</span>
            </div>
            <h3 className="text-xl font-semibold text-primary-blue mb-2">André Miranda</h3>
            <p className="text-gray-600 mb-4">Desenvolvedor e Fundador</p>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Desenvolvedor experiente e apaixonado por tecnologia, André Miranda criou o NewsPlay 
              com o objetivo de revolucionar a forma como consumimos notícias online. Com foco na 
              inovação e qualidade, ele continua aprimorando a plataforma constantemente.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Values Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-primary-blue">Nossos Valores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-primary-blue mb-2">Transparência</h4>
              <p className="text-gray-600 text-sm">
                Comprometimento com informações claras, precisas e verificáveis para nossos leitores.
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-primary-blue mb-2">Inovação</h4>
              <p className="text-gray-600 text-sm">
                Uso de tecnologias avançadas para oferecer a melhor experiência de leitura possível.
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-primary-blue mb-2">Responsabilidade</h4>
              <p className="text-gray-600 text-sm">
                Compromisso com a ética jornalística e responsabilidade social em nosso conteúdo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gray-50">
        <CardContent className="text-center p-8">
          <h3 className="text-2xl font-bold text-primary-blue mb-4">
            Faça Parte da Nossa Comunidade
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Mantenha-se sempre informado com as últimas notícias. O NewsPlay está aqui 
            para fornecer informação de qualidade, quando você mais precisa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="gradient-button">
                Explorar Notícias
              </Button>
            </Link>
            <Link href="/contato">
              <Button variant="outline">
                Entrar em Contato
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
