-- Criar tabela de páginas para o CMS
CREATE TABLE IF NOT EXISTS pages (
  id VARCHAR(255) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT[],
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image VARCHAR(500),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_active ON pages(active);
CREATE INDEX IF NOT EXISTS idx_pages_updated_at ON pages(updated_at);

-- Inserir páginas padrão
INSERT INTO pages (id, slug, title, content, hero_title, hero_subtitle, active) VALUES
(
  'page-ipixuna',
  'ipixuna',
  'Internet em Ipixuna',
  'Conteúdo da página de Ipixuna',
  'Internet de Alta Velocidade em Ipixuna',
  'Conecte sua casa ou empresa com a melhor internet da região',
  true
),
(
  'page-eirunepe',
  'eirunepe',
  'Internet em Eirunepe',
  'Conteúdo da página de Eirunepe',
  'Internet de Alta Velocidade em Eirunepe',
  'Conecte sua casa ou empresa com a melhor internet da região',
  true
),
(
  'page-itamarati',
  'itamarati',
  'Internet em Itamarati',
  'Conteúdo da página de Itamarati',
  'Internet de Alta Velocidade em Itamarati',
  'Conecte sua casa ou empresa com a melhor internet da região',
  true
),
(
  'page-carauari',
  'carauari',
  'Internet em Carauari',
  'Conteúdo da página de Carauari',
  'Internet de Alta Velocidade em Carauari',
  'Conecte sua casa ou empresa com a melhor internet da região',
  true
),
(
  'page-empresas',
  'empresas',
  'Soluções para Empresas',
  'Conteúdo da página de Empresas',
  'Servidores e Cloud Computing para Empresas',
  'Infraestrutura robusta, segura e escalável para impulsionar seu negócio',
  true
),
(
  'page-coverage',
  'coverage',
  'Mapa de Cobertura',
  'Conteúdo da página de Cobertura',
  'Mapa de Cobertura Ondeline',
  'Verifique se sua região está coberta pela nossa rede',
  true
),
(
  'page-indicar',
  'indicar',
  'Indique um Amigo',
  'Conteúdo da página de Indicação',
  'Indique a Ondeline e Ganhe',
  'Ganhe benefícios ao indicar nossos serviços para amigos e familiares',
  true
)
ON CONFLICT (slug) DO NOTHING;

COMMENT ON TABLE pages IS 'Páginas editáveis do site - CMS';
COMMENT ON COLUMN pages.slug IS 'URL amigável da página (ex: ipixuna, empresas)';
COMMENT ON COLUMN pages.content IS 'Contúdo principal da página (HTML/Markdown)';
COMMENT ON COLUMN pages.hero_title IS 'Título da seção hero';
COMMENT ON COLUMN pages.hero_subtitle IS 'Subtítulo da seção hero';
COMMENT ON COLUMN pages.hero_image IS 'URL da imagem da seção hero';
COMMENT ON COLUMN pages.active IS 'Se a página está ativa e visível';