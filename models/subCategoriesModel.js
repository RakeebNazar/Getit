const mongoose = require("mongoose");

//subCategories are, MobilePhone--> cases, accessroies, PhoneCases
// dresses --> tshirt,frock etc
const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "subCategory must have a name!"],
  },
});

const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;
