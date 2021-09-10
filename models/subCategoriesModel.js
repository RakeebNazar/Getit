const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "subCategory must have a name!"],
  },
});

const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;
