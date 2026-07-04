// controllers/authController.js -- the "intermediary" between routes and models.
//
// The controller's job: unpack the HTTP request, ask the model to do the
// work, decide what status code and JSON to send back.  It knows about
// HTTP (req/res) and about the model's functions -- but it contains no
// SQL/file access (that is the model's job) and produces no HTML (that
// would be the view's job).

const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

// In a real application this secret comes from an environment variable,
// never from source code!
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// POST /auth/register  {"username": "...", "password": "..."}
function register(req, res) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  if (userModel.findByUsername(username)) {
    return res.status(409).json({ error: 'username is already taken' });
  }

  const user = userModel.createUser(username, password);
  return res.status(201).json({ id: user.id, username: user.username });
}

// POST /auth/login  {"username": "...", "password": "..."}
// On success, returns a signed JWT the client presents on later requests.
function login(req, res) {
  const { username, password } = req.body || {};

  const user = userModel.verifyCredentials(username, password);
  if (!user) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  // The token *payload* identifies the user; the *signature* proves the
  // server issued it.  Anyone can read the payload (it is only base64
  // encoded), but nobody can alter it without invalidating the signature.
  const token = jwt.sign(
    { sub: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token });
}

module.exports = { register, login };
