import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
          Política de Cookies
        </h1>
        <p className="text-gray-600">
          Última atualização: 26 de junho de 2025
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">O que são Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Cookies são pequenos arquivos de texto que são armazenados em seu dispositivo 
              quando você visita um site. Eles são amplamente utilizados para fazer os sites 
              funcionarem de forma mais eficiente, bem como para fornecer informações aos 
              proprietários do site.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">Como o NewsPlay Usa Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Utilizamos cookies para melhorar sua experiência em nosso site de várias maneiras:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Lembrar suas preferências de navegação</li>
              <li>Analisar como nosso site é usado</li>
              <li>Personalizar o conteúdo apresentado</li>
              <li>Melhorar a funcionalidade do site</li>
              <li>Garantir a segurança do site</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">Tipos de Cookies que Utilizamos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cookies Essenciais</h4>
              <p className="text-gray-700 text-sm">
                Estes cookies são necessários para o funcionamento básico do site e não podem 
                ser desativados. Eles geralmente são definidos apenas em resposta a ações 
                feitas por você.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cookies de Desempenho</h4>
              <p className="text-gray-700 text-sm">
                Estes cookies nos permitem contar visitas e fontes de tráfego para que possamos 
                medir e melhorar o desempenho do nosso site. Eles nos ajudam a saber quais 
                páginas são mais populares.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cookies de Funcionalidade</h4>
              <p className="text-gray-700 text-sm">
                Estes cookies permitem que o site forneça funcionalidade e personalização 
                aprimoradas. Eles podem ser definidos por nós ou por provedores terceirizados.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cookies de Segmentação</h4>
              <p className="text-gray-700 text-sm">
                Estes cookies podem ser definidos através do nosso site por nossos parceiros 
                de publicidade para criar um perfil de seus interesses e mostrar anúncios 
                relevantes em outros sites.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">Cookies de Terceiros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Em algumas ocasiões especiais, também usamos cookies fornecidos por terceiros 
              confiáveis. Os serviços de terceiros que podem definir cookies através do 
              nosso site incluem:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Google Analytics - para análise de tráfego</li>
              <li>Serviços de mídia social - para compartilhamento de conteúdo</li>
              <li>Provedores de conteúdo - para funcionalidades integradas</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">Gerenciando Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Você pode controlar e/ou excluir cookies como desejar. Você pode excluir todos 
              os cookies que já estão no seu computador e pode configurar a maioria dos 
              navegadores para impedir que sejam colocados.
            </p>
            <p className="text-gray-700">
              Para gerenciar cookies em navegadores populares:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Chrome:</strong> Configurações → Privacidade e Segurança → Cookies</li>
              <li><strong>Firefox:</strong> Preferências → Privacidade e Segurança</li>
              <li><strong>Safari:</strong> Preferências → Privacidade</li>
              <li><strong>Edge:</strong> Configurações → Privacidade</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">Impacto da Desativação de Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Se você desativar os cookies, algumas funcionalidades do nosso site podem 
              não funcionar corretamente. Isso pode incluir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Perda de preferências personalizadas</li>
              <li>Necessidade de fazer login repetidamente</li>
              <li>Funcionalidades limitadas de compartilhamento</li>
              <li>Experiência de navegação menos personalizada</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">Atualizações desta Política</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Podemos atualizar nossa Política de Cookies periodicamente para refletir 
              mudanças em nossos serviços ou por outros motivos operacionais, legais 
              ou regulamentares.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato 
              conosco através da página de contato ou pelo e-mail: cookies@newsplay.com.br
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}