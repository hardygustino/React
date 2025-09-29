export default function Footer() {
  return (
    <footer className="py-4 mt-5 border-top" style={{borderColor:'rgba(255,255,255,0.08)'}}>
      <div className="container text-center">
        <div className="small" style={{color:'var(--muted)'}}>
          &copy; {new Date().getFullYear()} Tugas React — Tema Gelap + Bootstrap
        </div>
      </div>
    </footer>
  )
}
