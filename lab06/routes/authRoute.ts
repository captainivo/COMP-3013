
import express, { Request, Response, NextFunction } from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();


router.get("/login", forwardAuthenticated, function (req: Request, res: Response) {
  const error = req.query.error as string | undefined;
  res.render("login", { error });
});


router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Pass error message to login page
        return res.redirect(`/auth/login?error=${encodeURIComponent(info?.message || "Login failed")}`);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  }
);

router.get("/logout", (req: express.Request, res: express.Response) => {
  req.logout((err: unknown) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
