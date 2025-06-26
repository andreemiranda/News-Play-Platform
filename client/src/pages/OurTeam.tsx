import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

export default function OurTeam() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
          Nossa Equipe
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Conheça as pessoas por trás do NewsPlay, dedicadas a trazer as melhores notícias em tempo real.
        </p>
      </div>

      <div className="space-y-8">
        {/* Founder Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange text-center">Fundador & Desenvolvedor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="inline-block bg-gradient-to-br from-primary-orange to-orange-600 text-white rounded-full w-32 h-32 flex items-center justify-center mb-6">
                <span className="text-4xl font-bold">AM</span>
              </div>
              
              <h2 className="text-2xl font-bold text-primary-blue mb-2">André Miranda</h2>
              <p className="text-primary-orange font-semibold mb-4">Desenvolvedor Full Stack & Fundador</p>
              
              <div className="flex justify-center space-x-2 mb-6">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">WordPress</Badge>
              </div>
              
              <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
                André Miranda é o visionário por trás do NewsPlay. Com vasta experiência em desenvolvimento 
                full stack, ele criou esta plataforma inovadora que revoluciona a forma como consumimos 
                notícias online. Especialista em React, Node.js e integração com APIs, André combina 
                paixão por tecnologia com compromisso jornalístico para entregar uma experiência 
                excepcional aos usuários.
              </p>
              
              <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
                Sua visão de democratizar o acesso à informação através da tecnologia motivou a criação 
                do sistema de sincronização em tempo real que mantém o NewsPlay sempre atualizado. 
                André continua liderando o desenvolvimento da plataforma, implementando novas 
                funcionalidades e garantindo a melhor experiência possível para os leitores.
              </p>
              
              <div className="flex justify-center space-x-4">
                <a href="mailto:andre@newsplay.com.br" className="flex items-center space-x-2 text-gray-600 hover:text-primary-orange transition-colors">
                  <Mail className="h-5 w-5" />
                  <span>E-mail</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-primary-orange transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-primary-orange transition-colors">
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange text-center">Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
              "Acreditamos que a informação de qualidade deve ser acessível a todos. Nossa equipe 
              trabalha incansavelmente para garantir que o NewsPlay seja mais do que um portal de 
              notícias - seja uma ponte confiável entre os acontecimentos mundiais e você."
            </p>
          </CardContent>
        </Card>

        {/* Skills & Expertise */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-orange">Competências Técnicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary-blue mb-2">Desenvolvimento Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Vite</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary-blue mb-2">Desenvolvimento Backend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Express</Badge>
                  <Badge variant="outline">REST APIs</Badge>
                  <Badge variant="outline">Drizzle ORM</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary-blue mb-2">Integrações</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">WordPress API</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Real-time Sync</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary-orange">Experiência & Valores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary-blue mb-2">Experiência</h4>
                <p className="text-gray-700 text-sm">
                  Mais de 5 anos desenvolvendo aplicações web modernas e escaláveis, 
                  com foco em performance e experiência do usuário.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary-blue mb-2">Filosofia de Trabalho</h4>
                <p className="text-gray-700 text-sm">
                  Código limpo, arquitetura bem estruturada e sempre pensando 
                  na experiência final do usuário.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary-blue mb-2">Compromisso</h4>
                <p className="text-gray-700 text-sm">
                  Dedicação total à qualidade da informação e à inovação 
                  tecnológica no jornalismo digital.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Vision */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange text-center">Visão de Futuro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-gray-700 leading-relaxed mb-6 max-w-4xl mx-auto">
                O NewsPlay está em constante evolução. Nossa equipe trabalha continuamente 
                para implementar novas funcionalidades, melhorar a performance e expandir 
                nossa cobertura jornalística. Planejamos adicionar recursos como:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-blue mb-2">Personalização</h4>
                  <p className="text-gray-600">
                    Sistema de preferências personalizadas para cada leitor
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-blue mb-2">Notificações</h4>
                  <p className="text-gray-600">
                    Alertas em tempo real para notícias urgentes e temas de interesse
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-blue mb-2">Mobile App</h4>
                  <p className="text-gray-600">
                    Aplicativo nativo para Android e iOS com funcionalidades avançadas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Join Us */}
        <Card className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold mb-4">Junte-se à Nossa Missão</h3>
            <p className="mb-6 opacity-90">
              Estamos sempre em busca de profissionais talentosos que compartilhem 
              nossa paixão pela informação de qualidade e inovação tecnológica.
            </p>
            <p className="text-sm opacity-75">
              Interessado em fazer parte da equipe? Entre em contato conosco.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}