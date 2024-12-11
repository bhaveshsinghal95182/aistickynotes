import React from "react";
import { Trash } from "../assets/Trash";
import { db } from "../appwrite/databses";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
// import { Note } from "../types/note";

interface DeleteButtonProps {
  noteId: string | number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ noteId }) => {
  const setNotes = useContext(NoteContext)

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    db.notes.delete(noteId)
    setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
    console.log(e);
  }

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
