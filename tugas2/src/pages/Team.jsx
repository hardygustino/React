import { Link } from "react-router-dom";

const members = [
  { name: "Bagas", role: "Frontend Dev", img: "https://i.pravatar.cc/240?img=12" },
  { name: "Ari", role: "UI/UX Designer", img: "https://i.pravatar.cc/240?img=32" },
  { name: "Gilang", role: "Backend Dev", img: "https://i.pravatar.cc/240?img=5" },
  { name: "Damar", role: "Fullstack", img: "https://i.pravatar.cc/240?img=20" },
  { name: "Adit", role: "QA Engineer", img: "https://i.pravatar.cc/240?img=47" },
  { name: "Rina", role: "PM", img: "https://i.pravatar.cc/240?img=15" },
];

export default function Team() {
  return (
    <section className="py-5">
      <div className="container">
        <header className="text-center mb-4">
          <h1 className="h3 fw-bold">Tim Inti</h1>
          <p style={{ color: "var(--muted)" }}>Kru yang menggerakkan proyek ini.</p>
        </header>

        <div className="row g-4">
          {members.map((m) => (
            <div className="col-6 col-md-4 col-lg-3" key={m.name}>
              <div className="glass p-3 h-100 text-center">
                <img
                  src={m.img}
                  alt={`Foto ${m.name} - ${m.role}`}
                  className="rounded-circle mb-3"
                  width="96"
                  height="96"
                  loading="lazy"
                />
                <h5 className="mb-1">{m.name}</h5>
                <div className="small" style={{ color: "var(--muted)" }}>{m.role}</div>

                <div className="d-flex gap-2 justify-content-center mt-3">
                  {/* Misal rute detail anggota: /team/:name */}
                  <Link to={`/team/${encodeURIComponent(m.name.toLowerCase())}`} className="btn btn-sm btn-outline-light">
                    Profile
                  </Link>
                  <Link to="/contact" className="btn btn-sm btn-primary">
                    Message
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
