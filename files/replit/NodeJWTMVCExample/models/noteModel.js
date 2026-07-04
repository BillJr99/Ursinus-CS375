// models/noteModel.js -- the model layer for notes.
//
// Like userModel, this is the only place note data is read or written.
// Swap the JSON file for a SQL table (see the commented schema below) and
// nothing outside this file needs to change.
//
//   CREATE TABLE notes (
//     id        INTEGER PRIMARY KEY AUTOINCREMENT,
//     ownerId   INTEGER NOT NULL REFERENCES users(id),
//     text      TEXT NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- the model owns this!
//   );

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'notes.json');

function loadNotes() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveNotes(notes) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

function findByOwner(ownerId) {
  return loadNotes().filter((n) => n.ownerId === ownerId);
}

function createNote(ownerId, text) {
  // The model enforces the data rules even though the controller also
  // validates: every path into storage goes through this check, so a bug
  // (or a future second controller) cannot persist a blank note.  Unit
  // tests can exercise this error branch directly.
  if (typeof text !== 'string' || text.trim() === '') {
    throw new Error('note text must be a non-empty string');
  }

  const notes = loadNotes();
  const note = {
    id: notes.length === 0 ? 1 : notes[notes.length - 1].id + 1,
    ownerId: ownerId,
    text: text,
    createdAt: new Date().toISOString() // default value set by the model, not the view
  };
  notes.push(note);
  saveNotes(notes);
  return note;
}

module.exports = { findByOwner, createNote };
