import React, { useEffect, useRef, useState } from "react";
import { Note, Position } from "../types/note";
import DeleteButton from "./DeleteButton";
import { db } from "../appwrite/databses";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import Spinner from "../assets/Spinner";

interface NoteProp {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NoteCard: React.FC<NoteProp> = ({ note }) => {
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(0);

  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);

  const mousePos = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.className === "card-header") {
      mousePos.current = { x: e.clientX, y: e.clientY };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      if (cardRef.current) setZIndex(cardRef.current);
    }
  };

  const mouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;

    // Calculate move direction
    const deltaX = mousePos.current.x - e.clientX;
    const deltaY = mousePos.current.y - e.clientY;

    // Update the mouse position
    mousePos.current = { x: e.clientX, y: e.clientY };

    // Update card position
    const newPosition = setNewOffset(cardRef.current, { x: deltaX, y: deltaY });
    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const saveData = async (
    key: string,
    value: string | Position | undefined | null
  ) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      if (textAreaRef.current) {
        saveData("body", textAreaRef.current.value);
      }
    }, 2000);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute",
        cursor: "grab",
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          onKeyUp={handleKeyUp}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
          style={{ color: colors.colorText }}
          defaultValue={body}
          ref={textAreaRef}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
