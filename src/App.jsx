import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ContactsView from "./components/ContactsView";
import ContactDrawer from "./components/ContactDrawer";
import { useContacts } from "./hooks/useContacts";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [activeContact, setActiveContact] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { contacts, loading, error, addContact, updateContact, removeContact } = useContacts();

  const openContact = (c) => {
    setActiveContact(c);
    setDrawerOpen(true);
  };

  const openNew = () => {
    setActiveContact(null);
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const handleSave = async (data, numeric) => {
    const payload = { ...data, ...numeric };
    delete payload.id;
    if (data.id) {
      await updateContact(data.id, payload);
    } else {
      await addContact(payload);
    }
    setDrawerOpen(false);
  };

  const handleDelete = async (id) => {
    await removeContact(id);
    setDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-ink font-body">
      <Sidebar view={view} setView={setView} stats={{ total: contacts.length }} />

      <main className="flex-1 overflow-y-auto">
        {error && (
          <div className="m-6 p-3 rounded-lg bg-loop-coral/10 border border-loop-coral/30 text-loop-coral text-[12.5px]">
            Verbindung zu Firestore fehlgeschlagen: {error}
          </div>
        )}

        {view === "dashboard" && (
          <Dashboard contacts={contacts} loading={loading} onOpenContact={openContact} />
        )}
        {view === "contacts" && (
          <ContactsView
            contacts={contacts}
            loading={loading}
            onOpenContact={openContact}
            onNewContact={openNew}
          />
        )}
      </main>

      {drawerOpen && (
        <ContactDrawer
          contact={activeContact}
          onClose={closeDrawer}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
