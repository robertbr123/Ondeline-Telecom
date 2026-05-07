/* Ondeline — Página de cidade (template reutilizável) */

function CityHero({ city }) {
  const activeTag = city.status === "active";
  return (
    <section className="page-hero">
      <div className="shell">
        <div className="crumbs">
          <a href="../index.html">Início</a>
          <span className="sep">/</span>
          <a href="../index.html#cobertura">Cobertura</a>
          <span className="sep">/</span>
          <span>{city.name}</span>
        </div>
        <div className="city-hero-grid">
          <div>
            <span className="sec-lbl">{activeTag ? "Rede ativa" : "Em implantação"}</span>
            <h1 style={{marginTop:16}}>Ondeline em <span>{city.name}</span></h1>
            <p className="lead">{city.intro}</p>
            <div className="pill-row">
              {city.highlights.map((h, i) => (
                <span className="pill" key={i}><Icon name="check" size={16}/> {h}</span>
              ))}
            </div>
            <div className="hero-actions" style={{marginTop:32}}>
              {activeTag ? (
                <>
                  <a href="#planos-cidade" className="btn btn-primary">Ver planos em {city.name} <Icon name="arrow" size={18}/></a>
                  <a href="#contato-cidade" className="btn btn-ghost">Quero instalar</a>
                </>
              ) : (
                <a href="#waitlist" className="btn btn-accent">Entrar na lista de espera <Icon name="arrow" size={18}/></a>
              )}
            </div>
          </div>

          <div className="city-photo" data-label={`FOTO DA CIDADE · ${city.name.toUpperCase()}\n\n[substituir por imagem real]`}>
            <div className="tag-floating">
              <span className="ld" style={{background: activeTag ? "#4ade80" : "var(--accent)"}}></span>
              {activeTag ? "Rede operando" : "Em obras"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CityStats({ city }) {
  return (
    <section style={{padding:"40px 0"}}>
      <div className="shell">
        <div className="city-stats">
          {city.stats.map((s, i) => (
            <div className="cell" key={i}>
              <div className="v">{s.v}</div>
              <div className="k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CityBairros({ city }) {
  if (!city.bairros) return null;
  return (
    <section className="sec alt">
      <div className="shell">
        <div className="sec-head">
          <span className="sec-lbl">Cobertura detalhada</span>
          <h2>Bairros atendidos em <span>{city.name}</span></h2>
          <p>Sua rua está na nossa rede? Confira abaixo — e se não estiver, deixe seu contato que avisamos assim que a fibra chegar.</p>
        </div>
        <div className="bairros">
          {city.bairros.map((b, i) => (
            <div className={"bairro " + (b.soon ? "soon" : "")} key={i}>
              <span className="dotg"></span>
              {b.name}
              {b.soon && <span style={{marginLeft:"auto", fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--accent)"}}>Em breve</span>}
            </div>
          ))}
        </div>
        <p style={{marginTop:24, fontSize:13, color:"var(--ink-mute)", fontWeight:500}}>
          Não encontrou seu bairro? Mande seu endereço pelo WhatsApp <a href="https://wa.me/5592984607721" target="_blank" rel="noopener" style={{color:"var(--teal)", fontWeight:700}}>(92) 98460-7721</a> que confirmamos em minutos.
        </p>
      </div>
    </section>
  );
}

function CityPlanos({ city }) {
  if (city.status !== "active") return null;
  return (
    <section className="sec" id="planos-cidade">
      <div className="shell">
        <div className="sec-head center">
          <span className="sec-lbl">Planos em {city.name}</span>
          <h2>Fibra óptica disponível <span>agora</span> na sua casa.</h2>
          <p>Todos os planos disponíveis em {city.name} com instalação grátis em contratos anuais.</p>
        </div>
        <div className="planos-grid">
          {[
            { name:"ESSENCIAL", speed:"300", unit:"MEGA", note:"Para navegar e assistir", price:"99", cents:"90", features:["Fibra dedicada","Wi-Fi 5 incluso","Upload 150 Mbps","Suporte 7 dias"] },
            { name:"FLUXO", speed:"600", unit:"MEGA", note:"O mais escolhido", price:"139", cents:"90", features:["Fibra dedicada","Wi-Fi 6 incluso","Upload simétrico 600","Suporte 24h","Instalação grátis"], featured:true },
            { name:"CORRENTEZA", speed:"1", unit:"GIGA", note:"Sem abrir mão de nada", price:"199", cents:"90", features:["Fibra dedicada","Wi-Fi 6 Mesh","Upload simétrico 1G","Suporte prioritário","IP fixo opcional"] },
          ].map((p, i) => (
            <div className={"plan " + (p.featured ? "featured" : "")} key={i}>
              {p.featured && <div className="plan-badge">Mais escolhido</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-speed"><span className="n">{p.speed}</span><span className="u">{p.unit}</span></div>
              <div className="plan-note">{p.note}</div>
              <div className="plan-price">R$ {p.price}<small>,{p.cents}/mês</small></div>
              <div className="plan-price-alt">Instalação grátis em {city.name}</div>
              <ul>{p.features.map((f,j) => <li key={j}>{f}</li>)}</ul>
              <a href="#contato-cidade" className={"btn " + (p.featured ? "btn-primary" : "btn-ghost")}>Quero este plano <Icon name="arrow" size={16}/></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CityLoja({ city }) {
  return (
    <section className="sec alt">
      <div className="shell">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center"}}>
          <div>
            <span className="sec-lbl">Atendimento local</span>
            <h2 style={{fontSize:"clamp(32px,4vw,48px)", fontWeight:800, letterSpacing:"-0.025em", lineHeight:1.05, marginTop:16, marginBottom:18}}>
              A gente está <span style={{color:"var(--teal)"}}>aqui, em {city.name}</span>.
            </h2>
            <p style={{fontSize:17, color:"var(--ink-2)", lineHeight:1.55, marginBottom:28, maxWidth:"50ch"}}>
              {city.loja.desc}
            </p>
            <div style={{display:"flex", flexDirection:"column", gap:18}}>
              {city.loja.items.map((it, i) => (
                <div key={i} style={{display:"flex", alignItems:"flex-start", gap:14}}>
                  <div style={{width:42, height:42, borderRadius:12, background:"var(--teal-soft)", color:"var(--teal)", display:"flex", alignItems:"center", justifyContent:"center", flex:"none"}}>
                    <Icon name={it.icon} size={20}/>
                  </div>
                  <div>
                    <div style={{fontSize:12, fontWeight:700, color:"var(--ink-mute)", letterSpacing:"0.08em", textTransform:"uppercase"}}>{it.k}</div>
                    <div style={{fontSize:17, fontWeight:700, marginTop:4}}>{it.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="city-photo" data-label={`LOJA / TIME ONDELINE · ${city.name.toUpperCase()}\n\n[foto do time local]`}></div>
        </div>
      </div>
    </section>
  );
}

function CityCTA({ city }) {
  const [sent, setSent] = React.useState(false);
  const isSoon = city.status !== "active";
  return (
    <section className="cta" id={isSoon ? "waitlist" : "contato-cidade"}>
      <div className="shell">
        <div className="cta-card">
          <div style={{position:"relative", zIndex:1}}>
            <span className="sec-lbl" style={{background:"rgba(255,255,255,0.2)", color:"#fff"}}>
              {isSoon ? "Lista de espera" : `Instalação em ${city.name}`}
            </span>
            <h2 style={{marginTop:16}}>
              {isSoon ? `A Ondeline está chegando em ${city.name}.` : `Fibra na sua casa em ${city.name}, em até 48h.`}
            </h2>
            <p>
              {isSoon
                ? `Cadastre seu WhatsApp para ser um dos primeiros assinantes quando a rede chegar em ${city.name}. Vaga garantida sem compromisso.`
                : "Deixa seus dados que nosso time entra em contato em menos de 1 hora útil com toda a disponibilidade pro seu endereço."}
            </p>
          </div>
          <form className="cta-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
            {!sent ? (
              <>
                <h3>{isSoon ? "Entrar na lista" : "Solicitar instalação"}</h3>
                <label>Nome completo</label>
                <input required placeholder="Seu nome"/>
                <label>WhatsApp</label>
                <input required placeholder="(92) 98460-7721"/>
                <label>Endereço / bairro em {city.name}</label>
                <input required placeholder="Rua, bairro ou referência"/>
                {!isSoon && (
                  <>
                    <label>Plano de interesse</label>
                    <select>
                      <option>Essencial · 300 Mega</option>
                      <option>Fluxo · 600 Mega</option>
                      <option>Correnteza · 1 Giga</option>
                      <option>Ainda não sei</option>
                    </select>
                  </>
                )}
                <button className="btn btn-primary" type="submit">
                  {isSoon ? "Quero ser avisado" : "Quero instalar"} <Icon name="arrow" size={16}/>
                </button>
              </>
            ) : (
              <div className="cta-thanks">
                <div className="check">✓</div>
                <h4>{isSoon ? "Você está na lista!" : "Pedido recebido!"}</h4>
                <p>{isSoon ? `Vamos avisar assim que a Ondeline chegar em ${city.name}.` : "Nossa equipe entra em contato em até 1 hora útil."}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function CityApp({ city }) {
  React.useEffect(() => { document.title = `Ondeline em ${city.name} — ${city.state}`; }, [city]);
  return (
    <>
      <FadeInSetup/>
      <Topbar/>
      <Nav home="../index.html"/>
      <CityHero city={city}/>
      <CityStats city={city}/>
      <CityBairros city={city}/>
      <CityPlanos city={city}/>
      <CityLoja city={city}/>
      <CityCTA city={city}/>
      <Footer home="../index.html"/>
    </>
  );
}

window.CityApp = CityApp;
