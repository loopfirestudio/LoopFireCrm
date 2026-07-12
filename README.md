# Loopfire Marketing CRM

Schlanke CRM-WebApp zum Sammeln und Verwalten eurer Marketing-Kontakte
(Content Creator & Presse) für euer Indie-Game-Studio. Läuft komplett gegen
Firestore, Datenbank **`marketing`**.

## Setup

```bash
npm install
npm run dev
```

Die App läuft dann unter `http://localhost:5173`.

Für ein Produktions-Build:

```bash
npm run build
npm run preview
```

## Firestore einrichten

Die App schreibt in eine Collection namens **`contacts`** innerhalb der
Firestore-Datenbank `marketing` (nicht die `(default)`-Datenbank). Die
Collection wird automatisch beim ersten Anlegen eines Kontakts erstellt –
ihr müsst nichts manuell vorbereiten.

**Wichtig:** Da die App aktuell ohne Login arbeitet, müsst ihr in der
Firebase Console → Firestore → Datenbank `marketing` → Regeln
sicherstellen, dass Lese-/Schreibzugriff erlaubt ist, z. B. für den Start:

```
rules_version = '2';
service cloud.firestore {
  match /databases/marketing/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ Das ist offen für jeden mit dem API-Key. Für den produktiven Einsatz
solltet ihr das Frontend hinter eine einfache Anmeldung (z. B. Firebase Auth)
stellen und die Regeln entsprechend auf `if request.auth != null` einschränken.

## Datenmodell (`contacts`)

| Feld | Beschreibung |
|---|---|
| `name` | Name des Creators / der Presse-Kontaktperson |
| `type` | `creator` oder `press` |
| `platform` | YouTube, Twitch, TikTok, Instagram, X, Presse-Outlet, Sonstiges |
| `profileUrl` | Link zum Kanal/Profil |
| `email` | Kontakt-E-Mail |
| `followers` | Reichweite (Zahl) |
| `priority` | `low` / `medium` / `high` |
| `status` | Pipeline-Stufe: `new → contacted → negotiating → key_sent → posted`, oder `declined` |
| `keySent` | Ob ein Review-Key/-Code versendet wurde |
| `contentUrl` | Link zum veröffentlichten Video/Post |
| `views` | Aufrufe des veröffentlichten Contents |
| `lastContactAt` | Datum des letzten Kontakts |
| `notes` | Freitext-Notizen |
| `createdAt` / `updatedAt` | automatische Zeitstempel |

## Struktur

- **Dashboard** – Gesamtreichweite, Views, Conversion-Rate, Pipeline-Funnel,
  Plattform-Verteilung, zuletzt aktualisierte Kontakte.
- **Kontakte** – Tabelle aller Creator/Presse-Kontakte mit Such-, Typ- und
  Status-Filtern. Klick auf eine Zeile öffnet das Detail-Panel zum Bearbeiten
  des Bearbeitungsstands, der Notizen, Performance-Daten etc.
