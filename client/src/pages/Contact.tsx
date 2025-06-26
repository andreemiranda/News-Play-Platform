import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight, Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Obrigado pelo seu contato. Responderemos em breve.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1000);
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
          <li className="text-gray-800">Contato</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-blue mb-4">
          Entre em Contato
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Estamos aqui para ouvir você. Entre em contato conosco para sugestões, 
          dúvidas ou qualquer feedback sobre o NewsPlay.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-primary-blue">
                <MessageCircle className="h-6 w-6 text-primary-orange mr-2" />
                Envie sua Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu.email@exemplo.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Assunto da sua mensagem"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="geral">Dúvida Geral</SelectItem>
                        <SelectItem value="tecnico">Suporte Técnico</SelectItem>
                        <SelectItem value="sugestao">Sugestão</SelectItem>
                        <SelectItem value="parcerias">Parcerias</SelectItem>
                        <SelectItem value="imprensa">Imprensa</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escreva sua mensagem aqui..."
                    rows={6}
                    className="mt-1 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gradient-button w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-blue">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary-orange mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">E-mail</p>
                  <p className="text-gray-600 text-sm">contato@newsplay.com.br</p>
                  <p className="text-gray-600 text-sm">redacao@newsplay.com.br</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-orange mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Telefone</p>
                  <p className="text-gray-600 text-sm">+55 (11) 9999-9999</p>
                  <p className="text-gray-600 text-xs">Segunda a Sexta, 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-orange mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Endereço</p>
                  <p className="text-gray-600 text-sm">
                    São Paulo, SP<br />
                    Brasil
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-primary-blue">
                <Clock className="h-5 w-5 text-primary-orange mr-2" />
                Horário de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Segunda - Sexta</span>
                  <span className="font-medium">9h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-medium">9h às 14h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo</span>
                  <span className="text-gray-500">Fechado</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Atendimento Digital:</strong> Nosso site está disponível 24/7.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Link */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary-blue mb-2">
                Perguntas Frequentes
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Antes de entrar em contato, confira se sua dúvida já foi respondida 
                em nossa seção de perguntas frequentes.
              </p>
              <Link href="/faq">
                <Button variant="outline" size="sm" className="w-full">
                  Ver FAQ
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Team Info */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-primary-blue mb-2">
                Desenvolvido por
              </h3>
              <div className="inline-block bg-gradient-to-br from-primary-blue to-secondary-blue text-white rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">AM</span>
              </div>
              <p className="font-medium text-gray-900">André Miranda</p>
              <p className="text-gray-600 text-sm">
                Desenvolvedor e Fundador do NewsPlay
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <Card className="bg-gray-50">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-primary-blue mb-2">Tempo de Resposta</h4>
              <p className="text-gray-600 text-sm">
                Respondemos em até 24 horas durante dias úteis. Para questões urgentes, 
                utilize nossos canais prioritários.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary-blue mb-2">Suporte Técnico</h4>
              <p className="text-gray-600 text-sm">
                Para problemas técnicos, inclua detalhes sobre seu dispositivo, 
                navegador e uma descrição completa do problema.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary-blue mb-2">Feedback</h4>
              <p className="text-gray-600 text-sm">
                Suas sugestões são valiosas para nós. Ajude-nos a melhorar 
                o NewsPlay compartilhando sua experiência.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
