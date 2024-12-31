require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();


//LOGGER
const logger = require("morgan");
app.use(logger("tiny"));

//BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//SESSION & COOKIES
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(cookieParser());

//DB CONNECTION
require("./models/database").databaseConnection();

//EXPRESS FILE UPLOAD
const Uploader = require("express-fileupload");
app.use(Uploader());

//ROUTES
app.use("/user", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employer", require("./routes/employerRoutes"));

//ERROR HANDLING
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedError } = require("./middlewares/errors");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL not found! ${req.url}`, 404));
});
app.use(generatedError);


app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`));