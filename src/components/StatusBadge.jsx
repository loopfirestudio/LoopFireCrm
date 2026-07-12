import { statusById } from "../lib/constants";

export default function StatusBadge({ status, className = "" }) {
  const s = statusById(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11.5px] font-medium ${className}`}
      style={{ backgroundColor: `${s.color}1A`, color: s.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}
