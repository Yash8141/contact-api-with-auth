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
              example: "690ccf52042932d2abb85c06",
              description: "Contact's unique identifier",
            },
            name: {
              type: "string",
              example: "Rohan Patel",
              description: "Contact's full name",
            },
            email: {
              type: "string",
              example: "rohan.patel@techhub.co.in",
              description: "Contact's email address",
            },
            phone: {
              type: "string",
              example: "9123456798",
              description: "Contact's phone number",
            },
            type: {
              type: "string",
              enum: ["Personal", "Professional"],
              example: "Professional",
              description: "Contact type (Personal or Professional)",
            },
            user: {
              type: "string",
              example: "690cce9b042932d2abb85bfa",
              description: "ID of the user who owns this contact",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-11-06T16:39:46.568Z",
              description: "Contact creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time", 
              example: "2025-11-06T16:39:46.568Z",
              description: "Contact last update timestamp",
            },
            __v: {
              type: "integer",
              example: 0,
              description: "MongoDB version key",
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
