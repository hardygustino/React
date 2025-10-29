import { useState } from "react";
import { api } from "../api";
import InputField from "../components/InputField";
import "./../styles.css";

const emailOK = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").toLowerCase());

const validate = (values) => {
  const e = {};
  if (!values.full_name?.trim()) e.full_name = "Nama lengkap wajib diisi";
  if (!values.email?.trim()) e.email = "Email wajib diisi";
  else if (!emailOK(values.email)) e.email = "Format email tidak valid";
  if (!values.username?.trim()) e.username = "Username wajib diisi";
  if (!values.password) e.password = "Password wajib diisi";
  else if ((values.password || "").length < 6) e.password = "Min. 6 karakter";
  return e;
};

export default function Register() {
  const [values, setValues] = useState({
    full_name: "", email: "", username: "", password: ""
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [showPw, setShowPw] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
  };
  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((s) => ({ ...s, [name]: true }));
    setErrors(validate({ ...values, [name]: values[name] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const ve = validate(values);
    setErrors(ve);
    setTouched({ full_name: true, email: true, username: true, password: true });
    if (Object.keys(ve).length) return;

    setLoading(true);
    setOkMsg("");
    try {
      // Endpoint contoh; sesuaikan dengan backend kamu:
      // Laravel typical: POST /api/register  ATAU  POST /api/users
      await api.post("/register", {
        name: values.full_name,
        email: values.email,
        username: values.username,
        password: values.password,
      });

      setOkMsg("Registrasi berhasil! Silakan login.");
      setValues({ full_name: "", email: "", username: "", password: "" });
      setTouched({});
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        JSON.stringify(err.response?.data?.errors || err.message);
      alert("Gagal registrasi: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-wrap">
      <form className="card" onSubmit={onSubmit} noValidate>
        <h2 className="title">Create Account</h2>

        {!!okMsg && <div className="ok">{okMsg}</div>}

        <InputField
          label="Nama Lengkap"
          name="full_name"
          value={values.full_name}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.full_name}
          touched={touched.full_name}
          placeholder="Hardy Gustino"
        />

        <InputField
          label="Email"
          name="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.email}
          touched={touched.email}
          placeholder="nama@email.com"
        />

        <InputField
          label="Username"
          name="username"
          value={values.username}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.username}
          touched={touched.username}
          placeholder="hardy_gs"
        />

        <div style={{ position:"relative" }}>
          <InputField
            label="Password"
            type={showPw ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.password}
            touched={touched.password}
            placeholder="••••••"
          />
          <button
            type="button"
            className="ghost"
            style={{ position:"absolute", right:10, top:38 }}
            onClick={() => setShowPw((s) => !s)}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        <button className="primary" type="submit" disabled={loading}>
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>
      </form>
    </div>
  );
}
