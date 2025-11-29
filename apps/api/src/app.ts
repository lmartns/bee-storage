import express from "express";
import "reflect-metadata";
import { userRoutes } from "./infrastructure/http/routes/user.routes";
import { fileRoutes } from "./infrastructure/http/routes/file.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/files", fileRoutes)

export { app };
