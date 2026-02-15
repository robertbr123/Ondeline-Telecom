-- ============================================
-- Migração: Adicionar Índices de Performance
-- Data: 15/02/2025
-- Objetivo: Otimizar queries comuns no PostgreSQL
-- ============================================

-- Índices para tabela de clients
CREATE INDEX IF NOT EXISTS idx_clients_active_order ON clients(active, "order") 
WHERE active = 1;

CREATE INDEX IF NOT EXISTS idx_clients_name ON clients USING gin(to_tsvector('portuguese', name));

-- Índices para tabela de plans
CREATE INDEX IF NOT EXISTS idx_plans_active_highlighted ON plans(active, highlighted)
WHERE active = 1;

CREATE INDEX IF NOT EXISTS idx_plans_price ON plans(price) 
WHERE active = 1;

-- Índices para tabela de blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON blog_posts(published_at DESC)
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_blog_posts_title_search ON blog_posts USING gin(to_tsvector('portuguese', title));

-- Índices para tabela of coverage_areas
CREATE INDEX IF NOT EXISTS idx_coverage_areas_status ON coverage_areas(status)
WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_coverage_areas_city_state ON coverage_areas(city, state);

-- Índices para tabela de leads
CREATE INDEX IF NOT EXISTS idx_leads_status_created ON leads(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Índices para tabela of referrals
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer_email ON referrals(referrer_email);

CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON referrals(created_at DESC);

-- Índices para tabela de faq
CREATE INDEX IF NOT EXISTS idx_faq_active_order ON faq(active, "order")
WHERE active = 1;

CREATE INDEX IF NOT EXISTS idx_faq_category ON faq(category)
WHERE active = 1;

-- Índices para tabela de materials
CREATE INDEX IF NOT EXISTS idx_materials_active_category ON materials(active, category)
WHERE active = 1;

CREATE INDEX IF NOT EXISTS idx_materials_type ON materials(file_type)
WHERE active = 1;

-- Índices compostos para queries frequentes
CREATE INDEX IF NOT EXISTS idx_plans_search ON plans(active, highlighted, price);

-- Índice full-text search para blog
CREATE INDEX IF NOT EXISTS idx_blog_posts_fulltext ON blog_posts 
USING gin(to_tsvector('portuguese', coalesce(title, '') || ' ' || coalesce(excerpt, '')));

-- Índice para analytics (se existir tabela)
-- CREATE INDEX IF NOT EXISTS idx_analytics_date_path ON analytics(created_at, path);

-- Comentário sobre os índices
COMMENT ON INDEX idx_clients_active_order IS 'Índice para buscar clientes ativos ordenados';
COMMENT ON INDEX idx_plans_active_highlighted IS 'Índice para buscar planos ativos e destacados';
COMMENT ON INDEX idx_blog_posts_published_date IS 'Índice para buscar posts publicados por data';
COMMENT ON INDEX idx_coverage_areas_status IS 'Índice para buscar áreas de cobertura ativas';
COMMENT ON INDEX idx_leads_status_created IS 'Índice para buscar leads por status e data';
COMMENT ON INDEX idx_referrals_status IS 'Índice para buscar indicações por status';

-- Analisar tabelas após criar índices (melhora performance de queries futuras)
ANALYZE clients;
ANALYZE plans;
ANALYZE blog_posts;
ANALYZE coverage_areas;
ANALYZE leads;
ANALYZE referrals;
ANALYZE faq;
ANALYZE materials;

-- ============================================
-- Notas de Performance
-- ============================================
-- 
-- 1. Índices partial (WHERE clause) são mais eficientes para tabelas com muitos dados inativos
-- 2. Índices GIN são usados para full-text search
-- 3. ANALYZE atualiza estatísticas do PostgreSQL para otimizar query planner
-- 4. Considere usar EXPLAIN ANALYZE para verificar se índices estão sendo usados
-- 
-- ============================================