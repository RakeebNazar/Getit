"use strict";
// const crypto = require('crypto');
const mongoose = require("mongoose");

// const bcrypt = require('bcryptjs');

var discountSchema = new mongoose.Schema({
  coupon: {
    type: String,
  },
  userId: {
    //follower should be a user/artist
    type: mongoose.Schema.ObjectId,
    ref: "User",
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (bio) {
        return this.type === "newUser";
      },
      message: "neUser coupon should be tied with a User",
    },
    //check weather the followThem id is artist or not. if not thn throw error,
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
    //create unique discount prices for unique tshirts,cases. e.g mobile phone cases, long sleeve tshirts
    type: Number,
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
