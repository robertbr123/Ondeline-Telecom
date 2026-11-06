# syntax=docker/dockerfile:1.7
# Build stage
FROM node:22-alpine AS base

WORKDIR /app

# Dependências nativas necessárias para sharp e tailwindcss/oxide
RUN apk add --no-cache libc6-compat

ENV NEXT_TELEMETRY_DISABLED=1

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências usando o lockfile.
# O cache do npm fica guardado entre deploys (BuildKit), então só baixa o que mudou.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --no-fund

# Copiar resto do código
COPY . .

# Build do projeto (cache do Next reaproveitado entre deploys)
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# Imagem de produção (limpa e leve)
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5008
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat

# Copiar APENAS o standalone + static + public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 5008

CMD ["node", "server.js"]
