# Build stage
FROM node:20-alpine AS base

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm e dependências (incluindo framer-motion)
RUN corepack enable pnpm
RUN pnpm install --no-frozen-lockfile

# Copiar resto do código
COPY . .

# Build do projeto
RUN pnpm run build

# Imagem de produção (limpa e leve)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5008

# Copiar APENAS o standalone + static + public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 5008

CMD ["node", "server.js"]
