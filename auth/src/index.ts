import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";
import { UserRoutes } from "./routes/user";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(UserRoutes);

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
