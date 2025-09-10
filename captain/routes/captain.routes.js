const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /captain/register:
 *   post:
 *     summary: Register a new captain (driver)
 *     tags: [Captain]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - licenseNumber
 *             properties:
 *               name:
 *                 type: string
 *                 description: Captain's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Captain's email address
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Captain's password
 *               licenseNumber:
 *                 type: string
 *                 description: Driver license number
 *     responses:
 *       200:
 *         description: Captain registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                 newCaptain:
 *                   $ref: '#/components/schemas/Captain'
 *       400:
 *         description: Captain already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.post("/register", captainController.register);

/**
 * @swagger
 * /captain/login:
 *   post:
 *     summary: Login captain
 *     tags: [Captain]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Captain's email address
 *               password:
 *                 type: string
 *                 description: Captain's password
 *     responses:
 *       200:
 *         description: Captain logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                 captain:
 *                   $ref: '#/components/schemas/Captain'
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.post("/login", captainController.login);

/**
 * @swagger
 * /captain/logout:
 *   get:
 *     summary: Logout captain
 *     tags: [Captain]
 *     responses:
 *       200:
 *         description: Captain logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Captain logged out successfully
 *       500:
 *         description: Internal server error
 */
router.get("/logout", captainController.logout);

/**
 * @swagger
 * /captain/profile:
 *   get:
 *     summary: Get captain profile
 *     tags: [Captain]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Captain profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Captain'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get("/profile", authMiddleware.captainAuth, captainController.profile);

/**
 * @swagger
 * /captain/toggle-availability:
 *   patch:
 *     summary: Toggle captain availability status
 *     tags: [Captain]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Availability status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Availability status updated
 *                 isAvailable:
 *                   type: boolean
 *                   description: Current availability status
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/toggle-availability",
  authMiddleware.captainAuth,
  captainController.toggleAvailability
);

/**
 * @swagger
 * /captain/new-ride:
 *   get:
 *     summary: Wait for new ride requests (long polling)
 *     tags: [Captain]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: New ride request received
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       204:
 *         description: No new ride requests within timeout period
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get(
  "/new-ride",
  authMiddleware.captainAuth,
  captainController.waitForNewRide
);

module.exports = router;
