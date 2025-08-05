const aiService = require("../services/ai.service").default;

module.exports.getReview = async (req, res) => {
  console.log("Received request");
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);

  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is undefined" });
    }

    const { code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ error: "Code is required in the request body" });
    }

    const response = await aiService(code);

    res.json({ review: response });
  } catch (error) {
    console.error("Error in getReview:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
