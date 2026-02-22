const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: String,
    code: String,
    review: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);