const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  subCategories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "subCategories",
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
