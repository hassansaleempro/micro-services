const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ride-Sharing Microservices API",
      version: "1.0.0",
      description:
        "A comprehensive API for ride-sharing application with microservices architecture",
      contact: {
        name: "API Support",
        email: "support@ridesharing.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User full name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "User password",
            },
          },
        },
        Captain: {
          type: "object",
          required: ["name", "email", "password", "licenseNumber"],
          properties: {
            _id: {
              type: "string",
              description: "Captain ID",
            },
            name: {
              type: "string",
              description: "Captain full name",
            },
            email: {
              type: "string",
              format: "email",
              description: "Captain email address",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Captain password",
            },
            licenseNumber: {
              type: "string",
              description: "Driver license number",
            },
            isAvailable: {
              type: "boolean",
              description: "Captain availability status",
            },
          },
        },
        Ride: {
          type: "object",
          required: ["pickup", "destination"],
          properties: {
            _id: {
              type: "string",
              description: "Ride ID",
            },
            user: {
              type: "string",
              description: "User ID who created the ride",
            },
            captain: {
              type: "string",
              description: "Captain ID who accepted the ride",
            },
            pickup: {
              type: "string",
              description: "Pickup location",
            },
            destination: {
              type: "string",
              description: "Destination location",
            },
            status: {
              type: "string",
              enum: ["pending", "accepted", "completed", "cancelled"],
              description: "Ride status",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Ride creation timestamp",
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
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "JWT authentication token",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Gateway",
        description: "API Gateway operations",
      },
      {
        name: "User",
        description: "User management operations",
      },
      {
        name: "Captain",
        description: "Captain (driver) management operations",
      },
      {
        name: "Ride",
        description: "Ride management operations",
      },
    ],
  },
  apis: [
    "../user/routes/*.js",
    "../captain/routes/*.js",
    "../ride/routes/*.js",
    "./app.js",
  ], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
