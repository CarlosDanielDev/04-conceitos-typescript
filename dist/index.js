"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
var app = express_1.default();
var user = CreateUser_1.default({
    name: "Daniel",
    email: "danphp7@gmail.com",
    password: "1234567",
    techs: ["Javascript", { title: "React", experience: 100 }],
});
app.get("/user", function (req, res) {
    return res.json(user);
});
app.get("/", routes_1.helloWorld);
app.listen(3333);
