import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
          Política de Privacidade
        </h1>
        <p className="text-gray-600">
          Última atualização: 26 de junho de 2025
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">1. Informações que Coletamos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              O NewsPlay coleta informações quando você navega em nosso site, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Informações de navegação (páginas visitadas, tempo de permanência)</li>
              <li>Dados técnicos (endereço IP, tipo de navegador, sistema operacional)</li>
              <li>Preferências de conteúdo e interações com notícias</li>
              <li>Informações fornecidas voluntariamente através de formulários de contato</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">2. Como Utilizamos suas Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Melhorar a experiência de navegação no site</li>
              <li>Personalizar o conteúdo apresentado</li>
              <li>Analisar tendências e padrões de uso</li>
              <li>Responder a solicitações de suporte e contato</li>
              <li>Garantir a segurança e funcionamento do site</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">3. Compartilhamento de Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              O NewsPlay não vende, aluga ou compartilha suas informações pessoais com terceiros, 
              exceto nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Quando exigido por lei ou ordem judicial</li>
              <li>Para proteger nossos direitos legais</li>
              <li>Com prestadores de serviços que nos auxiliam na operação do site</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">4. Cookies e Tecnologias Similares</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Utilizamos cookies para melhorar sua experiência de navegação. Você pode controlar 
              o uso de cookies através das configurações do seu navegador. Para mais informações, 
              consulte nossa Política de Cookies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">5. Segurança dos Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Implementamos medidas de segurança adequadas para proteger suas informações contra 
              acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhuma 
              transmissão pela internet é 100% segura.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">6. Seus Direitos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Você tem o direito de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir dados incorretos</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Limitar o processamento de seus dados</li>
              <li>Retirar o consentimento a qualquer momento</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">7. Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Para questões sobre esta Política de Privacidade, entre em contato conosco através 
              da página de contato ou pelo e-mail: privacidade@newsplay.com.br
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}