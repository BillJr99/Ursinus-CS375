# Node JWT MVC Example

A minimal Model-View-Controller (MVC) web service in node.js/Express with
JSON Web Token (JWT) authentication, for CS375 Software Engineering.

## Layout (who does what)

```
server.js                    entry point: wires routers to URL prefixes
routes/
  authRoutes.js              URL + verb -> controller function
  noteRoutes.js              (notes routes pass through requireAuth first)
middleware/
  authMiddleware.js          verifies the JWT, populates req.user
controllers/
  authController.js          unpack request -> call model -> choose response
  noteController.js
models/
  userModel.js               the ONLY files that touch the data store
  noteModel.js               (a JSON file here; swap in SQL without
                              changing routes or controllers)
data/                        created automatically on first write
```

The "view" in this example is the JSON the controllers send back; a
browser front end or the EJS templates of the `DatabaseMVCExample` would
slot in without changing the models.

## Run it

```
npm install
JWT_SECRET="pick-a-long-random-string" node server.js
```

The `JWT_SECRET` environment variable is the key the server uses to sign
and verify tokens.  If you omit it, the code falls back to a hard-coded
development-only value (`dev-secret-change-me`) so the example runs out of
the box -- but anyone who knows that default could forge tokens, so set a
real secret (and keep it out of source control, e.g. in a `.env` file or
your deployment platform's secrets settings) anywhere beyond your own
laptop.

## Try it

Register, log in (capturing the token), and use the token:

```
curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "alice", "password": "s3cret"}'

curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "alice", "password": "s3cret"}'
# -> {"token": "eyJhbGciOi..."}

TOKEN=paste-the-token-here

curl http://localhost:3000/notes -H "Authorization: Bearer $TOKEN"

curl -X POST http://localhost:3000/notes \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"text": "MVC + JWT works!"}'
```

Then try it **without** the header, or with a letter of the token changed,
and observe the 401 from the middleware.
