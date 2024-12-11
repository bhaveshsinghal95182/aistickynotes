import React from "react";
import NotesPage from "./pages/NotesPages";
import NotesProvider from "./context/NoteContext";

const App: React.FC = () => {
  return (
    <div id="app">
      <NotesProvider>
        <NotesPage />
      </NotesProvider>
    </div>
  );
};

export default App;
