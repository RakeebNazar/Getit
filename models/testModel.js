"use strict";
// var obj1 = require("./second");
// var obj2 = require("./third");
// console.log(obj1);
// console.log(obj2);

// obj1.func();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Mine_Test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

var test = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name should be provided"],
    },
  },
  { collection: "Test" }
);

var user = mongoose.model("Test", test);

// (async function () {
//   var res = Movies.aggregate([{ $match: { release_date: { $gte: 1 } } }]);

//   console.log(await res.project({ name: 1 }));
// })();
