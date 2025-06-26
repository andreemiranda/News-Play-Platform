import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfUse() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
          Termos de Uso
        </h1>
        <p className="text-gray-600">
          Última atualização: 26 de junho de 2025
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">1. Aceitação dos Termos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Ao acessar e usar o NewsPlay, você concorda em cumprir e estar vinculado a estes 
              Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve 
              usar nosso serviço.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">2. Descrição do Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              O NewsPlay é um portal de notícias que fornece informações atualizadas sobre 
              diversos temas. Nosso conteúdo é sincronizado com fontes confiáveis e atualizado 
              regularmente para oferecer as notícias mais recentes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">3. Uso Aceitável</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Você concorda em usar o NewsPlay apenas para fins legais e de acordo com estes termos. 
              É proibido:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Usar o serviço para qualquer propósito ilegal ou não autorizado</li>
              <li>Tentar interferir no funcionamento do site</li>
              <li>Copiar, reproduzir ou distribuir conteúdo sem autorização</li>
              <li>Usar sistemas automatizados para extrair dados do site</li>
              <li>Publicar ou transmitir conteúdo ofensivo ou prejudicial</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">4. Propriedade Intelectual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Todo o conteúdo do NewsPlay, incluindo textos, imagens, logos e design, está 
              protegido por direitos autorais e outras leis de propriedade intelectual. 
              O uso não autorizado é estritamente proibido.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">5. Precisão das Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Embora nos esforcemos para fornecer informações precisas e atualizadas, não 
              garantimos a exatidão, completude ou atualidade de todo o conteúdo. As informações 
              são fornecidas "como estão" e podem conter erros ou omissões.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">6. Limitação de Responsabilidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              O NewsPlay não será responsável por qualquer dano direto, indireto, incidental 
              ou consequencial resultante do uso ou incapacidade de usar nosso serviço. 
              Isso inclui, mas não se limita a, perda de dados ou lucros.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">7. Disponibilidade do Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Nos reservamos o direito de modificar, suspender ou descontinuar qualquer 
              parte do serviço a qualquer momento, com ou sem aviso prévio. Não seremos 
              responsáveis por qualquer interrupção ou modificação.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">8. Modificações dos Termos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Podemos atualizar estes Termos de Uso periodicamente. Quando o fizermos, 
              revisaremos a data da "última atualização" no topo desta página. 
              Recomendamos que você revise estes termos regularmente.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">9. Lei Aplicável</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa 
              será resolvida nos tribunais competentes do Brasil.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary-orange">10. Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Para questões sobre estes Termos de Uso, entre em contato conosco através 
              da página de contato ou pelo e-mail: legal@newsplay.com.br
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}