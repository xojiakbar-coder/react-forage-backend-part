import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API Backend",
      version: "1.0.0",
      description: "Oddiy Node.js API uchun Swagger hujjat",
    },
    servers: [
      {url: "https://react-forage-backend-inimitable.vercel.app"},
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec };
