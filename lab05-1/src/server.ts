import express from "express";
import path from "node:path";
import morgan from "morgan";
import session from "express-session";
import { addTip, dislike, getTips, like, remove, search } from "./data";

import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: string;
  }
}

const app = express();
const PORT = 3001;

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET ?? "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

function requireLogin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  next();
}

app.get("/", requireLogin, (req, res) => {
  const tips = getTips(req.session!.user!);
  console.log(req.session!.user);
  res.render("index", { tips, user: req.session!.user });
});

app.get("/login", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method="POST" action="/login">
      <div>
        <label for="username">User name:</label><br>
        <input type="text" id="username" name="username" required>
      </div>
      <div>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  const isValidUser = search(username ?? "", password ?? "");
  if (!isValidUser) return res.redirect("/login");

  req.session!.user = username!;
  req.session.save(() => res.redirect("/"));
  console.log(req.session.user);
});

app.post("/tips", (req, res) => {
  const { text } = req.body;
  if (text) {
    addTip(text, req.session!.user!);
  }
  res.redirect("/");
});

app.post("/tips/:id/like", (req, res) => {
  const id = req.params.id;
  like(id, req.session!.user!);
  res.redirect("/");
});

app.post("/tips/:id/dislike", (req, res) => {
  const id = req.params.id;
  dislike(id, req.session!.user!);
  res.redirect("/");
});

app.post("/tips/:id/delete", (req, res) => {
  const id = req.params.id;
  remove(id, req.session!.user!);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`\n🚀 http://localhost:${PORT}\n`);
});
