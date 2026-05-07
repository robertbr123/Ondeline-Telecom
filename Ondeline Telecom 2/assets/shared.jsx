/* Ondeline shared components: Topbar, Nav, Footer, Icon */

function Icon({ name, size = 24 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    fiber: <><path d="M3 12c3 0 3-5 9-5s6 10 9 5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></>,
    support: <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4zM3 19a2 2 0 0 0 2 2h1v-6H3v4z"/></>,
    wifi: <><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
    bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    check: <path d="m5 12 5 5L20 7"/>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    wa: <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.2c-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>,
    ig: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>,
    fb: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></>,
    stream: <><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M8 2v4M16 2v4M2 12h20"/></>,
    game: <><rect x="2" y="7" width="20" height="10" rx="3"/><path d="M7 12h2M8 11v2M15 12h.01M17 13h.01M13 11h.01"/></>,
    home: <><path d="M3 10 12 3l9 7v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M10 22v-4h4v4"/></>,
    server: <><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01M6 17.5h.01"/></>,
    chart: <><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></>,
    cloud: <path d="M17.5 19a4.5 4.5 0 1 0-.5-8.95A6 6 0 0 0 6.5 12H6a4 4 0 0 0 0 8h11.5z"/>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    video: <><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-4v12l-6-4"/></>,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM4 19.5V22h16"/>,
  };
  return <svg {...common}>{paths[name] || <circle cx="12" cy="12" r="6"/>}</svg>;
}

function Topbar() {
  return (
    <div className="topbar">
      <div className="shell row">
        <div className="left">
          <span><span className="dot"></span>Rede online · 99,98% uptime</span>
          <span style={{opacity:0.6}}>|</span>
          <span>Vale do Juruá · AM</span>
        </div>
        <div className="left">
          <span>Central: <a href="tel:+5592984607721">(92) 98460-7721</a></span>
          <span style={{opacity:0.4}}>|</span>
          <a href="#">2ª via</a>
          <a href="#">Área do cliente</a>
        </div>
      </div>
    </div>
  );
}

function Nav({ home = "index.html", active, assetBase = "assets/", empresarialHref = "empresarial.html" }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const close = () => setOpen(false);
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <a href={home} className="nav-logo">
          <img src={assetBase + "logo-ondeline.png"} alt="Ondeline"/>
        </a>
        <div className="nav-links">
          <a href={home + "#planos"} style={active === "Planos" ? { color: "var(--teal)" } : undefined}>Planos</a>
          <a href={empresarialHref} style={active === "empresarial" ? { color: "var(--teal)" } : undefined}>Empresarial</a>
          <a href={home + "#cobertura"}>Cobertura</a>
          <a href={home + "#porque"}>Por que Ondeline</a>
          <a href={home + "#contato"}>Contato</a>
        </div>
        <a className="nav-cta" href={home + "#contato"}>
          Assine agora <Icon name="arrow" size={18}/>
        </a>
        <button
          className={"nav-burger " + (open ? "open" : "")}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          type="button"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={"mobile-menu " + (open ? "open" : "")} onClick={close}>
        <div className="mobile-menu-inner" onClick={e => e.stopPropagation()}>
          <a href={home + "#planos"} onClick={close}>Planos residenciais</a>
          <a href={empresarialHref} onClick={close}>Empresarial</a>
          <a href={home + "#cobertura"} onClick={close}>Cobertura</a>
          <a href={home + "#porque"} onClick={close}>Por que Ondeline</a>
          <a href={home + "#contato"} onClick={close}>Contato</a>
          <div className="mm-cities">
            <div className="mm-lbl">Cidades</div>
            <a href="cidades/ipixuna.html" onClick={close}>Ipixuna</a>
            <a href="cidades/eirunepe.html" onClick={close}>Eirunepé</a>
            <a href="cidades/itamarati.html" onClick={close}>Itamarati</a>
            <a href="cidades/carauari.html" onClick={close}>Carauari</a>
            <a href="cidades/jurua.html" onClick={close}>Juruá</a>
          </div>
          <a className="nav-cta mm-cta" href={home + "#contato"} onClick={close}>
            Assine agora <Icon name="arrow" size={18}/>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer({ home = "index.html" }) {
  return (
    <footer>
      <div className="shell">
        <div className="foot-top">
          <div className="foot-brand">
            <img src="assets/logo-ondeline.png" alt="Ondeline"/>
            <p>Provedor de internet por fibra óptica do Vale do Juruá. Conexão sem limites para cada canto do Amazonas.</p>
          </div>
          <div>
            <h5>Planos</h5>
            <ul>
              <li><a href={home + "#planos"}>Residencial</a></li>
              <li><a href="empresarial.html">Empresarial</a></li>
              <li><a href="empresarial.html">Link dedicado</a></li>
              <li><a href="empresarial.html">IP fixo</a></li>
            </ul>
          </div>
          <div>
            <h5>Cidades</h5>
            <ul>
              <li><a href="cidades/ipixuna.html">Ipixuna</a></li>
              <li><a href="cidades/eirunepe.html">Eirunepé</a></li>
              <li><a href="cidades/itamarati.html">Itamarati</a></li>
              <li><a href="cidades/carauari.html">Carauari</a></li>
              <li><a href="cidades/jurua.html">Juruá</a></li>
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
            <a href="https://wa.me/5592984607721" target="_blank" rel="noopener" aria-label="WhatsApp"><Icon name="wa" size={18}/></a>
            <a href="#" aria-label="Instagram"><Icon name="ig" size={18}/></a>
            <a href="#" aria-label="Facebook"><Icon name="fb" size={18}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FadeInSetup() {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".sec, .cta, footer, .hero, .fade-target").forEach(s => {
      s.classList.add("fade-in");
      io.observe(s);
    });
    return () => io.disconnect();
  }, []);
  return null;
}

Object.assign(window, { Icon, Topbar, Nav, Footer, FadeInSetup });
