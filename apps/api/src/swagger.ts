import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/infrastructure/http/routes/user.routes.ts"];

const doc = {
  info: {
    title: "API",
    description: "Documentation",
  },
  host: "localhost:3333",
  schemes: ["http"],
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
