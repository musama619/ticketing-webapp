import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
    res.send("called!!");
});

router.post("/api/users/signout", (req, res) => {
    res.send("called!");
});

export { router as UserRoutes };
