import { query } from "@/lib/db"

/**
 * Arquivos enviados pelo admin (logo etc.) guardados no Postgres.
 * O container é recriado a cada deploy e a pasta public/uploads some junto,
 * então o banco é a cópia que vale; o disco vira só cache.
 */
let ready: Promise<void> | null = null
function ensureTable() {
  if (!ready) {
    ready = query(
      `CREATE TABLE IF NOT EXISTS site_files (
        name TEXT PRIMARY KEY,
        mime TEXT NOT NULL,
        data BYTEA NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`
    ).then(() => undefined).catch((e) => { ready = null; throw e })
  }
  return ready
}

export async function saveSiteFile(name: string, mime: string, data: Buffer) {
  await ensureTable()
  await query(
    `INSERT INTO site_files (name, mime, data, updated_at) VALUES ($1, $2, $3, NOW())
     ON CONFLICT (name) DO UPDATE SET mime = EXCLUDED.mime, data = EXCLUDED.data, updated_at = NOW()`,
    [name, mime, data]
  )
}

export async function getSiteFile(name: string): Promise<{ mime: string; data: Buffer } | null> {
  try {
    await ensureTable()
    const r = await query("SELECT mime, data FROM site_files WHERE name = $1", [name])
    if (!r.rows.length) return null
    return { mime: r.rows[0].mime, data: r.rows[0].data as Buffer }
  } catch {
    return null
  }
}

/**
 * Logo configurado no admin, ou o logo padrão se o arquivo enviado
 * não existe mais (ex.: enviado antes de os uploads irem para o banco).
 */
export async function resolveLogoUrl(url: string | undefined, fallback = "/logo-ondeline.png"): Promise<string> {
  if (!url) return fallback
  const m = url.match(/^\/api\/uploads\/([^?#]+)/)
  if (!m) return url
  const name = decodeURIComponent(m[1])
  if (name.includes("..")) return fallback
  try {
    const { existsSync } = await import("fs")
    const path = await import("path")
    if (existsSync(path.join(process.cwd(), "public", "uploads", name))) return url
  } catch { /* ignore */ }
  return (await getSiteFile(name)) ? url : fallback
}
