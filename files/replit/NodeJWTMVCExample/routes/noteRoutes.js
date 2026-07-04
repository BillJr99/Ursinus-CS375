// routes/noteRoutes.js -- maps note URLs to controller functions.
//
// Note the middleware chain: every request to /notes passes through
// requireAuth FIRST.  If the JWT is missing or invalid, the request is
// rejected there and the controller never runs.

const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/authMiddleware');
const noteController = require('../controllers/noteController');

router.get('/', requireAuth, noteController.listNotes);
router.post('/', requireAuth, noteController.createNote);

module.exports = router;
