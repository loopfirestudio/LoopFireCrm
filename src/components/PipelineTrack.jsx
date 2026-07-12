import { PIPELINE } from "../lib/constants";

const FLOW = PIPELINE.filter((s) => s.id !== "declined");

// Interaktiver Stepper — im Kontakt-Detail, um den Bearbeitungsstand zu setzen.
export function PipelineStepper({ value, onChange }) {
  const declined = value === "declined";
  const activeIdx = FLOW.findIndex((s) => s.id === value);

  return (
    <div>
      <div className="flex items-center">
        {FLOW.map((step, i) => {
          const reached = !declined && i <= activeIdx;
          const isLast = i === FLOW.length - 1;
          return (
            <div key={step.id} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
              <button
                type="button"
                onClick={() => onChange(step.id)}
                title={step.label}
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all border-2"
                style={{
                  borderColor: reached ? step.color : "#2C303C",
                  backgroundColor: reached ? step.color : "transparent",
                }}
              >
                {reached && <span className="w-1.5 h-1.5 rounded-full bg-ink" />}
              </button>
              {!isLast && (
                <div
                  className="h-[2px] flex-1 mx-1 rounded transition-all"
                  style={{ backgroundColor: i < activeIdx && !declined ? step.color : "#2C303C" }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2">
        {FLOW.map((step) => (
          <span
            key={step.id}
            className="text-[10px] font-mono text-mist-faint w-6 text-center -ml-3 first:ml-0"
          >
            {step.label.split(" ")[0]}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange("declined")}
        className={`mt-3 text-[11.5px] font-medium ${
          declined ? "text-loop-coral" : "text-mist-faint hover:text-loop-coral"
        }`}
      >
        {declined ? "● Abgelehnt" : "Als abgelehnt markieren"}
      </button>
    </div>
  );
}

// Read-only Funnel fürs Dashboard — zeigt wie viele Kontakte in jeder Stufe stecken.
export function PipelineFunnel({ contacts }) {
  const counts = Object.fromEntries(PIPELINE.map((s) => [s.id, 0]));
  contacts.forEach((c) => {
    counts[c.status] = (counts[c.status] || 0) + 1;
  });
  const max = Math.max(1, ...FLOW.map((s) => counts[s.id] || 0));

  return (
    <div className="space-y-3">
      {FLOW.map((step) => {
        const count = counts[step.id] || 0;
        const pct = Math.max(4, (count / max) * 100);
        return (
          <div key={step.id} className="flex items-center gap-3">
            <span className="text-[12px] text-mist-dim w-[92px] shrink-0">{step.label}</span>
            <div className="flex-1 h-2 rounded-full bg-ink-surface overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: step.color }}
              />
            </div>
            <span className="text-[12px] font-mono text-mist w-6 text-right shrink-0">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
