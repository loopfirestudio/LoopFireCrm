import { useMemo } from "react";
import { Users, Radio, Eye, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import StatCard from "./StatCard";
import StatusBadge from "./StatusBadge";
import { PipelineFunnel } from "./PipelineTrack";
import { PLATFORMS, platformById } from "../lib/constants";

function formatCompact(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function Dashboard({ contacts, loading, onOpenContact }) {
  const stats = useMemo(() => {
    const totalReach = contacts.reduce((s, c) => s + (Number(c.followers) || 0), 0);
    const totalViews = contacts.reduce((s, c) => s + (Number(c.views) || 0), 0);
    const engaged = contacts.filter((c) => c.status !== "new" && c.status !== "declined").length;
    const posted = contacts.filter((c) => c.status === "posted").length;
    const conversion = engaged > 0 ? Math.round((posted / engaged) * 100) : 0;

    const byPlatform = {};
    contacts.forEach((c) => {
      const key = c.platform || "other";
      byPlatform[key] = (byPlatform[key] || 0) + 1;
    });
    const platformData = Object.entries(byPlatform)
      .map(([id, count]) => ({ id, label: platformById(id).label, count }))
      .sort((a, b) => b.count - a.count);

    const recent = [...contacts]
      .sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0))
      .slice(0, 5);

    return { totalReach, totalViews, conversion, platformData, recent, total: contacts.length };
  }, [contacts]);

  if (loading) {
    return <div className="p-8 text-mist-faint text-sm">Lade Marketingdaten …</div>;
  }

  if (contacts.length === 0) {
    return (
      <div className="p-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1180px] animate-fadeUp">
      <header className="mb-7">
        <h1 className="font-display font-semibold text-[22px] text-mist">Dashboard</h1>
        <p className="text-[13px] text-mist-dim mt-1">
          Überblick über eure Marketing-Kontakte und Reichweite.
        </p>
      </header>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Kontakte gesamt"
          value={stats.total}
          sub={`${contacts.filter((c) => c.type === "creator").length} Creator · ${
            contacts.filter((c) => c.type === "press").length
          } Presse`}
          icon={Users}
          accent="#8B7CFF"
        />
        <StatCard
          label="Gesamtreichweite"
          value={formatCompact(stats.totalReach)}
          sub="Summe aller Follower / Abonnenten"
          icon={Radio}
          accent="#FFB454"
        />
        <StatCard
          label="Views aus Content"
          value={formatCompact(stats.totalViews)}
          sub="Aufrufe veröffentlichter Beiträge"
          icon={Eye}
          accent="#5FE0B7"
        />
        <StatCard
          label="Conversion-Rate"
          value={`${stats.conversion}%`}
          sub="Kontaktiert → veröffentlicht"
          icon={TrendingUp}
          accent="#FF6F61"
        />
      </div>

      <div className="grid grid-cols-[1.1fr_1fr] gap-4 mb-6">
        <div className="bg-ink-soft border border-ink-border rounded-xl2 p-5 shadow-card">
          <h2 className="text-[13px] font-medium text-mist mb-4">Pipeline</h2>
          <PipelineFunnel contacts={contacts} />
        </div>

        <div className="bg-ink-soft border border-ink-border rounded-xl2 p-5 shadow-card">
          <h2 className="text-[13px] font-medium text-mist mb-4">Kontakte pro Plattform</h2>
          <div className="h-[168px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.platformData} layout="vertical" margin={{ left: 0, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C303C" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={90}
                  tick={{ fill: "#9A9CA8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#20232D" }}
                  contentStyle={{
                    background: "#1A1C24",
                    border: "1px solid #2C303C",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "#EDEBE6",
                  }}
                />
                <Bar dataKey="count" fill="#8B7CFF" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-ink-soft border border-ink-border rounded-xl2 p-5 shadow-card">
        <h2 className="text-[13px] font-medium text-mist mb-4">Zuletzt aktualisiert</h2>
        <div className="divide-y divide-ink-border">
          {stats.recent.map((c) => (
            <button
              key={c.id}
              onClick={() => onOpenContact(c)}
              className="w-full flex items-center justify-between py-2.5 text-left hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink-surface flex items-center justify-center text-[12px] font-medium text-mist-dim">
                  {c.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="text-[13px] text-mist">{c.name}</p>
                  <p className="text-[11.5px] text-mist-faint">{platformById(c.platform).label}</p>
                </div>
              </div>
              <StatusBadge status={c.status} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="max-w-md">
      <h1 className="font-display font-semibold text-[22px] text-mist mb-2">
        Noch keine Marketingdaten
      </h1>
      <p className="text-[13.5px] text-mist-dim leading-relaxed">
        Sobald ihr Content Creator oder Presse-Kontakte unter „Kontakte" anlegt, sammeln sich
        hier eure Reichweiten-, Pipeline- und Performance-Statistiken.
      </p>
    </div>
  );
}
