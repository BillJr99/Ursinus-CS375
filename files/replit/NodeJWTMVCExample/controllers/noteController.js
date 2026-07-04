// controllers/noteController.js -- controller for the protected /notes resource.
//
// Because these routes sit behind the requireAuth middleware, by the time
// a controller function runs, req.user has already been populated from a
// *verified* JWT.  The controller can trust it.

const noteModel = require('../models/noteModel');

// GET /notes -- list the logged-in user's notes.
function listNotes(req, res) {
  const notes = noteModel.findByOwner(req.user.sub);
  res.json(notes);
}

// POST /notes  {"text": "..."} -- create a note owned by the logged-in user.
//
// Design note: the client does NOT send a createdAt timestamp, and the
// controller does not trust one if it did.  "When was this created?" is
// data the server owns: here the model stamps it at insert time (with a
// SQL database, DEFAULT CURRENT_TIMESTAMP does the same job).  Never
// collect defaults like these from the view.
function createNote(req, res) {
  const { text } = req.body || {};

  // "text is required" means a real, non-blank string -- reject numbers,
  // objects, and whitespace-only strings too, not just missing values.
  if (typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'text is required and must be a non-empty string' });
  }

  const note = noteModel.createNote(req.user.sub, text);
  res.status(201).json(note);
}

module.exports = { listNotes, createNote };
