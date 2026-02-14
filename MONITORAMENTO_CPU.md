# 📊 Sistema de Monitoramento de Tráfego e Recursos

Este documento explica como usar o sistema de monitoramento para identificar a origem do consumo excessivo de CPU.

## 🎯 Objetivo

Identificar onde está vindo todo o tráfego e consumo de recursos que está causando 989.10% de CPU no Dokploy.

## 🔧 O que foi implementado

### 1. Middleware de Monitoramento (`middleware.ts`)
- Loga todas as requisições com detalhes completos
- Detecta padrões suspeitos automaticamente:
  - ⚠️ Rate Limiting (mesmo IP fazendo muitas requisições)
  - ⚠️ Scraping (mesmo user-agent acessando muitas rotas)
  - ⚠️ API Abuse (excesso de chamadas à API)
- Extrai IP real do cliente (suporta Cloudflare, proxy reverso)

### 2. Endpoint de Análise de Tráfego (`/api/debug/traffic`)
- Estatísticas detalhadas de todas as requisições
- Identifica top IPs, rotas e user-agents
- Exporta em CSV para análise
- Detecta atividades suspeitas automaticamente

### 3. Endpoint de Recursos do Sistema (`/api/debug/resources`)
- Mede uso de CPU em tempo real
- Monitora consumo de memória
- Identifica vazamentos de memória
- Gera alertas e recomendações

## 📡 Como Usar

### 1. Acessar o Monitoramento de Tráfego

Após fazer o deploy, acesse:

```
GET https://seu-dominio.com/api/debug/traffic
```

#### Parâmetros disponíveis:

- `format` - Formato de saída:
  - `summary` (padrão): Resumo das estatísticas
  - `detailed`: Logs completos com todos os detalhes
  - `csv`: Download em CSV para análise em Excel

- `minutes` - Período de tempo (padrão: 5 minutos)
  ```
  /api/debug/traffic?minutes=15&format=summary
  /api/debug/traffic?minutes=60&format=csv
  ```

#### Exemplo de resposta (format=summary):

```json
{
  "success": true,
  "stats": {
    "totalRequests": 1247,
    "timeframe": "últimos 5 minutos",
    "byMethod": { "GET": 1200, "POST": 47 },
    "byPath": {
      "/api/plans": 856,
      "/api/coverage": 234,
      "/": 157
    },
    "uniqueIPs": 23,
    "topPaths": [
      { "path": "/api/plans", "count": 856 },
      { "path": "/api/coverage", "count": 234 }
    ],
    "topIPs": [
      { "ip": "192.168.1.100", "count": 234 },
      { "ip": "10.0.0.1", "count": 189 }
    ],
    "suspicious": {
      "rateLimiting": [
        { "ip": "192.168.1.100", "count": 345 }
      ],
      "scraping": [],
      "apiAbuse": []
    }
  }
}
```

### 2. Acessar Monitoramento de Recursos

```
GET https://seu-dominio.com/api/debug/resources
```

#### Exemplo de resposta:

```json
{
  "success": true,
  "stats": {
    "timestamp": "2026-02-13T23:42:00.000Z",
    "uptime": 7200,
    "memory": {
      "start": { "rss": 150, "heapUsed": 120 },
      "end": { "rss": 180, "heapUsed": 145 },
      "delta": { "heapUsed": 25 }
    },
    "cpu": {
      "usagePercent": 87,
      "rawTime": 4.35,
      "measurementDuration": 5.0
    },
    "alerts": [
      "⚠️ CPU Usage HIGH: 87%",
      "⚠️ Memory Usage HIGH: 145 MB"
    ],
    "environment": {
      "nodeVersion": "v20.x.x",
      "platform": "linux",
      "arch": "x64"
    }
  },
  "suspicious": {
    "highCPU": true,
    "highMemory": true,
    "memoryLeak": false
  },
  "recommendations": [
    "CPU Usage alto detectado. Verifique loops infinitos ou processamentos pesados.",
    "Memory Usage alto detectado. Possível vazamento de memória."
  ]
}
```

## 🔍 Análise do Logs do Console

### Como os logs aparecem no terminal:

```
📊 [TRAFFIC] {
  timestamp: '2026-02-13T23:42:00.000Z',
  method: 'GET',
  path: '/api/plans',
  ip: '192.168.1.100',
  ua: 'Mozilla/5.0...',
  totalRequests: 1247
}

⚠️ [RATE LIMIT DETECTED] {
  ip: '192.168.1.100',
  requestsIn5Min: 345,
  timestamp: '2026-02-13T23:42:00.000Z'
}

⚠️ [SCRAPE DETECTED] {
  userAgent: 'Mozilla/5.0...',
  requestsIn5Min: 234,
  timestamp: '2026-02-13T23:42:00.000Z'
}
```

## 📋 Passo a Passo para Diagnosticar

### Passo 1: Identificar os Top IPs
```bash
curl "https://seu-dominio.com/api/debug/traffic?minutes=5&format=summary"
```

Procure por:
- IPs com mais de 100 requisições em 5 minutos
- IPs desconhecidos ou de regiões suspeitas
- Múltiplas requisições do mesmo IP

### Passo 2: Analisar as Rotas Mais Acessadas
```bash
curl "https://seu-dominio.com/api/debug/traffic?minutes=5&format=summary"
```

Verifique:
- Qual rota está sendo mais acessada
- Se é uma rota pública ou privada
- Padrões de acesso (sequenciais, aleatórios)

### Passo 3: Exportar para Análise Detalhada
```bash
curl "https://seu-dominio.com/api/debug/traffic?minutes=30&format=csv" > traffic.csv
```

Abra o CSV no Excel/Google Sheets para:
- Filtrar por IP específico
- Verificar timestamps exatos
- Identificar padrões de acesso

### Passo 4: Verificar Uso de Recursos
```bash
curl "https://seu-dominio.com/api/debug/resources"
```

Verifique:
- Se CPU Usage está acima de 80%
- Se há vazamento de memória
- Uptime do processo (se reiniciou recentemente)

### Passo 5: Correlacionar Dados
Compare os dados de tráfego com uso de CPU:
- Pico de CPU coincide com aumento de requisições?
- Alguns IPs específicos causam mais CPU?
- Alguma rota específica é mais pesada?

## 🚨 Ações Recomendadas

### Se detectar Rate Limiting:
```typescript
// Adicione ao middleware.ts
if (ipCount > 100) {
  return NextResponse.json(
    { error: 'Too many requests' },
    { status: 429 }
  )
}
```

### Se detectar Scraping:
- Bloqueie IPs suspeitos no firewall
- Adicione CAPTCHA em rotas públicas
- Implemente rate limiting por IP

### Se detectar Vazamento de Memória:
- Reinicie o contêiner
- Identifique variáveis globais não limpas
- Use `heapdump` para análise

### Se detectar CPU alta sem motivo:
- Verifique por loops infinitos
- Revise dependências comprometidas
- Execute `pnpm audit` para vulnerabilidades

## 📊 Exemplo de Diagnóstico Completo

```bash
# 1. Coletar dados de 30 minutos
curl "https://seu-dominio.com/api/debug/traffic?minutes=30&format=csv" > analysis.csv

# 2. Verificar recursos atuais
curl "https://seu-dominio.com/api/debug/resources"

# 3. Analisar logs do Dokploy
# No painel do Dokploy, verifique os logs em tempo real

# 4. Identificar padrões
# No arquivo CSV:
# - Filtre por IP > 100 requisições
# - Verifique intervalos entre requisições
# - Identifique user-agents suspeitos
```

## 🔐 Considerações de Segurança

⚠️ **IMPORTANTE**: Após diagnosticar, remova ou proteja estes endpoints:

```typescript
// middleware.ts - adicionar proteção
const DEBUG_ALLOWED_IPS = ['seu-ip']

if (pathname.startsWith('/api/debug')) {
  const ip = getClientIP(request)
  if (!DEBUG_ALLOWED_IPS.includes(ip)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
```

## 📈 Próximos Passos

1. **Implemente o sistema de monitoramento**
   - Faça deploy das mudanças
   - Acesse os endpoints de debug
   - Colete dados por 15-30 minutos

2. **Analise os resultados**
   - Identifique IPs suspeitos
   - Encontre rotas sobrecarregadas
   - Correlacione com uso de CPU

3. **Tome ação corretiva**
   - Bloqueie IPs maliciosos
   - Implemente rate limiting
   - Otimize código pesado
   - Atualize dependências vulneráveis

4. **Proteja os endpoints de debug**
   - Remova ou proteja após diagnóstico
   - Use apenas em emergências

## 💡 Dicas Adicionais

- **Monitore em tempo real**: Use `tail -f` nos logs do Dokploy
- **Compare com antes/after**: Coletar dados antes e depois de implementar correções
- **Documente tudo**: Anote timestamps, IPs e ações tomadas
- **Use ferramentas externas**: Datadog, New Relic, Prometheus para monitoramento profissional

---

## 🆘 Precisa de ajuda?

Se após seguir estes passos ainda não conseguir identificar o problema:

1. Exporte o CSV completo (última hora)
2. Capture screenshots dos gráficos de CPU do Dokploy
3. Copie os logs do terminal durante o pico de CPU
4. Compartilhe para análise adicional