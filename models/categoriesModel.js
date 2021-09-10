const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  subCategories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "subCategories",
    },
  ],
});

const category = mongoose.model("category", categorySchema);

module.exports = category;
