"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, User } from "lucide-react"

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  image: string
  content: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "Como Otimizar Sua Conexão de Internet em Casa",
    excerpt: "Dicas práticas para melhorar a velocidade e estabilidade da sua conexão",
    category: "Dicas",
    author: "Ondeline",
    date: "15 de Novembro de 2024",
    image: "/internet-home-setup.jpg",
    content: `A conexão de internet em casa é essencial nos dias de hoje. Mas muitas vezes, não aproveitamos todo o potencial que contratamos. Aqui estão algumas dicas práticas para otimizar sua conexão:

1. Posicionamento do Roteador
O local onde você coloca seu roteador é fundamental. Prefera lugares elevados e centralizados na sua casa. Evite colocar embaixo de móveis, em cantos ou próximo a microondas.

2. Use Frequência 5GHz
Se seu roteador é dual-band (2.4GHz e 5GHz), prefira a frequência 5GHz para atividades que exigem maior velocidade, como streaming de vídeos em 4K ou videochamadas.

3. Mantenha o Roteador Atualizado
Regularly atualize o firmware do seu roteador. Essas atualizações incluem melhorias de segurança e performance.

4. Reduza Interferências
Afaste seu roteador de outros aparelhos eletrônicos que emitem sinais de rádio, como telefones sem fio e microondas.

5. Use Cabo Ethernet
Para atividades que exigem máxima estabilidade, como videochamadas importantes ou jogos online, use um cabo Ethernet. Você terá uma conexão mais estável e rápida.

Seguindo essas dicas simples, você notará uma melhora significativa na sua experiência de navegação!`,
  },
  {
    id: "2",
    title: "Segurança de Internet: Proteja Seus Dados Online",
    excerpt: "Guia completo sobre como manter seus dados seguros na internet",
    category: "Segurança",
    author: "Ondeline",
    date: "12 de Novembro de 2024",
    image: "/internet-security-lock.jpg",
    content: `A segurança online é um dos temas mais importantes na era digital. Com o aumento dos ataques cibernéticos, é essencial que você saiba como proteger seus dados pessoais e financeiros.

1. Use Senhas Fortes
Crie senhas complexas com letras maiúsculas, minúsculas, números e símbolos. Evite usar informações pessoais como datas de nascimento ou nomes de animais de estimação.

2. Ative Autenticação de Dois Fatores
Sempre que possível, ative o 2FA (autenticação de dois fatores). Isso adiciona uma camada extra de segurança às suas contas.

3. Desconfie de Emails Suspeitos
Phishing é um dos ataques mais comuns. Não clique em links de emails desconhecidos e verifique sempre o remetente.

4. Mantenha seu Antivírus Atualizado
Um bom antivírus é essencial. Mantenha-o sempre atualizado para proteger contra as ameaças mais recentes.

5. Use VPN em Redes Públicas
Ao usar Wi-Fi público, utilize uma VPN. Isso criptografa seus dados e mantém sua privacidade.

6. Faça Backup de Seus Dados
Regularmente, faça backup de seus arquivos importantes. Isso protege você contra perda de dados por ataques ou falhas.

Seguindo essas práticas, você estará muito mais protegido online!`,
  },
  {
    id: "3",
    title: "Expansão Ondeline: Chegando em Itamarati e Carauari",
    excerpt: "Saiba sobre a expansão dos serviços Ondeline para novas cidades",
    category: "Notícias",
    author: "Ondeline",
    date: "10 de Novembro de 2024",
    image: "/amazon-expansion-map.jpg",
    content: `A Ondeline tem o prazer de anunciar sua expansão para novas cidades na região amazônica!

Estamos Chegando em:
- Itamarati (previsto para dezembro de 2024)
- Carauari (previsto para janeiro de 2025)

Além das cidades já atendidas:
- Ipixuna
- Eirunepe

O Compromisso Ondeline
Nossa missão é levar internet de qualidade para todos os cantos da Amazônia. Sabemos que a conectividade é essencial para educação, negócios e comunicação.

Por que a Ondeline?
- Velocidades até 80 Mbps
- Suporte 24/7 em português
- Técnicos qualificados na região
- Confiança de empresas como Bradesco, Correios e CETAM

Se você está em Itamarati ou Carauari e deseja contratar nossos serviços, entre em contato conosco! Em breve estaremos disponíveis em sua cidade.

Acompanhe nossas redes sociais para atualizações sobre a expansão!`,
  },
  {
    id: "4",
    title: "Internet Rápida para Seus Negócios: Planos Empresariais",
    excerpt: "Conheça nossos planos especiais para empresas e negócios",
    category: "Negócios",
    author: "Ondeline",
    date: "08 de Novembro de 2024",
    image: "/business-office-internet.jpg",
    content: `Se você gerencia um negócio, sabe que uma internet confiável é fundamental para o sucesso operacional.

Por que Escolher Ondeline para Seu Negócio?

1. Velocidades Profissionais
Oferecemos planos customizados com velocidades até 80 Mbps, perfeitos para:
- Videoconferências em alta qualidade
- Transferência de arquivos pesados
- Múltiplos usuários simultaneamente
- Backup em nuvem contínuo

2. Suporte Prioritário 24/7
Nosso suporte é o mais rápido da região. Problemas resolvidos em tempo recorde para evitar downtime do seu negócio.

3. Confiabilidade Comprovada
Empresas de renome como Bradesco, Correios e CETAM confiam em nossos serviços. Isso fala por si!

4. Plano Customizado
Não oferecemos apenas planos pré-definidos. Podemos criar um plano que se adeque perfeitamente às suas necessidades.

Solicite um Orçamento
Entre em contato conosco para discutir as necessidades específicas do seu negócio. Temos soluções para empresas de todos os tamanhos!`,
  },
  {
    id: "5",
    title: "Streaming de Vídeos em 4K: É Possível com Ondeline?",
    excerpt: "Saiba se você pode fazer streaming em 4K com nossos planos",
    category: "Dicas",
    author: "Ondeline",
    date: "05 de Novembro de 2024",
    image: "/4k-video-streaming.jpg",
    content: `Muitas pessoas nos perguntam: "Posso fazer streaming em 4K com a Ondeline?" A resposta é SIM! Mas com algumas considerações.

Requisitos para Streaming em 4K

Velocidade Necessária:
- Netflix 4K: 25 Mbps
- YouTube 4K: 35-45 Mbps
- Disney+ 4K: 25 Mbps

Com nosso plano de 50 MB ou 80 MB, você consegue fazer streaming em 4K com qualidade excelente.

Dicas para Melhor Qualidade:

1. Use Cabo Ethernet
Embora Wi-Fi funcione, o cabo Ethernet garante melhor estabilidade e velocidade.

2. Feche Outras Abas e Aplicativos
Outros downloads ou uploads podem impactar a velocidade disponível. Feche o máximo possível.

3. Escolha Horários Menos Congestionados
Se possível, faça streaming em horários fora do pico (antes das 18h ou após as 23h).

4. Verifique Sua Velocidade
Teste sua conexão em speedtest.net para confirmar que está recebendo a velocidade contratada.

Conclusão
Com qualquer um de nossos planos profissionais, você terá uma excelente experiência de streaming em 4K. Não se preocupe!`,
  },
  {
    id: "6",
    title: "Internet para Educação: Transformando Aprendizado Online",
    excerpt: "Como a Ondeline está ajudando estudantes na região amazônica",
    category: "Educação",
    author: "Ondeline",
    date: "01 de Novembro de 2024",
    image: "/online-education-learning.jpg",
    content: `A pandemia mudou a forma como aprendemos. Muitos estudantes agora dependem de internet de qualidade para suas aulas.

Educação Online Requer Conexão Estável

Desafios na Amazônia:
- Falta de infraestrutura
- Cidades remotas sem conectividade adequada
- Internet lenta que prejudica aprendizado

Como a Ondeline Ajuda:

1. Velocidades Adequadas para Aulas Online
Nossas conexões permitem que estudantes participem de aulas ao vivo sem travamentos, mesmo com múltiplos participantes.

2. Suporte Técnico Rápido
Se há problema com a conexão durante uma aula importante, nosso suporte resolve em minutos, não horas.

3. Preços Acessíveis
Entendemos que estudantes e famílias têm orçamentos limitados. Por isso oferecemos planos competitivos.

4. Impacto Social
Levamos educação de qualidade para comunidades que antes não tinham acesso.

Histórias de Sucesso
Temos centenas de estudantes que conseguiram melhorar seu desempenho acadêmico após contratar a Ondeline.

Se você é estudante ou responsável educacional, conheça nossos planos especiais!`,
  },
]

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  const categories = ["Todos", ...new Set(articles.map((a) => a.category))]

  const filteredArticles =
    selectedCategory === "Todos" ? articles : articles.filter((a) => a.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {selectedArticle ? (
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition"
              >
                <ArrowLeft size={20} />
                Voltar ao Blog
              </button>

              <article>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground mb-4">{selectedArticle.title}</h1>
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {selectedArticle.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {selectedArticle.author}
                    </div>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {selectedArticle.category}
                    </span>
                  </div>
                </div>

                <img
                  src={selectedArticle.image || "/placeholder.svg"}
                  alt={selectedArticle.title}
                  className="w-full h-96 object-cover rounded-lg mb-8"
                />

                <div className="prose prose-invert max-w-none">
                  {selectedArticle.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="text-foreground text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Artigos Relacionados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles
                      .filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                      .slice(0, 3)
                      .map((article) => (
                        <button
                          key={article.id}
                          onClick={() => setSelectedArticle(article)}
                          className="text-left hover:opacity-80 transition"
                        >
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                          />
                          <h4 className="font-semibold text-foreground hover:text-primary transition">
                            {article.title}
                          </h4>
                        </button>
                      ))}
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">Blog Ondeline</h1>
                <p className="text-muted-foreground text-lg">
                  Dicas, notícias e informações sobre internet de qualidade na Amazônia
                </p>
              </div>

              <div className="mb-8 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="group text-left h-full hover:opacity-80 transition"
                  >
                    <div className="bg-secondary rounded-lg overflow-hidden h-full flex flex-col">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="p-4 flex-1 flex flex-col">
                        <span className="text-xs text-primary font-semibold mb-2">{article.category}</span>
                        <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{article.author}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
