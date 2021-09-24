"use strict";
// const crypto = require('crypto');
const mongoose = require("mongoose");

// const bcrypt = require('bcryptjs');

//this discount is only for new user and special discount, so always create this disocunt coupon with Nu at front.
//so we can distinguish the discount with product speccifc discount and special/newUser discount.
//no product specifc disocunt given, pretty hard --> we have to cereate product specifc discount for shortSleeve/LongSleeve/iphone Case/SamsungCase/ (previewDetail)
//and Own Product Disocunt - laptops created by me. // add this  as feature in future.
var discountSchema = new mongoose.Schema({
  coupon: {
    type: String,
  },

  isActive: {
    type: boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["newUser", "special"],
    required: "A coupon should have a type",
  },
  discount: {
    //percentage
    type: String,
    required: "A coupon should have a discount",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expireDate: {
    type: Date,
  },
});

const discount = mongoose.model("discount", discountSchema);
// var test = mongoose.model("Test", Test);

// (async function () {
//   var doc = new test({
//     name: "john",
//     followThem: [{ id: "61253bccb7ec5edfcfd2b5ff", status: "friends" }],
//   });
//   await doc.save();
//   console.log(await test.find({}));
// })();

module.exports = discount;
