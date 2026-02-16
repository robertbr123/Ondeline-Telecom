import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermosPage() {
  return (
    <main className="w-full">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Termos de Uso</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao utilizar os serviços da Ondeline Telecom, você concorda com estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, por favor, não utilize nossos serviços.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Serviços Prestados</h2>
            <p>
              A Ondeline Telecom fornece serviços de internet de alta velocidade nas cidades de Ipixuna, Eirunepe, 
              Itamarati e Carauari, no estado do Amazonas. Nosso objetivo é oferecer conexão estável e suporte técnico 24/7.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Responsabilidades do Cliente</h2>
            <p>
              O cliente se compromete a:
            </p>
            <ul>
              <li>Fornecer informações verdadeiras e atualizadas</li>
              <li>Pagar as mensalidades nos prazos estabelecidos</li>
              <li>Não utilizar a internet para atividades ilegais</li>
              <li>Manter os equipamentos em bom estado</li>
              <li>Respeitar as normas de uso da rede</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Pagamento</h2>
            <p>
              O valor do serviço deve ser pago mensalmente, conforme o plano contratado. 
              O não pagamento pode resultar na suspensão ou cancelamento dos serviços. 
              Os valores estão sujeitos a reajustes conforme legislação vigente.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Suporte Técnico</h2>
            <p>
              Oferecemos suporte técnico 24 horas por dia, 7 dias por semana. 
              Para solicitar suporte, entre em contato através do WhatsApp ou telefone disponível em nosso site.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Cancelamento</h2>
            <p>
              O cliente pode cancelar os serviços a qualquer momento, mediante aviso prévio de 30 dias. 
              Após o cancelamento, os equipamentos devem ser devolvidos em bom estado.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Disponibilidade</h2>
            <p>
              Nosso compromisso é manter 99.5% de disponibilidade do serviço. 
              Interrupções planejadas serão comunicadas com antecedência quando possível.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Modificações</h2>
            <p>
              A Ondeline se reserva o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação no site.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Contato</h2>
            <p>
              Para dúvidas sobre estes termos, entre em contato:
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