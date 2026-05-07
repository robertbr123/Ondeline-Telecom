/* ========= ONDELINE — claro / moderno ========= */

function Icon({ name }) {
  const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    fiber: <><path d="M3 12c3 0 3-5 9-5s6 10 9 5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></>,
    support: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4zM3 19a2 2 0 0 0 2 2h1v-6H3v4z" /></>,
    wifi: <><path d="M5 12.55a11 11 0 0 1 14 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
    bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    check: <path d="m5 12 5 5L20 7" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    wa: <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.2c-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />,
    ig: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></>,
    fb: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
    stream: <><rect x="2" y="6" width="20" height="13" rx="2" /><path d="M8 2v4M16 2v4M2 12h20" /></>,
    game: <><rect x="2" y="7" width="20" height="10" rx="3" /><path d="M7 12h2M8 11v2M15 12h.01M17 13h.01M13 11h.01" /></>,
    home: <><path d="M3 10 12 3l9 7v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" /></>
  };
  return <svg {...common}>{paths[name] || <circle cx="12" cy="12" r="6" />}</svg>;
}

function Topbar() {
  return (
    <div className="topbar">
      <div className="shell row">
        <div className="left">
          <span><span className="dot"></span>Rede online · 99,98% uptime</span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span>Vale do Juruá · AM</span>
        </div>
        <div className="left">
          <span>Central: <a href="tel:+5592984607721">(92) 98460-7721</a></span>
          <span style={{ opacity: 0.4 }}>|</span>
          <a href="#">2ª via</a>
          <a href="#">Área do cliente</a>
        </div>
      </div>
    </div>);

}

function Nav() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {document.body.style.overflow = "";};
  }, [open]);
  const close = () => setOpen(false);
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <a href="#top" className="nav-logo">
          <img src="assets/logo-ondeline.png" alt="Ondeline" />
        </a>
        <div className="nav-links">
          <a href="#planos">Planos</a>
          <a href="#cobertura">Cobertura</a>
          <a href="#porque">Por que Ondeline</a>
          <a href="empresarial.html">Empresarial</a>
          <a href="#contato">Contato</a>
        </div>
        <a className="nav-cta" href="#contato">
          Assine agora <Icon name="arrow" />
        </a>
        <button
          className={"nav-burger " + (open ? "open" : "")}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          type="button">
          
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={"mobile-menu " + (open ? "open" : "")} onClick={close}>
        <div className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
          <a href="#planos" onClick={close}>Planos residenciais</a>
          <a href="empresarial.html" onClick={close}>Empresarial</a>
          <a href="#cobertura" onClick={close}>Cobertura</a>
          <a href="#porque" onClick={close}>Por que Ondeline</a>
          <a href="#contato" onClick={close}>Contato</a>
          <div className="mm-cities">
            <div className="mm-lbl">Cidades</div>
            <a href="cidades/ipixuna.html" onClick={close}>Ipixuna</a>
            <a href="cidades/eirunepe.html" onClick={close}>Eirunepé</a>
            <a href="cidades/itamarati.html" onClick={close}>Itamarati</a>
            <a href="cidades/carauari.html" onClick={close}>Carauari</a>
            <a href="cidades/jurua.html" onClick={close}>Juruá</a>
          </div>
          <a className="nav-cta mm-cta" href="#contato" onClick={close}>
            Assine agora <Icon name="arrow" />
          </a>
        </div>
      </div>
    </nav>);

}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-inner">
        <div>
          <div className="hero-pill">
            <span className="tag">NOVO</span>
            Planos Giga disponíveis em Eirunepé
          </div>
          <h1>
            A internet mais rápida do <span className="highlight">Vale do Juruá</span>.
          </h1>
          <p className="hero-sub">
            Fibra óptica 100% dedicada, Wi-Fi 6 incluso e suporte local que fala sua língua. Conectamos mais de 1.000 famílias em Ipixuna, Eirunepé e Itamarati — e vamos mais longe.
          </p>
          <div className="hero-actions">
            <a href="#planos" className="btn btn-primary">
              Ver planos <Icon name="arrow" />
            </a>
            <a href="#cobertura" className="btn btn-ghost">
              Tem na minha rua?
            </a>
          </div>
          <div className="hero-stats">
            <div className="cell">
              <div className="v">+1.000</div>
              <div className="k">Assinantes</div>
            </div>
            <div className="cell">
              <div className="v">99,98%</div>
              <div className="k">Uptime da rede</div>
            </div>
            <div className="cell">
              <div className="v">24h</div>
              <div className="k">Suporte local</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hv-bg-blob"></div>
          <div className="hv-bg-dot"></div>

          <div className="hv-card">
            <div className="hv-card-top">
              <div className="hv-plan-tag">
                <span className="dot"></span> PLANO CORRENTEZA · MAIS POPULAR
              </div>
              <div className="hv-speed">
                <div className="n">100<span className="u">MEGA</span></div>
                <div className="label">Download e upload simétricos · 1.000 Mbps</div>
              </div>
              <div className="hv-price">
                <span className="curr">R$</span>
                <span className="big">149</span>
                <span className="small">,90<small>/mês</small></span>
              </div>
              <a href="#planos" className="hv-cta">
                Quero este plano <Icon name="arrow" size={16} />
              </a>
            </div>

            <div className="hv-card-bot">
              <div className="hv-feat">
                <div className="ico"><Icon name="bolt" size={18} /></div>
                <div className="txt">
                  <div className="k">Latência</div>
                  <div className="v">14 ms</div>
                </div>
              </div>
              <div className="hv-feat">
                <div className="ico" style={{ background: "#fff0ec", color: "#ff6b4a" }}><Icon name="wifi" size={18} /></div>
                <div className="txt">
                  <div className="k">Wi-Fi 6</div>
                  <div className="v">Incluso</div>
                </div>
              </div>
              <div className="hv-feat">
                <div className="ico" style={{ background: "#fff8e0", color: "#d4a500" }}><Icon name="heart" size={18} /></div>
                <div className="txt">
                  <div className="k">Avaliação</div>
                  <div className="v">4,9 <span className="stars">★★★★★</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function Planos() {
  const plans = [
  {
    name: "ESSENCIAL",
    speed: "30",
    unit: "MEGA",
    note: "Para navegar, assistir e estudar",
    price: "99",
    cents: "90",
    alt: "R$ 3,33/dia",
    features: ["Fibra óptica dedicada", "Wi-Fi 5 incluso", "Upload de 150 Mbps", "Suporte 7 dias/semana"]
  },
  {
    name: "FLUXO",
    speed: "50",
    unit: "MEGA",
    note: "O plano mais escolhido",
    price: "139",
    cents: "90",
    alt: "R$ 4,66/dia",
    features: ["Fibra óptica dedicada", "Roteador Wi-Fi 6 incluso", "Upload simétrico 600 Mbps", "Suporte 24h local", "Instalação grátis"],
    featured: true
  },
  {
    name: "CORRENTEZA",
    speed: "100",
    unit: "MEGA",
    note: "Para quem não abre mão de nada",
    price: "149",
    cents: "90",
    alt: "R$ 6,66/dia",
    features: ["Fibra óptica dedicada", "Roteador Wi-Fi 6 Mesh", "Upload simétrico 1 Gbps", "Suporte prioritário 24h", "IP fixo opcional"]
  }];

  return (
    <section className="sec" id="planos">
      <div className="shell">
        <div className="sec-head center">
          <span className="sec-lbl">Planos residenciais</span>
          <h2>Escolha a velocidade <span>certa pra você</span>.</h2>
          <p>Sem letras miúdas, sem taxa escondida, sem fidelidade abusiva. Instalação grátis e Wi-Fi incluso nos planos Fluxo e Correnteza.</p>
        </div>

        <div className="planos-grid">
          {plans.map((p, i) =>
          <div className={"plan " + (p.featured ? "featured" : "")} key={i}>
              {p.featured && <div className="plan-badge">Mais escolhido</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-speed">
                <span className="n">{p.speed}</span>
                <span className="u">{p.unit}</span>
              </div>
              <div className="plan-note">{p.note}</div>
              <div className="plan-price">R$ {p.price}<small>,{p.cents}/mês</small></div>
              <div className="plan-price-alt">ou {p.alt}</div>
              <ul>
                {p.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <a href="#contato" className={"btn " + (p.featured ? "btn-primary" : "btn-ghost")}>
                Quero este plano <Icon name="arrow" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Cobertura() {
  const cities = [
  { name: "Ipixuna", state: "AM", status: "active", info: "Rede ativa · ≈ 26k hab.", letter: "I", slug: "ipixuna" },
  { name: "Eirunepé", state: "AM · Hub", status: "active", info: "Hub regional · ≈ 34k hab.", letter: "E", slug: "eirunepe" },
  { name: "Itamarati", state: "AM", status: "active", info: "Rede ativa · ≈ 9k hab.", letter: "I", slug: "itamarati" },
  { name: "Carauari", state: "AM", status: "soon", info: "Em breve · Q3 2026", letter: "C", slug: "carauari" },
  { name: "Juruá", state: "AM", status: "soon", info: "Em breve · Q4 2026", letter: "J", slug: "jurua" }];


  return (
    <section className="sec alt" id="cobertura">
      <div className="shell">
        <div className="cov-wrap">
          <div>
            <span className="sec-lbl">Cobertura Ondeline</span>
            <h2 style={{ fontSize: "clamp(32px,4.2vw,52px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: 18 }}>
              Conectamos o <span style={{ color: "var(--teal)" }}>Vale do Juruá</span> inteiro.
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 36, maxWidth: "52ch" }}>
              Três cidades já navegando em fibra e mais duas chegando em 2026. Confira se sua cidade está na rede Ondeline.
            </p>

            <div className="cities-list">
              {cities.map((c, i) =>
              <a className="city-item" key={i} href={`cidades/${c.slug}.html`}>
                  <div className={"badge " + c.status}>{c.letter}</div>
                  <div className="info">
                    <h5>{c.name}</h5>
                    <p>{c.info}</p>
                  </div>
                  <div className={"status " + c.status}>
                    {c.status === "active" ? "Ativa" : "Em breve"}
                  </div>
                  <Icon name="arrow" size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="map-wrap">
            <svg className="map-svg" viewBox="0 0 400 500">
              <defs>
                <linearGradient id="riv" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#14d4cf" />
                  <stop offset="100%" stopColor="#0a8a86" />
                </linearGradient>
                <radialGradient id="gA"><stop offset="0%" stopColor="#0fb8b3" stopOpacity="0.35" /><stop offset="100%" stopColor="#0fb8b3" stopOpacity="0" /></radialGradient>
                <radialGradient id="gS"><stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.25" /><stop offset="100%" stopColor="#ff6b4a" stopOpacity="0" /></radialGradient>
              </defs>

              {/* grid */}
              {Array.from({ length: 10 }).map((_, i) =>
              <line key={"h" + i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(10,37,64,0.05)" />
              )}
              {Array.from({ length: 8 }).map((_, i) =>
              <line key={"v" + i} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="rgba(10,37,64,0.05)" />
              )}

              {/* river */}
              <path d="M 30 60 C 100 120, 120 200, 180 260 S 280 340, 350 460"
              fill="none" stroke="url(#riv)" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <path d="M 30 60 C 100 120, 120 200, 180 260 S 280 340, 350 460"
              fill="none" stroke="#14d4cf" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" opacity="0.8">
                <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="4s" repeatCount="indefinite" />
              </path>

              {/* cities */}
              {[
              { x: 70, y: 100, name: "Ipixuna", s: "active", slug: "ipixuna" },
              { x: 140, y: 230, name: "Eirunepé", s: "active", hub: true, slug: "eirunepe" },
              { x: 220, y: 280, name: "Itamarati", s: "active", slug: "itamarati" },
              { x: 290, y: 360, name: "Carauari", s: "soon", slug: "carauari" },
              { x: 340, y: 430, name: "Juruá", s: "soon", slug: "jurua" }].
              map((c, i) =>
              <a key={i} href={`cidades/${c.slug}.html`} style={{ cursor: "pointer" }}>
                <g>
                  <circle cx={c.x} cy={c.y} r="45" fill={c.s === "active" ? "url(#gA)" : "url(#gS)"} />
                  {c.s === "active" &&
                  <circle cx={c.x} cy={c.y} r="12" fill="none" stroke="#0fb8b3" strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="r" from="10" to="28" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  }
                  <circle cx={c.x} cy={c.y} r={c.hub ? 9 : 6} fill={c.s === "active" ? "#0fb8b3" : "#ff6b4a"}
                  stroke="#fff" strokeWidth="2.5" />
                  <text x={c.x + 16} y={c.y + 4} fontSize="14" fontWeight="700" fill="#0a2540">{c.name}</text>
                </g>
              </a>
              )}

              <text x="20" y="480" fontSize="10" fontWeight="600" fill="#7a8ba0" letterSpacing="1">VALE DO JURUÁ · AM</text>
              <g transform="translate(360, 30)">
                <circle r="18" fill="#fff" stroke="#cfd8e0" />
                <text y="4" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0fb8b3">N</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>);

}

function Porque() {
  const items = [
  { icon: "fiber", title: "Fibra óptica até sua casa", text: "Tecnologia GPON, cabo óptico direto do poste ao seu roteador. Sem rádio, sem compartilhamento." },
  { icon: "support", title: "Suporte local 24h", text: "Atendimento humano em português claro, com técnicos que moram nas mesmas cidades que você." },
  { icon: "wifi", title: "Wi-Fi 6 incluso", text: "Roteador moderno e potente sem custo adicional nos planos Fluxo e Correnteza." },
  { icon: "shield", title: "Estabilidade garantida", text: "Backbone redundante via Tefé e Manaus. Se um caminho cai, o outro assume na hora." },
  { icon: "bolt", title: "Baixa latência pra jogos", text: "14 ms de ping ao CDN mais próximo. Jogue online sem lag, mesmo morando no interior." },
  { icon: "heart", title: "Sem pegadinha na fatura", text: "O que está no plano é o que vem na conta. Sem reajuste surpresa, sem taxa escondida." }];

  return (
    <section className="sec" id="porque">
      <div className="shell">
        <div className="sec-head center">
          <span className="sec-lbl">Por que Ondeline</span>
          <h2>Internet de capital, <span>atendimento do Juruá</span>.</h2>
          <p>Somos de Eirunepé. Nossa equipe conhece cada rua, cada ponte e cada cliente pelo nome. Isso muda tudo.</p>
        </div>
        <div className="why-grid">
          {items.map((it, i) =>
          <div className="why-card" key={i}>
              <div className="why-icon"><Icon name={it.icon} /></div>
              <h4>{it.title}</h4>
              <p>{it.text}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function SpeedBanner() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);
  const target = 987;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 2200;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const filled = Math.round(value / 1000 * 20);

  return (
    <section className="sec" ref={ref}>
      <div className="shell">
        <div className="speed-banner">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="sec-lbl" style={{ background: "rgba(20,212,207,0.15)", color: "#14d4cf" }}>Performance ao vivo</span>
            <h2 style={{ marginTop: 16 }}>Quase <span>1 Gbps</span> no meio<br />da floresta.</h2>
            <p>Medição real da nossa estação em Eirunepé, testada agora contra CDN internacional. Fibra sem compressão, sem tráfego priorizado.</p>
            <div className="speed-meta">
              <div className="cell">
                <div className="v">14ms</div>
                <div className="k">Latência</div>
              </div>
              <div className="cell">
                <div className="v">&lt; 2ms</div>
                <div className="k">Jitter</div>
              </div>
              <div className="cell">
                <div className="v">0,01%</div>
                <div className="k">Perda</div>
              </div>
            </div>
          </div>
          <div className="speed-gauge">
            <div className="speed-num">{value}</div>
            <div className="speed-sub">MBPS · DOWNLOAD</div>
            <div className="speed-dots">
              {Array.from({ length: 20 }).map((_, i) =>
              <span key={i} className={"dot " + (i < filled ? "on" : "")}></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function Testimonials() {
  const items = [
  { q: "Antes da Ondeline, atender por vídeo era impossível. Hoje faço 40 consultas online por mês. Mudou minha clínica inteira.", n: "Dra. Rosa Menezes", w: "Clínica São Rafael · Eirunepé", l: "R" },
  { q: "Sou professor e dou aula online pra várias cidades. Nunca mais caiu. É como se eu morasse em capital.", n: "Jonas da Silva", w: "Escola Estadual · Ipixuna", l: "J" },
  { q: "Tenho mercadinho e uso maquininha o dia todo. Com a Ondeline nunca mais perdi venda por queda de internet.", n: "Maria do Carmo", w: "Mercadinho do Juruá · Itamarati", l: "M" }];

  return (
    <section className="sec alt">
      <div className="shell">
        <div className="sec-head center">
          <span className="sec-lbl">Vozes do Juruá</span>
          <h2>Mais de 1K famílias <span>já são Ondeline</span>.</h2>
          <p>Sem atores, sem texto de agência. São clientes reais, das cidades que a gente atende todo dia.</p>
        </div>
        <div className="testi-grid">
          {items.map((t, i) =>
          <div className="testi" key={i}>
              <div className="stars">★★★★★</div>
              <q>{t.q}</q>
              <div className="who">
                <div className="avatar">{t.l}</div>
                <div>
                  <div className="who-name">{t.n}</div>
                  <div className="who-city">{t.w}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function CTA() {
  const [sent, setSent] = React.useState(false);
  const [city, setCity] = React.useState("Eirunepé");
  return (
    <section className="cta" id="contato">
      <div className="shell">
        <div className="cta-card">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="sec-lbl" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>Vamos te conectar</span>
            <h2 style={{ marginTop: 16 }}>Pronto pra entrar na onda certa?</h2>
            <p>Deixa seu WhatsApp e a cidade onde mora. A gente retorna em menos de 1h em horário comercial, com todas as opções pro seu endereço.</p>
            <div style={{ display: "flex", gap: 28, marginTop: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name="wa" />
                <div>
                  <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 600 }}>WHATSAPP</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>(92) 98460-7721</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name="pin" />
                <div>
                  <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 600 }}>LOJA FÍSICA</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>Eirunepé · AM</div>
                </div>
              </div>
            </div>
          </div>

          <form className="cta-form" onSubmit={(e) => {e.preventDefault();setSent(true);}}>
            {!sent ?
            <>
                <h3>Solicite sua instalação</h3>
                <label>Nome completo</label>
                <input required placeholder="Como podemos te chamar?" />
                <label>WhatsApp</label>
                <input required placeholder="(92) 98460-7721" />
                <label>Cidade</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option>Ipixuna</option>
                  <option>Eirunepé</option>
                  <option>Itamarati</option>
                  <option>Carauari (lista de espera)</option>
                  <option>Juruá (lista de espera)</option>
                </select>
                <label>Plano de interesse</label>
                <select>
                  <option>Essencial · 300 Mega</option>
                  <option>Fluxo · 600 Mega</option>
                  <option>Correnteza · 1 Giga</option>
                  <option>Empresarial · consultar</option>
                </select>
                <button className="btn btn-primary" type="submit">
                  Quero assinar <Icon name="arrow" />
                </button>
              </> :

            <div className="cta-thanks">
                <div className="check">✓</div>
                <h4>Pedido recebido!</h4>
                <p>Nossa equipe entra em contato em até 1 hora útil. Obrigado por escolher a Ondeline.</p>
              </div>
            }
          </form>
        </div>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer>
      <div className="shell">
        <div className="foot-top">
          <div className="foot-brand">
            <img src="assets/logo-ondeline.png" alt="Ondeline" />
            <p>Provedor de internet por fibra óptica do Vale do Juruá. Conexão sem limites para cada canto do Amazonas.</p>
          </div>
          <div>
            <h5>Planos</h5>
            <ul>
              <li><a href="#planos">Residencial</a></li>
              <li><a href="#">Empresarial</a></li>
              <li><a href="#">Link dedicado</a></li>
              <li><a href="#">IP fixo</a></li>
            </ul>
          </div>
          <div>
            <h5>Suporte</h5>
            <ul>
              <li><a href="#">Central do cliente</a></li>
              <li><a href="#">2ª via de boleto</a></li>
              <li><a href="#">Status da rede</a></li>
              <li><a href="#">Teste de velocidade</a></li>
            </ul>
          </div>
          <div>
            <h5>Contato</h5>
            <ul>
              <li><a href="https://wa.me/5592984607721" target="_blank" rel="noopener">WhatsApp (92) 98460-7721</a></li>
              <li><a href="#">contato@ondeline.net</a></li>
              <li><a href="tel:+5592984607721">(92) 98460-7721</a></li>
              <li><a href="#">Seja revenda</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <div>© 2023–2026 Ondeline Telecom · CNPJ 00.000.000/0001-00</div>
          <div className="socials">
            <a href="https://wa.me/5592984607721" target="_blank" rel="noopener" aria-label="WhatsApp"><Icon name="wa" /></a>
            <a href="#" aria-label="Instagram"><Icon name="ig" /></a>
            <a href="#" aria-label="Facebook"><Icon name="fb" /></a>
          </div>
        </div>
      </div>
    </footer>);

}

function App() {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add("in");});
    }, { threshold: 0.1 });
    document.querySelectorAll(".sec, .cta, footer, .hero").forEach((s) => {
      s.classList.add("fade-in");
      io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Topbar />
      <Nav />
      <Hero />
      <Planos />
      <Cobertura />
      <Porque />
      <SpeedBanner />
      <Testimonials />
      <CTA />
      <Footer />
    </>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);