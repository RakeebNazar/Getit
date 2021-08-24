// const path = require("path");
const express = require("express");
// const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
// const hpp = require("hpp");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const compression = require("compression");
// const cors = require("cors");

// const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controllers/errorController");

//routes
// const tourRouter = require("./routes/tourRoutes");

// const viewRouter = require("./routes/viewRoutes");

// Start express app5555555555555555555555555555555555555555555555555555555555555555555
const app = express();

// app.enable("trust proxy");

// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
// app.use(cors());

// app.options("*", cors());
// // app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(`${__dirname}public`));

// Set security HTTP headers
// app.use(helmet());

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

//Json body parser,cookie parser and data limiter
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(cookieParser());

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// // Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       "duration",
//       "ratingsQuantity",
//       "ratingsAverage",
//       "maxGroupSize",
//       "difficulty",
//       "price",
//     ],
//   })
// );

// app.use(compression());

// 3) ROUTES
app.use("/", function (req, res) {
  res.send("chumma");
});
// app.use("/api/v1/tours", tourRouter);

//app all means every other requests get/post etc.. * means every other routes
app.all("*", (req, res, next) => {
  res.send("Nothing Here, welya poda ayogya raaskal");
  //   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
