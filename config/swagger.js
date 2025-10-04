import swaggerJSDoc from "swagger-jsdoc";

const publicBaseURL =
  process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contact API Authentication",
      version: "1.0.0",
      description: "API documentation is useful to test api",
    },
    servers: [{ url: publicBaseURL }],
    schemas: {
      User: {
        type: "object",
        properties: {
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john@gmail.com" },
          password: { type: "string", example: "12345678" },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
