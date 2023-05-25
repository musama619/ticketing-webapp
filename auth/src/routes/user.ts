import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import User from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
    res.send("called!!");
});

router.post("/api/users/signin", (req, res) => {
    res.send("called!");
});

router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters"),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError("Email already exists");
        }

        const user = new User({
            email,
            password,
        });
        await user.save();
        res.status(201).send(user);
    }
);

router.post("/api/users/signout", (req, res) => {
    res.send("called!");
});

export { router as UserRoutes };