"use strict";
// const crypto = require('crypto');
const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require('bcryptjs');

var followersSchema = new mongoose.Schema({
  _id: false,
  user: {
    //followeing shoul be a normal user/artist
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "FollwingId can not be empty!"],
    //check weather the followThem id is artist or not. if not thn throw error,
  },
  followers: [
    //indha followersId yara yara follow panraru. endha endha artist a
    //followers should be a artist
    //to get the count of tghe followers, create a virtuals data on scehama. in that virtual data function, count all the followers  this.followers.length();
    {
      _id: false,
      followerId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",

        //followerdby
      },
      status: {
        type: Number,
        enums: [
          0, //requested
          1, //accepted/follower/remove,
        ],
      },
      minItems: 0,
      maxItems: 1000,
      description: "A Artist cannot have more then 1000 followers",
    },
  ],
});

const followers = mongoose.model("followers", followersSchema);
// var test = mongoose.model("Test", Test);

// (async function () {
//   var doc = new test({
//     name: "john",
//     followThem: [{ id: "61253bccb7ec5edfcfd2b5ff", status: "friends" }],
//   });
//   await doc.save();
//   console.log(await test.find({}));
// })();

module.exports = followers;
