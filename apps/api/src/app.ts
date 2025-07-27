import express from "express";
import "reflect-metadata";
import { userRoutes } from "./infrastructure/http/routes/user.routes";


const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "BeeStorage API is running" });
});

export { app };
