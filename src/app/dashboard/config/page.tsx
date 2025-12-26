"use client";
import { useEffect, useState } from "react";
import Field from "@/components/Field";
import { ConfigSchema } from "@/lib/schema";

function setDeep(obj: any, path: string[], v: any) {
  const copy = structuredClone(obj);
  let cur = copy;
  for (let i = 0; i < path.length - 1; i++) {
    cur[path[i]] ??= {};
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = v;
  return copy;
}

function renderSection(schema: any, data: any, basePath: string[], setData: (d:any)=>void) {
  return Object.entries(schema).map(([k, meta]: any) => {
    const p = [...basePath, k];
    const val = data?.[k];

    if (meta?.type) {
      return (
        <Field
          key={p.join(".")}
          label={p.join(".")}
          type={meta.type}
          options={meta.options}
          value={val}
          onChange={(nv: any) => setData((prev:any) => setDeep(prev, p, nv))}
        />
      );
    }

    // nested object
    return (
      <div key={p.join(".")} className="card">
        <div style={{ fontWeight: 700, marginBottom: 10 }}>{p.join(".")}</div>
        <div className="grid">
          {renderSection(meta, data?.[k] ?? {}, p, setData)}
        </div>
      </div>
    );
  });
}

export default function ConfigPage() {
  const [cfg, setCfg] = useState<any>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/proxy/config");
      const j = await r.json();
      setCfg(j);
    })();
  }, []);

  async function save() {
    setStatus("Saving...");
    const r = await fetch("/api/proxy/config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cfg),
    });
    setStatus(r.ok ? "Saved." : "Save failed.");
  }

  if (!cfg) return <div className="card">Loading...</div>;

  return (
    <div className="grid">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>Config</h2>
        <div className="row">
          <button className="btn primary" onClick={save}>Save</button>
          <span className="muted">{status}</span>
        </div>
      </div>

      <div className="grid">
        {renderSection(ConfigSchema, cfg, [], setCfg)}
      </div>
    </div>
  );
}
