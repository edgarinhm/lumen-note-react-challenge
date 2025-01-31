import React from "react";

export const NoteForm = (props) => {
  const {
    note = { title: "", text: "", id: "" },
    onCancel,
    onSubmit,
    onChange,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(note);
  };

  const handleOncancel = () => {
    onCancel();
  };

  return (
    <form>
      <div className="form-group">
        <label>Title:</label>
        <input
          className="form-control"
          data-testid="input-title"
          name="title"
          value={note?.title}
          onChange={(event) => onChange({ ...note, title: event.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Note:</label>
        <textarea
          className="form-control"
          data-testid="input-text"
          name="text"
          value={note?.text}
          onChange={(event) => onChange({ ...note, text: event.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="button"
          data-testid="cancel-note"
          className="btn btn-default pull-right"
          value="Cancel"
          onClick={handleOncancel}
        />
        <input
          type="submit"
          data-testid="save-note"
          className="btn btn-default pull-right"
          value="Save"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};
