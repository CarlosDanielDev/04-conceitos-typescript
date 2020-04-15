import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function helloWorld(req: Request, res: Response) {
  return res.json({ message: "Hello World" });
}

export function user(req: Request, res: Response) {
  const user = createUser({
    name: "Daniel",
    email: "danphp7@gmail.com",
    password: "1234567",
    techs: ["Javascript", { title: "React", experience: 100 }],
  });

  return res.json(user);
}
