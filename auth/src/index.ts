import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { UserRoutes } from "./routes/user";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(UserRoutes);

app.all("*", async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {

    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }

    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }
};

app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
});

start();
