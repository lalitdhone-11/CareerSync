const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  generateInterviewReportController,
} = require("../controllers/interview.controller");
const upload=require("../middlewares/file.middleware")

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description Generate new interview report based on user's self description,
 * resume PDF and job description.
 * @access Private
 */
interviewRouter.post(
  "/",
  authMiddleware.authUser,upload.single("resume"),
  generateInterviewReportController
);

module.exports = interviewRouter;