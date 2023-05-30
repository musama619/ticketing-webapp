import express, { Request, Response } from "express";
import { body } from "express-validator";
import User from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";
import bcrypt from "bcrypt";

const router = express.Router();

router.post(
    "/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password cannot be empty"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError("Invalid email or password");
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            throw new BadRequestError('Invalid password')
        }

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                emai: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);

    }
);

export { router as signinRouter };
