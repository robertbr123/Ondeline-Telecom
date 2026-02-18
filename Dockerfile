# Build stage
FROM node:20-alpine AS base

WORKDIR /app

# Dependências nativas necessárias para sharp e tailwindcss/oxide
RUN apk add --no-cache libc6-compat

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm e dependências
RUN corepack enable pnpm
RUN pnpm config set package-manager-strict false
RUN pnpm install --no-frozen-lockfile

# Aprovar build scripts (sharp, tailwindcss/oxide)
RUN pnpm approve-builds sharp @tailwindcss/oxide
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

RUN apk add --no-cache libc6-compat

# Copiar APENAS o standalone + static + public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 5008

CMD ["node", "server.js"]
