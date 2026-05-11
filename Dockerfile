# Build stage
FROM node:22-alpine AS base

WORKDIR /app

# Dependências nativas necessárias para sharp e tailwindcss/oxide
RUN apk add --no-cache libc6-compat

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências de forma reprodutível usando o lockfile do npm
RUN npm ci

# Copiar resto do código
COPY . .

# Build do projeto
RUN npm run build

# Imagem de produção (limpa e leve)
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5008

RUN apk add --no-cache libc6-compat

# Copiar APENAS o standalone + static + public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 5008

CMD ["node", "server.js"]
