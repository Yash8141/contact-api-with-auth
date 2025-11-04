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
        Contact: {
          type: "object",
          required: ["name", "email", "phone", "type"],
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
              description: "Contact's unique identifier",
            },
            name: {
              type: "string",
              example: "John Doe",
              description: "Contact's full name",
            },
            email: {
              type: "string",
              example: "john@gmail.com",
              description: "Contact's email address",
            },
            phone: {
              type: "string",
              example: "1234567890",
              description: "Contact's phone number",
            },
            type: {
              type: "string",
              enum: ["Personal", "Professional"],
              example: "Personal",
              description: "Contact type (Personal or Professional)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-10-18T10:30:45.123Z",
              description: "Contact creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time", 
              example: "2025-10-18T10:30:45.123Z",
              description: "Contact last update timestamp",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            success: {
              type: "boolean",
              example: false,
              description: "Request success status",
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
