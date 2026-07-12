import { useEffect, useState } from "react";
import { X, Trash2, ExternalLink } from "lucide-react";
import { PLATFORMS, CONTACT_TYPES, PRIORITIES } from "../lib/constants";
import { PipelineStepper } from "./PipelineTrack";

const EMPTY = {
  name: "",
  type: "creator",
  platform: "youtube",
  profileUrl: "",
  email: "",
  followers: "",
  priority: "medium",
  status: "new",
  keySent: false,
  contentUrl: "",
  views: "",
  lastContactAt: "",
  notes: "",
};

export default function ContactDrawer({ contact, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY);
  const isNew = !contact?.id;

  useEffect(() => {
    setForm(contact ? { ...EMPTY, ...contact } : EMPTY);
  }, [contact]);

  const set = (key) => (e) => {
    const val = e?.target
      ? e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value
      : e;
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave(
      { ...contact, ...form },
      { followers: Number(form.followers) || 0, views: Number(form.views) || 0 }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-[420px] bg-ink-soft border-l border-ink-border h-full overflow-y-auto animate-fadeUp shadow-2xl">
        <div className="sticky top-0 bg-ink-soft border-b border-ink-border px-5 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-semibold text-[15px] text-mist">
            {isNew ? "Neuer Kontakt" : "Kontakt bearbeiten"}
          </h2>
          <button onClick={onClose} className="text-mist-faint hover:text-mist transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <Field label="Name">
            <input
              autoFocus
              value={form.name}
              onChange={set("name")}
              placeholder="z. B. Sarah Plays"
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Typ">
              <select value={form.type} onChange={set("type")} className="input">
                {CONTACT_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Plattform">
              <select value={form.platform} onChange={set("platform")} className="input">
                {PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Profil-URL">
            <div className="flex items-center gap-1.5">
              <input
                value={form.profileUrl}
                onChange={set("profileUrl")}
                placeholder="https://…"
                className="input"
              />
              {form.profileUrl && (
                <a
                  href={form.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-mist-faint hover:text-loop-violet shrink-0"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="E-Mail">
              <input
                value={form.email}
                onChange={set("email")}
                placeholder="kontakt@…"
                className="input"
              />
            </Field>
            <Field label="Follower / Reichweite">
              <input
                type="number"
                value={form.followers}
                onChange={set("followers")}
                placeholder="0"
                className="input font-mono"
              />
            </Field>
          </div>

          <Field label="Priorität">
            <div className="flex gap-1.5">
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => set("priority")(p.id)}
                  className={`flex-1 py-1.5 rounded-md text-[12px] font-medium border transition-colors ${
                    form.priority === p.id
                      ? "border-loop-violet text-loop-violet bg-loop-violet/10"
                      : "border-ink-border text-mist-faint hover:text-mist-dim"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Bearbeitungsstand">
            <PipelineStepper value={form.status} onChange={set("status")} />
          </Field>

          <label className="flex items-center gap-2 text-[12.5px] text-mist-dim cursor-pointer">
            <input
              type="checkbox"
              checked={!!form.keySent}
              onChange={set("keySent")}
              className="accent-loop-violet w-3.5 h-3.5"
            />
            Key / Review-Code wurde versendet
          </label>

          <Field label="Link zum veröffentlichten Content">
            <input
              value={form.contentUrl}
              onChange={set("contentUrl")}
              placeholder="https://…"
              className="input"
            />
          </Field>

          <Field label="Views / Aufrufe">
            <input
              type="number"
              value={form.views}
              onChange={set("views")}
              placeholder="0"
              className="input font-mono"
            />
          </Field>

          <Field label="Letzter Kontakt">
            <input
              type="date"
              value={form.lastContactAt}
              onChange={set("lastContactAt")}
              className="input"
            />
          </Field>

          <Field label="Notizen">
            <textarea
              value={form.notes}
              onChange={set("notes")}
              rows={4}
              placeholder="Absprachen, Deadlines, Besonderheiten…"
              className="input resize-none"
            />
          </Field>
        </div>

        <div className="sticky bottom-0 bg-ink-soft border-t border-ink-border px-5 py-4 flex items-center gap-2">
          {!isNew && (
            <button
              onClick={() => onDelete(contact.id)}
              className="p-2 rounded-lg text-mist-faint hover:text-loop-coral hover:bg-loop-coral/10 transition-colors"
              title="Kontakt löschen"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!form.name.trim()}
            className="flex-1 bg-loop-violet hover:bg-loop-violetSoft disabled:opacity-40 disabled:cursor-not-allowed text-ink font-medium text-[13px] py-2.5 rounded-lg transition-colors"
          >
            {isNew ? "Kontakt anlegen" : "Änderungen speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[11.5px] font-medium text-mist-faint mb-1.5">{label}</label>
      {children}
    </div>
  );
}
