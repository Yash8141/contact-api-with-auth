import swaggerJSDoc from "swagger-jsdoc";

const publicBaseURL =
  process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contact API Authentication",
      version: "1.0.0",
      description: "API documentation for testing api",
    },
    servers: [{ url: publicBaseURL }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "John Doe",
              description: "User's full name",
            },
            email: {
              type: "string",
              example: "john@gmail.com",
              description: "User's email address",
            },
            password: {
              type: "string",
              example: "12345678",
              minLength: 8,
              description: "User's password (minimum 8 characters)",
            },
          },
        },
        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "john@gmail.com",
              description: "User's email address",
            },
            password: {
              type: "string",
              example: "12345678",
              description: "User's password",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
