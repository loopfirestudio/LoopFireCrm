export const CONTACT_TYPES = [
  { id: "creator", label: "Content Creator" },
  { id: "press", label: "Presse / Media" },
];

// Die Pipeline-Stufen — das "Loop" durch das jeder Kontakt läuft.
export const PIPELINE = [
  { id: "new", label: "Neu", color: "#5F6270" },
  { id: "contacted", label: "Kontaktiert", color: "#8B7CFF" },
  { id: "negotiating", label: "Verhandlung", color: "#FFB454" },
  { id: "key_sent", label: "Key gesendet", color: "#5FE0B7" },
  { id: "posted", label: "Veröffentlicht", color: "#5FE0B7" },
  { id: "declined", label: "Abgelehnt", color: "#FF6F61" },
];

export const PIPELINE_INDEX = Object.fromEntries(
  PIPELINE.map((s, i) => [s.id, i])
);

export const platformById = (id) =>
  PLATFORMS.find((p) => p.id === id) || PLATFORMS[PLATFORMS.length - 1];

export const PLATFORMS = [
  { id: "youtube", label: "YouTube" },
  { id: "twitch", label: "Twitch" },
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "x", label: "X / Twitter" },
  { id: "press", label: "Presse-Outlet" },
  { id: "other", label: "Sonstiges" },
];

export const statusById = (id) =>
  PIPELINE.find((s) => s.id === id) || PIPELINE[0];

export const PRIORITIES = [
  { id: "low", label: "Niedrig" },
  { id: "medium", label: "Mittel" },
  { id: "high", label: "Hoch" },
];
