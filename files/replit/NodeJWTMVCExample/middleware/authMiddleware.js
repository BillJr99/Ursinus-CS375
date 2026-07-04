// middleware/authMiddleware.js -- the JWT "bouncer" for protected routes.
//
// Express middleware is a function that runs BEFORE the controller.  This
// one checks the Authorization header for a valid token.  If the token
// verifies, we attach its payload to req.user and call next() to let the
// request continue to the controller.  If not, the request stops here
// with a 401 and the controller never runs.

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

function requireAuth(req, res, next) {
  // Expect:  Authorization: Bearer <token>
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'missing Authorization: Bearer <token> header' });
  }

  try {
    // jwt.verify re-computes the signature with the server's secret and
    // compares it to the signature on the token.  A tampered or expired
    // token throws an exception.
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // e.g. { sub: 1, username: 'alice', iat: ..., exp: ... }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid or expired token' });
  }
}

module.exports = requireAuth;
