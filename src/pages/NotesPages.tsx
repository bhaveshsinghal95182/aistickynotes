import React from "react";
import NoteCard from "../component/NoteCard";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";


const NotesPage: React.FC = () => {

  const {notes} = useContext(NoteContext) 

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
};

export default NotesPage;
