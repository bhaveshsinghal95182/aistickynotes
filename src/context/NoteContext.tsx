import React, { createContext, useState, useEffect, ReactNode } from "react";
import Spinner from "../assets/Spinner";
import { db } from "../appwrite/databses";
import { Note } from "../types/note";

// interface NoteContextType {
//   notes: Note[];
//   setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
// }

export const NoteContext = createContext();

interface NotesProviderProps {
  children: ReactNode;
}

const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]); 

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await db.notes.list();
      setNotes(response.documents as Note[]);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextData = { notes, setNotes };

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};

export default NotesProvider;
