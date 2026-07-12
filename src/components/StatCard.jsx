export default function StatCard({ label, value, sub, icon: Icon, accent = "#8B7CFF" }) {
  return (
    <div className="bg-ink-soft border border-ink-border rounded-xl2 p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] text-mist-dim">{label}</span>
        {Icon && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accent}1A` }}
          >
            <Icon size={14} style={{ color: accent }} />
          </div>
        )}
      </div>
      <p className="font-display font-semibold text-[26px] text-mist leading-none">{value}</p>
      {sub && <p className="text-[11.5px] text-mist-faint mt-2">{sub}</p>}
    </div>
  );
}
