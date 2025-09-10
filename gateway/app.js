const express = require("express");
const expressProxy = require("express-http-proxy");
const { swaggerUi, specs } = require("./swagger");

const app = express();

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Ride-Sharing API Documentation",
  })
);

// API Routes
app.use("/user", expressProxy("http://localhost:3001"));
app.use("/captain", expressProxy("http://localhost:3002"));
app.use("/ride", expressProxy("http://localhost:3003"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Gateway service is running" });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Gateway]
 *     responses:
 *       200:
 *         description: Gateway service is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Gateway service is running
 */

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Ride-Sharing Microservices API Gateway",
    version: "1.0.0",
    documentation: "/api-docs",
    health: "/health",
    services: {
      user: "/user",
      captain: "/captain",
      ride: "/ride",
    },
  });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Gateway information
 *     tags: [Gateway]
 *     responses:
 *       200:
 *         description: API Gateway information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ride-Sharing Microservices API Gateway
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 *                 documentation:
 *                   type: string
 *                   example: /api-docs
 *                 health:
 *                   type: string
 *                   example: /health
 *                 services:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: /user
 *                     captain:
 *                       type: string
 *                       example: /captain
 *                     ride:
 *                       type: string
 *                       example: /ride
 */

app.listen(3000, () => {
  console.log("Gateway server listening on port 3000");
  console.log("API Documentation available at: http://localhost:3000/api-docs");
});
