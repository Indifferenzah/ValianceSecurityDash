"use client";
export default function Field({ label, type, value, onChange, options }: any) {
  return (
    <div className="grid">
      <div className="muted">{label}</div>
      {type === "toggle" ? (
        <button className="btn" type="button" onClick={() => onChange(!value)}>
          {value ? "ON" : "OFF"}
        </button>
      ) : type === "select" ? (
        <select className="card" value={value ?? ""} onChange={e => onChange(e.target.value)}>
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input className="card" value={value ?? ""} onChange={e => onChange(type === "number" ? Number(e.target.value) : e.target.value)} />
      )}
    </div>
  );
}
