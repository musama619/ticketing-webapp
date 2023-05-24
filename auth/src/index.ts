import express from "express";
import { json } from "body-parser";
import 'express-async-errors'
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";

const app = express();
app.use(json());

app.use(signinRouter);
app.use(signupRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

app.all("*", async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
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
