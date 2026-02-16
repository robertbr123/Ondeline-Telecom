import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacidadePage() {
  return (
    <main className="w-full">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Política de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Informações que Coletamos</h2>
            <p>
              A Ondeline Telecom coleta informações pessoais que você nos fornece diretamente, como nome, 
              endereço, telefone e e-mail, quando você se cadastra em nossos serviços ou entra em contato conosco.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Como Usamos suas Informações</h2>
            <p>
              Utilizamos suas informações para fornecer serviços de internet, processar pagamentos, 
              oferecer suporte técnico e melhorar nossos serviços. Não compartilhamos seus dados com terceiros 
              sem seu consentimento, exceto quando exigido por lei.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança robustas para proteger suas informações contra acesso não autorizado, 
              alteração ou destruição. Utilizamos criptografia SSL e seguimos as melhores práticas de segurança.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Seus Direitos</h2>
            <p>
              Você tem direito a acessar, corrigir ou excluir suas informações pessoais. 
              Para exercer esses direitos, entre em contato conosco através do e-mail contato@ondeline.com.br
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência de navegação, analisar o uso do site e 
              personalizar conteúdo. Você pode configurar seu navegador para recusar cookies.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Contato</h2>
            <p>
              Para dúvidas sobre esta política de privacidade, entre em contato:
            </p>
            <ul>
              <li>E-mail: contato@ondeline.com.br</li>
              <li>Telefone: (92) 98460-7721</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}