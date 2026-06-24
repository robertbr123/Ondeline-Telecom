# Detector Ondeline — Monitor de Serviços (estilo Downdetector)

**Data:** 2026-06-23
**Status:** Aprovado

## Objetivo

Criar uma página estilo Downdetector, com a marca da Ondeline (logo, nome, cores),
que mostra o status em tempo real dos principais serviços do Brasil/mundo, cada um
com o logo da empresa, sinal colorido, % de disponibilidade e mini-gráfico das últimas
horas. A página serve como ferramenta interna de marketing: tirar print e postar nas
redes sociais.

É **separada** da página `/status` existente (que monitora a infra interna da Ondeline).

## Decisões (brainstorming)

| Tema | Decisão |
|------|---------|
| Fonte do status | Verificação real via HTTP (server-side) |
| Visual do card | Logo + status + uptime% + mini-gráfico 24h (sparkline) |
| Logos | API automática (Clearbit: `logo.clearbit.com/<domínio>`), fallback inicial |
| Agrupamento | Por categoria |
| Botão print | Sim — botão "Gerar imagem" que baixa PNG brandado |
| Navegação | Página oculta (só link direto `/detector`), fora do menu |

## Rota

`/detector` — fora do menu e do sitemap público, acessível por link direto.

## Serviços monitorados (lista inicial)

Definidos em `lib/detector-services.ts`, fácil de editar. Cada item:
`{ name, domain, category, checkUrl? }`.

- **Redes Sociais:** Instagram (instagram.com), Facebook (facebook.com),
  WhatsApp (whatsapp.com), YouTube (youtube.com), X/Twitter (x.com), TikTok (tiktok.com)
- **Streaming:** Netflix (netflix.com), Disney+ (disneyplus.com), Prime Video (primevideo.com)
- **Bancos:** Nubank (nubank.com.br), Bradesco (bradesco.com.br), Itaú (itau.com.br),
  Caixa (caixa.gov.br)
- **Operadoras:** Vivo (vivo.com.br), Claro (claro.com.br), TIM (tim.com.br)
- **Infraestrutura:** Cloudflare (cloudflare.com), Google (google.com), AWS (aws.amazon.com)

## Arquitetura

### API `GET /api/detector`

- Bootstrap: `CREATE TABLE IF NOT EXISTS external_status_checks (id, service, status, response_time, checked_at)` — sem migração manual (segue padrão raw SQL do projeto via `lib/db`).
- Para cada serviço, faz `fetch` (método `HEAD`, fallback `GET`) com `AbortSignal.timeout(5000)`, em paralelo (`Promise.allSettled`).
- Classificação:
  - **operational**: resposta OK e tempo < 2000ms
  - **degraded**: resposta lenta (>= 2000ms) ou status HTTP não-ok porém respondeu
  - **down**: timeout / erro de rede / sem resposta
- Salva cada checagem na tabela.
- Calcula `uptime%` por serviço (últimas 24h) e devolve histórico (buckets) para o sparkline.
- Cache de ~60s (in-memory module-level) para não martelar os sites a cada print/refresh.
- Resposta:
  ```json
  {
    "success": true,
    "data": {
      "overall": "operational | degraded | down",
      "services": [
        { "name", "domain", "category", "status", "responseTime", "uptime", "history": [...], "lastCheck" }
      ],
      "lastUpdated": "ISO"
    }
  }
  ```

### `lib/detector-services.ts`

Lista tipada dos serviços + categorias (ordem de exibição). Single source of truth.

### Página `app/detector/page.tsx` (client) + `app/detector/layout.tsx`

- Header com logo Ondeline + título "Detector Ondeline — Status dos Serviços" + horário.
- Banner geral (todos normais / N com problema), com cor.
- Seções por categoria; em cada seção, grade de cards:
  - Logo (Clearbit, com fallback de inicial), nome, sinal colorido (verde/amarelo/vermelho),
    uptime%, sparkline 24h, tempo de resposta.
- Auto-refresh a cada 60s + botão de atualizar manual.
- Usa as cores/tema existentes (primary azul, neon-cyan), claro/escuro.
- `layout.tsx` com metadata `robots: noindex` (página oculta).

### Componente de export — botão "Gerar imagem"

- Botão "📸 Gerar imagem" renderiza um cartão-resumo brandado (logo Ondeline, cores,
  título, data, lista de serviços + status) e baixa um **PNG** via `html-to-image`
  (`toPng` → download). O cartão tem dimensões fixas boas para post (ex: 1080x1350).

### Dependência nova

- `html-to-image` (leve, client-side) para exportar PNG.

## Componentes / unidades

- `lib/detector-services.ts` — dados dos serviços. Sem dependências.
- `app/api/detector/route.ts` — checagem + persistência + agregação. Depende de `lib/db`, `lib/detector-services`.
- `components/detector/service-card.tsx` — card individual (logo, status, sparkline).
- `components/detector/status-sparkline.tsx` — mini-gráfico a partir do histórico.
- `components/detector/export-card.tsx` — cartão brandado para PNG.
- `app/detector/page.tsx` — orquestra fetch, agrupa por categoria, render + export.

## Tratamento de erros

- Falha de fetch de um serviço → status `down` (não derruba os demais; `Promise.allSettled`).
- Logo falha ao carregar → `onError` troca por avatar com inicial.
- API falha geral → página mostra estado de erro com botão "tentar novamente".
- DB indisponível → checagens ainda funcionam; uptime/sparkline degrada para "sem histórico" (não quebra).

## Testes / verificação

- `npm run build` e `npm run lint` passam.
- Rodar local (`npm run dev`, porta 5008), abrir `/detector`, confirmar:
  - cards carregam com logos e status,
  - sparkline aparece após ter histórico,
  - botão "Gerar imagem" baixa um PNG brandado.

## Fora de escopo (YAGNI)

- Relatos crowdsourced (usuários reportando) — não há base de usuários para isso.
- Override manual de status pelo admin — pode ser adicionado depois.
- Mapa de calor geográfico.
