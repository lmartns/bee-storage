import { app } from "./app";
import { AppDataSource } from "./infrastructure/database/data-source";
import bodyParser from "body-parser";
import swaggerFile from "../swagger-output.json";
import "dotenv/config";
import { apiReference } from "@scalar/express-api-reference";

const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(
  "/reference",
  apiReference({
    content: swaggerFile,
  }),
);

AppDataSource.initialize()
  .then(() => {
    console.log("Data source has been initialized");

    app.listen(port, () => {
      console.log(`API server listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during data source initialization", err);
  });
