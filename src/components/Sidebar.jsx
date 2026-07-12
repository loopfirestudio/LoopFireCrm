import { LayoutGrid, Users2 } from "lucide-react";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "contacts", label: "Kontakte", icon: Users2 },
];

export default function Sidebar({ view, setView, stats }) {
  return (
    <aside className="w-[220px] shrink-0 border-r border-ink-border bg-ink-soft flex flex-col">
      <div className="px-5 pt-6 pb-5 flex items-center gap-2.5">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M13 2C9 7 6 10.5 6 15a7 7 0 0 0 14 0c0-2.4-1-4.3-2.4-6 .3 2-.4 3.4-1.6 4-0.2-2.6-1.4-4.8-3-6.6C12 8 11.3 9.6 11.3 11c0-3.2 1-6.4 1.7-9Z"
            fill="url(#g)"
          />
          <defs>
            <linearGradient id="g" x1="6" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B7CFF" />
              <stop offset="1" stopColor="#FFB454" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <p className="font-display font-semibold text-[15px] tracking-tight text-mist leading-none">
            Loopfire
          </p>
          <p className="text-[10px] text-mist-faint tracking-wide mt-0.5">MARKETING CRM</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                active
                  ? "bg-ink-surface text-mist"
                  : "text-mist-dim hover:text-mist hover:bg-ink-surface/60"
              }`}
            >
              <Icon size={16} strokeWidth={2} className={active ? "text-loop-violet" : ""} />
              {item.label}
              {item.id === "contacts" && stats?.total > 0 && (
                <span className="ml-auto text-[11px] font-mono text-mist-faint">
                  {stats.total}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-ink-border">
        <p className="text-[11px] text-mist-faint leading-relaxed">
          Firestore · Datenbank <span className="font-mono text-mist-dim">marketing</span>
        </p>
      </div>
    </aside>
  );
}
