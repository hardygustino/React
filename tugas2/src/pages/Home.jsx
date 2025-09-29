export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero py-5 py-md-6 border-bottom" style={{borderColor:'rgba(255,255,255,0.08)'}}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-3">
                Selamat Datang di <span style={{color:'var(--primary)'}}>Project React</span>
              </h1>
              <p className="lead" style={{color:'var(--muted)'}}>
                Versi tampilan baru: tema gelap, gradient halus, dan kartu bergaya glass.  
                Cepat, rapi, dan responsif dengan Bootstrap 5.
              </p>
              <div className="d-flex gap-2">
                <a className="btn btn-primary" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
                <a className="btn btn-outline-light" href="#fitur">Lihat Fitur</a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="glass p-2 p-md-3">
                <img
                  className="img-fluid rounded-3"
                  alt="Hero"
                  src="https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FITUR */}
      <section id="fitur" className="py-5">
        <div className="container">
          <h2 className="h3 fw-semibold text-center mb-4">Fitur Utama</h2>
          <div className="row g-4">
            {[
              { t:'Build Super Cepat', d:'Vite + HMR bikin dev experience ngebut.' },
              { t:'UI Gelap Modern', d:'Pakai Bootstrap + custom glass style.' },
              { t:'Struktur Rapi', d:'Komponen terpisah: Home / Team / Contact.' },
            ].map((f,i)=>(
              <div className="col-md-4" key={i}>
                <div className="glass p-4 h-100">
                  <div className="mb-2" style={{color:'var(--accent)'}}>◆</div>
                  <h3 className="h5 mb-2">{f.t}</h3>
                  <p className="mb-0" style={{color:'var(--muted)'}}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
