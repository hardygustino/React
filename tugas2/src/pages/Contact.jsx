import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ nama: "", email: "", subjek: "", pesan: "" });
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.nama.trim()) return "Nama wajib diisi";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Format email tidak valid";
    if (!form.pesan.trim()) return "Pesan wajib diisi";
    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }
    // Simulasi kirim (di real app, fetch/axios ke API)
    setTimeout(() => {
      setStatus({ type: "success", message: "Pesan terkirim! (simulasi)" });
      setForm({ nama: "", email: "", subjek: "", pesan: "" });
    }, 400);
  };

  const onReset = () => {
    setForm({ nama: "", email: "", subjek: "", pesan: "" });
    setStatus(null);
  };

  return (
    <section className="py-5">
      <div className="container">
        <header className="text-center mb-4">
          <h1 className="h3 fw-bold">Hubungi Kami</h1>
          <p style={{ color: "var(--muted)" }}>Tinggalkan pesan, kami akan balas secepatnya.</p>
        </header>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="glass p-4">
              {status && (
                <div
                  className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"} mb-4`}
                  role="alert"
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={onSubmit} onReset={onReset} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nama" className="form-label">Nama</label>
                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      className="form-control"
                      placeholder="Nama lengkap"
                      value={form.nama}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="nama@email.com"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="subjek" className="form-label">Subjek</label>
                    <input
                      id="subjek"
                      name="subjek"
                      type="text"
                      className="form-control"
                      placeholder="Judul pesan"
                      value={form.subjek}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="pesan" className="form-label">Pesan</label>
                    <textarea
                      id="pesan"
                      name="pesan"
                      rows="5"
                      className="form-control"
                      placeholder="Tuliskan pesan..."
                      value={form.pesan}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid d-sm-flex gap-2 justify-content-sm-end mt-4">
                  <button type="reset" className="btn btn-outline-light">Reset</button>
                  <button type="submit" className="btn btn-primary">Kirim</button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="glass p-4 h-100">
              <h5 className="mb-3">Info Kontak</h5>
              <ul className="list-unstyled mb-4" style={{ color: "var(--muted)" }}>
                <li className="mb-2">Email: <a href="mailto:you@example.com">you@example.com</a></li>
                <li className="mb-2">WhatsApp: <a href="https://wa.me/6281200000000" target="_blank" rel="noreferrer">+62-812-0000-0000</a></li>
                <li className="mb-2">Alamat: Jakarta, Indonesia</li>
              </ul>

              <div className="ratio ratio-16x9 glass">
                <iframe
                  title="map"
                  src="https://maps.google.com/maps?q=Jakarta&t=&z=11&ie=UTF8&iwloc=&output=embed"
                  style={{ border: 0, borderRadius: 12 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
