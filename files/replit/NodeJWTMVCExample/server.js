// server.js -- the application entry point.
//
// In the MVC pattern, this file contains NO business logic.  Its only jobs
// are to configure the web framework and to delegate each URL prefix to a
// router (which in turn delegates to a controller, which uses a model).
//
// Run with:  npm install && node server.js
// Then see README.md for example curl commands to exercise the API.

const express = require('express');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies into req.body
app.use(express.json());

// Route table: prefix -> router.  This is the "front door" of the app.
app.use('/auth', authRoutes);   // POST /auth/register, POST /auth/login
app.use('/notes', noteRoutes);  // GET/POST /notes (JWT protected)

// A trivial public route so you can check the server is up
app.get('/', (req, res) => {
  res.json({
    message: 'Node JWT MVC Example is running',
    try: [
      'POST /auth/register {"username": "...", "password": "..."}',
      'POST /auth/login    {"username": "...", "password": "..."} -> returns a token',
      'GET  /notes         (send header: Authorization: Bearer <token>)',
      'POST /notes         {"text": "..."} (same Authorization header)'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
