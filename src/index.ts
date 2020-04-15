import express from "express";
import { helloWorld, user } from "./routes";
const app = express();

app.get("/user", user);

app.get("/", helloWorld);

app.listen(3333);
