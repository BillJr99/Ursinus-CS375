// models/userModel.js -- the model layer for users.
//
// The model is the ONLY layer that touches the data store.  Here the
// "database" is a JSON file on disk (data/users.json) so that the example
// runs with no database server installed; with SQLite or MySQL, only this
// file would change -- the routes and controllers would not.

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'users.json');

function loadUsers() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveUsers(users) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// Never store plaintext passwords!  We store a salted hash, and re-compute
// it at login time.  (Production code would use bcrypt or argon2, which
// are deliberately slow; scrypt is built into node and fine for a demo.)
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 32).toString('hex');
}

function findByUsername(username) {
  return loadUsers().find((u) => u.username === username);
}

function createUser(username, password) {
  const users = loadUsers();
  const salt = crypto.randomBytes(16).toString('hex');
  const user = {
    id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
    username: username,
    salt: salt,
    passwordHash: hashPassword(password, salt),
    // The model stamps creation time at insert -- the view/client never
    // supplies it.  (SQL equivalent: createdAt DEFAULT CURRENT_TIMESTAMP.)
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  return user;
}

function verifyCredentials(username, password) {
  const user = findByUsername(username);
  if (!user) {
    return null;
  }
  const candidate = hashPassword(password, user.salt);
  const ok = crypto.timingSafeEqual(
    Buffer.from(candidate, 'hex'),
    Buffer.from(user.passwordHash, 'hex')
  );
  return ok ? user : null;
}

module.exports = { findByUsername, createUser, verifyCredentials };
