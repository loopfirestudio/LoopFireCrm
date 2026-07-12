import { useMemo, useState } from "react";
import { Plus, Search, PlayCircle, Radio, Camera, Newspaper, MessageCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { PLATFORMS, PIPELINE, platformById } from "../lib/constants";

const PLATFORM_ICON = {
  youtube: PlayCircle,
  twitch: Radio,
  tiktok: Camera,
  instagram: Camera,
  x: MessageCircle,
  press: Newspaper,
};

function formatCompact(n) {
  n = Number(n) || 0;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function ContactsView({ contacts, loading, onOpenContact, onNewContact }) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return contacts
      .filter((c) => (typeFilter === "all" ? true : c.type === typeFilter))
      .filter((c) => (statusFilter === "all" ? true : c.status === statusFilter))
      .filter((c) => (search ? c.name?.toLowerCase().includes(search.toLowerCase()) : true));
  }, [contacts, typeFilter, statusFilter, search]);

  return (
    <div className="p-8 max-w-[1180px] animate-fadeUp">
      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display font-semibold text-[22px] text-mist">Kontakte</h1>
          <p className="text-[13px] text-mist-dim mt-1">
            Content Creator &amp; Presse — Bearbeitungsstand auf einen Blick.
          </p>
        </div>
        <button
          onClick={onNewContact}
          className="flex items-center gap-1.5 bg-loop-violet hover:bg-loop-violetSoft text-ink font-medium text-[13px] px-3.5 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} strokeWidth={2.5} />
          Neuer Kontakt
        </button>
      </header>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex bg-ink-soft border border-ink-border rounded-lg p-0.5">
          {[
            { id: "all", label: "Alle" },
            { id: "creator", label: "Creator" },
            { id: "press", label: "Presse" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id)}
              className={`px-3 py-1.5 rounded-md text-[12.5px] font-medium transition-colors ${
                typeFilter === t.id ? "bg-ink-surface text-mist" : "text-mist-faint hover:text-mist-dim"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-ink-soft border border-ink-border rounded-lg px-2.5 py-[7px] text-[12.5px] text-mist-dim outline-none"
        >
          <option value="all">Alle Status</option>
          {PIPELINE.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>

        <div className="relative ml-auto">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-mist-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name suchen…"
            className="bg-ink-soft border border-ink-border rounded-lg pl-8 pr-3 py-[7px] text-[12.5px] text-mist w-[200px] outline-none placeholder:text-mist-faint focus:border-loop-violet"
          />
        </div>
      </div>

      <div className="bg-ink-soft border border-ink-border rounded-xl2 overflow-hidden shadow-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ink-border">
              {["Name", "Plattform", "Reichweite", "Priorität", "Status", "Letzter Kontakt"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-[11px] uppercase tracking-wide text-mist-faint font-medium px-4 py-3"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-mist-faint text-[13px]">
                  Lade Kontakte …
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-mist-faint text-[13px]">
                  Keine Kontakte gefunden.
                </td>
              </tr>
            )}
            {filtered.map((c) => {
              const Icon = PLATFORM_ICON[c.platform] || null;
              return (
                <tr
                  key={c.id}
                  onClick={() => onOpenContact(c)}
                  className="border-b border-ink-border last:border-0 hover:bg-ink-surface/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-ink-surface flex items-center justify-center text-[11.5px] font-medium text-mist-dim shrink-0">
                        {c.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="text-[13px] text-mist">{c.name}</p>
                        <p className="text-[11px] text-mist-faint">
                          {c.type === "creator" ? "Content Creator" : "Presse / Media"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[12.5px] text-mist-dim">
                      {Icon && <Icon size={13} />}
                      {platformById(c.platform).label}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12.5px] font-mono text-mist-dim">
                    {formatCompact(c.followers)}
                  </td>
                  <td className="px-4 py-3">
                    <PriorityDot priority={c.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-[12.5px] text-mist-faint">
                    {c.lastContactAt || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PriorityDot({ priority }) {
  const map = {
    high: { label: "Hoch", color: "#FF6F61" },
    medium: { label: "Mittel", color: "#FFB454" },
    low: { label: "Niedrig", color: "#5F6270" },
  };
  const p = map[priority] || map.low;
  return (
    <span className="flex items-center gap-1.5 text-[12px] text-mist-dim">
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
      {p.label}
    </span>
  );
}
