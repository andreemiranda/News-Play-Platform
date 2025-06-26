import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Clock, Search, Smartphone, Shield, Mail } from "lucide-react";

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <HelpCircle className="h-16 w-16 text-primary-orange mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
          Perguntas Frequentes
        </h1>
        <p className="text-lg text-gray-600">
          Encontre respostas para as dúvidas mais comuns sobre o NewsPlay
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Sobre a Plataforma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-is-newsplay">
                <AccordionTrigger>O que é o NewsPlay?</AccordionTrigger>
                <AccordionContent>
                  O NewsPlay é um portal de notícias moderno que oferece informações atualizadas em tempo real. 
                  Nossa plataforma sincroniza automaticamente com fontes confiáveis a cada 25 segundos, 
                  garantindo que você tenha acesso às notícias mais recentes assim que são publicadas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-often-updated">
                <AccordionTrigger>Com que frequência o conteúdo é atualizado?</AccordionTrigger>
                <AccordionContent>
                  O NewsPlay atualiza automaticamente seu conteúdo a cada 25 segundos. Nosso sistema 
                  de sincronização inteligente verifica constantemente por novas notícias, garantindo 
                  que você sempre tenha acesso às informações mais atuais.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="content-sources">
                <AccordionTrigger>De onde vêm as notícias?</AccordionTrigger>
                <AccordionContent>
                  Nossas notícias são sincronizadas com fontes jornalísticas confiáveis através de 
                  APIs seguras. Trabalhamos apenas com veículos de comunicação reconhecidos e 
                  respeitados para garantir a qualidade e veracidade das informações.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="free-to-use">
                <AccordionTrigger>O NewsPlay é gratuito?</AccordionTrigger>
                <AccordionContent>
                  Sim! O NewsPlay é completamente gratuito para todos os usuários. Acreditamos que 
                  o acesso à informação de qualidade é um direito fundamental e deve estar disponível 
                  para todos, sem custos.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange flex items-center gap-2">
              <Search className="h-5 w-5" />
              Navegação e Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="how-to-search">
                <AccordionTrigger>Como posso buscar notícias específicas?</AccordionTrigger>
                <AccordionContent>
                  Use a barra de busca no topo da página para encontrar notícias específicas. 
                  Você pode buscar por palavras-chave, usar filtros por categoria, data e 
                  outros critérios. Nossa busca é em tempo real e mostra resultados instantâneos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="categories">
                <AccordionTrigger>Quais categorias de notícias estão disponíveis?</AccordionTrigger>
                <AccordionContent>
                  O NewsPlay organiza as notícias em diversas categorias, incluindo: Brasil, 
                  Internacional, Política, Economia, Esportes, Tecnologia, Saúde, Cultura, 
                  e muitas outras. Você pode navegar por categoria através do menu lateral 
                  ou usar os filtros de busca.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bookmarks">
                <AccordionTrigger>Posso salvar notícias para ler depois?</AccordionTrigger>
                <AccordionContent>
                  Atualmente, o recurso de favoritos está em desenvolvimento. Em breve, você 
                  poderá salvar notícias interessantes para ler posteriormente. Enquanto isso, 
                  você pode usar os favoritos do seu navegador para marcar páginas específicas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sharing">
                <AccordionTrigger>Como compartilhar notícias?</AccordionTrigger>
                <AccordionContent>
                  Cada notícia possui botões de compartilhamento que permitem enviar o link 
                  para redes sociais, e-mail ou copiar diretamente para a área de transferência. 
                  Você também pode simplesmente copiar a URL da página para compartilhar.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Dispositivos e Compatibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="mobile-support">
                <AccordionTrigger>O NewsPlay funciona em dispositivos móveis?</AccordionTrigger>
                <AccordionContent>
                  Sim! O NewsPlay foi desenvolvido com design responsivo e funciona perfeitamente 
                  em smartphones, tablets, computadores e laptops. A interface se adapta 
                  automaticamente ao tamanho da tela para oferecer a melhor experiência possível.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="browser-support">
                <AccordionTrigger>Quais navegadores são suportados?</AccordionTrigger>
                <AccordionContent>
                  O NewsPlay é compatível com todos os navegadores modernos, incluindo 
                  Chrome, Firefox, Safari, Edge e Opera. Recomendamos manter seu navegador 
                  sempre atualizado para a melhor experiência.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="offline-access">
                <AccordionTrigger>Posso acessar notícias offline?</AccordionTrigger>
                <AccordionContent>
                  No momento, o NewsPlay requer conexão com a internet para funcionar, 
                  pois as notícias são atualizadas em tempo real. Estamos trabalhando 
                  em funcionalidades offline para versões futuras.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="app-download">
                <AccordionTrigger>Existe um aplicativo para download?</AccordionTrigger>
                <AccordionContent>
                  Atualmente, o NewsPlay funciona como uma aplicação web responsiva. 
                  Um aplicativo nativo para Android e iOS está em nossos planos futuros. 
                  Você pode adicionar o site à tela inicial do seu dispositivo para 
                  acesso rápido.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacidade e Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="data-collection">
                <AccordionTrigger>Quais dados vocês coletam?</AccordionTrigger>
                <AccordionContent>
                  Coletamos apenas dados essenciais para melhorar sua experiência, como 
                  páginas visitadas e preferências de navegação. Não coletamos informações 
                  pessoais identificáveis. Para detalhes completos, consulte nossa 
                  Política de Privacidade.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cookies">
                <AccordionTrigger>Vocês usam cookies?</AccordionTrigger>
                <AccordionContent>
                  Sim, utilizamos cookies para melhorar a funcionalidade do site e 
                  personalizar sua experiência. Você pode gerenciar suas preferências 
                  de cookies nas configurações do seu navegador. Consulte nossa 
                  Política de Cookies para mais informações.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-sharing">
                <AccordionTrigger>Vocês compartilham dados com terceiros?</AccordionTrigger>
                <AccordionContent>
                  Não vendemos ou compartilhamos seus dados pessoais com terceiros para 
                  fins comerciais. Podemos compartilhar dados agregados e anônimos para 
                  análises estatísticas, sempre respeitando sua privacidade.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account-security">
                <AccordionTrigger>Como posso proteger minha conta?</AccordionTrigger>
                <AccordionContent>
                  Atualmente, o NewsPlay não requer criação de conta para acesso às notícias. 
                  Quando implementarmos contas de usuário, forneceremos orientações detalhadas 
                  sobre segurança e boas práticas de proteção.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Suporte e Contato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="report-problem">
                <AccordionTrigger>Como reportar um problema técnico?</AccordionTrigger>
                <AccordionContent>
                  Se você encontrar algum problema técnico, entre em contato conosco através 
                  da página de Contato. Descreva o problema em detalhes, incluindo o navegador 
                  que está usando e os passos que levaram ao erro.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="suggest-feature">
                <AccordionTrigger>Posso sugerir novas funcionalidades?</AccordionTrigger>
                <AccordionContent>
                  Absolutamente! Valorizamos muito o feedback dos nossos usuários. 
                  Use nossa página de Contato para enviar sugestões de melhorias 
                  ou novas funcionalidades. Analisamos todas as sugestões cuidadosamente.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="content-issue">
                <AccordionTrigger>Como reportar problemas com conteúdo?</AccordionTrigger>
                <AccordionContent>
                  Se você identificar informações incorretas ou problemáticas, 
                  entre em contato conosco imediatamente. Levamos a qualidade 
                  do conteúdo muito a sério e investigamos todos os relatórios 
                  prontamente.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="response-time">
                <AccordionTrigger>Qual o tempo de resposta do suporte?</AccordionTrigger>
                <AccordionContent>
                  Nos esforçamos para responder todas as mensagens dentro de 24-48 horas. 
                  Para problemas urgentes ou críticos, priorizamos o atendimento e 
                  tentamos responder o mais rapidamente possível.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="text-center p-8">
            <h3 className="text-xl font-bold text-primary-blue mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está sempre pronta para ajudar. Entre em contato conosco 
              através da página de contato ou envie um e-mail diretamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contato" className="text-primary-orange hover:text-orange-600 font-semibold">
                Página de Contato
              </a>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <a href="mailto:suporte@newsplay.com.br" className="text-primary-orange hover:text-orange-600 font-semibold">
                suporte@newsplay.com.br
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}