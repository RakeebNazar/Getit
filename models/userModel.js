// const crypto = require('crypto');
const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  joinedDate: { type: Date, default: Date.now() },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    select: false,
  },
  mobile: {
    type: String,
    unique: true,
    validate: [validator.isMobilePhone, "Please provide a valid mobile number"],
    select: false,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    select: false,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (passConfirm) {
        return passConfirm === this.password;
      },
      message: "Please Re-check the passwords!",
    },
    select: false,
  },

  passwordChangedAt: { type: Date, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  showEmail: {
    type: Boolean,
    default: false,
    select: false,
  },
  shippingAddress: {
    type: String,
  },
  showMobile: {
    //show mobile detatails or not
    type: Boolean,
    default: false,
    select: false,
  },
  active: {
    //deleted his account or not
    type: Boolean,
    default: true,
    select: false,
  },

  wishlist: [
    //use shift() in pre hook. if array.lenth() is 30. throw an errorr to user. do not unshift(). idhul 15+recentla 15+baesd on the categories of that 20.
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],

  recentlyViewd: [
    //use shift() in pre hook. if array.lenth() is 30. based on wish list and recently viewed products sub categoriesm show other products in home
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  //artist related data
  isArtist: Boolean,
  bio: {
    type: String,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (bio) {
        return this.isArtits;
      },
      message: "You are not a artist",
    },
  },
  socialMedia: [
    {
      type: String,
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (bio) {
          return this.isArtits;
        },
        message: "You are not a artist",
      },
    },
  ],
  coverImage: {
    type: String,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (bio) {
        return this.isArtits;
      },
      message: "You are not a artist",
    },
  },
});

const user = mongoose.model("user", userSchema);
// var test = mongoose.model("Test", Test);

// (async function () {
//   var doc = new test({
//     name: "john",
//     followThem: [{ id: "61253bccb7ec5edfcfd2b5ff", status: "friends" }],
//   });
//   await doc.save();
//   console.log(await test.find({}));
// })();

module.exports = user;
