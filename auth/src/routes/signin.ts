import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import User from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

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

        res.send("called!");
    }
);

export { router as signinRouter };