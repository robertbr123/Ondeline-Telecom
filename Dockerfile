# Imagem base Node.js
FROM node:20-alpine AS base

# Instalar dependências do sistema necessárias para better-sqlite3
RUN apk add --no-cache python3 make g++

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm
RUN corepack enable pnpm

# Instalar dependências
RUN pnpm install --no-frozen-lockfile

# Copiar resto do código
COPY . .

# Build do projeto
RUN pnpm run build

# Imagem de produção
FROM node:20-alpine AS runner

WORKDIR /app

# Instalar dependências do sistema necessárias para better-sqlite3
RUN apk add --no-cache python3 make g++

# Instalar pnpm
RUN corepack enable pnpm

# Copiar dependências do node_modules da build stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Copiar arquivos de build
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

# Criar diretório para banco de dados
RUN mkdir -p data

# Expor porta
EXPOSE 3008

# Variável de ambiente
ENV NODE_ENV=production
ENV PORT=3008

# Comando para iniciar
CMD ["node", "server.js"]
