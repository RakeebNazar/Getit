const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "SubCategory must have a name!"],
  },
});

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

module.exports = SubCategory;
