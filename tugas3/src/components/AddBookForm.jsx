import React, { useState } from "react";

export default function AddBookForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    price: "",
    cover: ""
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Judul wajib diisi";
    if (!form.author.trim()) err.author = "Penulis wajib diisi";
    if (!form.year || !/^\d{4}$/.test(form.year)) err.year = "Tahun 4 digit";
    if (!form.price.trim()) err.price = "Harga wajib diisi (mis: Rp 120.000)";
    if (!form.cover.trim()) err.cover = "URL sampul wajib diisi";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd({
      title: form.title.trim(),
      author: form.author.trim(),
      year: Number(form.year),
      price: form.price.trim(),
      cover: form.cover.trim()
    });
    onClose?.();
  };

  return (
    <form onSubmit={onSubmit} style={{
      background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 16,
      padding: 16,
      display: "grid",
      gap: 12
    }}>
      <div style={{ display: "grid", gap: 6 }}>
        <label>Judul</label>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Mis: Clean Code"
          style={inputStyle}
        />
        {errors.title && <span style={errStyle}>{errors.title}</span>}
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Penulis</label>
        <input
          name="author"
          value={form.author}
          onChange={onChange}
          placeholder="Mis: Robert C. Martin"
          style={inputStyle}
        />
        {errors.author && <span style={errStyle}>{errors.author}</span>}
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Tahun</label>
        <input
          name="year"
          value={form.year}
          onChange={onChange}
          placeholder="Mis: 2008"
          style={inputStyle}
        />
        {errors.year && <span style={errStyle}>{errors.year}</span>}
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Harga</label>
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="Mis: Rp 150.000"
          style={inputStyle}
        />
        {errors.price && <span style={errStyle}>{errors.price}</span>}
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>URL Sampul</label>
        <input
          name="cover"
          value={form.cover}
          onChange={onChange}
          placeholder="/images/cleancode.jpg atau https://…"
          style={inputStyle}
        />
        {errors.cover && <span style={errStyle}>{errors.cover}</span>}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
        <button type="button" className="btn" onClick={onClose}>Batal</button>
        <button className="btn" type="submit">Simpan</button>
      </div>
    </form>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  padding: "10px 12px",
  color: "#e6e9ee",
  outline: "none"
};

const errStyle = { color: "#ffaaaa", fontSize: 12 };
