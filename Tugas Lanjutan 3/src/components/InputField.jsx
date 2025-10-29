export default function InputField({
  label, type="text", name, value, onChange, onBlur,
  error, touched, placeholder
}) {
  const invalid = touched && error;
  return (
    <div style={{marginBottom:14}}>
      <label style={{display:"block", fontWeight:600, marginBottom:6}}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          width:"100%", padding:"10px 12px", borderRadius:8,
          border: `1px solid ${invalid ? "#e11d48" : "#cbd5e1"}`, outline:"none"
        }}
      />
      {invalid && (
        <div style={{color:"#e11d48", fontSize:12, marginTop:6}}>{error}</div>
      )}
    </div>
  );
}
