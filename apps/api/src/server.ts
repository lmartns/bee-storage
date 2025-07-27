import { app } from "./app";
import { AppDataSource } from "./infrastructure/database/data-source";

const port = process.env.PORT || 3333;

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
