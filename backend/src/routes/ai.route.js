const express = require('express');
const aiController = require('../controllers/ai.controller')
const router = express.Router();

// Define the route for getting AI-generated code review
// This route will handle POST requests to "/get-response"
// It expects a JSON body with the code to be reviewed
// The aiController.getReview function will process the request and return the review
router.post("/get-response" , aiController.getReview )

module.exports = router;