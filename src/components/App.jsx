import React, { useEffect, useState } from "react";

import { NotesList } from "./NotesList";
import { NoteForm } from "./NoteForm";

const initialValue = { title: "", text: "", id: "" };
export const App = (props) => {
  const { service } = props;

  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(initialValue);

  // (!) Get notes from service
  useEffect(() => {
    async function getNotesData() {
      try {
        const notesData = await service.getNotes();
        setNotes(notesData);
      } catch (error) {
        console.error(error);
      }
    }
    getNotesData();
  }, [service]);

  // Select new empty note
  function newNote() {
    setSelected(initialValue);
  }

  // Set note as selected
  function onSelect(note) {
    setSelected(note);
  }

  // Save note to service
  async function onSubmit(note) {
    try {
      const newNote = await service.saveNote(note);
      const notesData = await service.getNotes();
      setNotes(notesData);
      setSelected(newNote);
    } catch (error) {
      console.error(error);
    }
  }

  // Unselect note
  function onCancel() {
    setSelected(initialValue);
  }

  function onChange(note) {
    setSelected(note);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>React notes</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <NotesList notes={notes} onSelect={onSelect} selected={selected} />
        </div>
        <div className="col-md-8">
          <NoteForm
            note={selected}
            onCancel={onCancel}
            onSubmit={onSubmit}
            onChange={onChange}
          />
          <div>
            <button
              className="btn btn-default"
              id="new-note"
              data-testid="new-note"
              onClick={newNote}
            >
              New Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
