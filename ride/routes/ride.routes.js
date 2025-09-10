const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const rideController = require("../controller/ride.controller");

/**
 * @swagger
 * /ride/create-ride:
 *   post:
 *     summary: Create a new ride request
 *     tags: [Ride]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup
 *               - destination
 *             properties:
 *               pickup:
 *                 type: string
 *                 description: Pickup location address
 *               destination:
 *                 type: string
 *                 description: Destination location address
 *     responses:
 *       200:
 *         description: Ride created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.post("/create-ride", authMiddleware.userAuth, rideController.createRide);

/**
 * @swagger
 * /ride/accept-ride:
 *   put:
 *     summary: Accept a ride request
 *     tags: [Ride]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ride to accept
 *     responses:
 *       200:
 *         description: Ride accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       404:
 *         description: Ride not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.put(
  "/accept-ride",
  authMiddleware.captainAuth,
  rideController.acceptRide
);

module.exports = router;
