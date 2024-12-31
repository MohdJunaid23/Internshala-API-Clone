const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncError } = require("./HandleAsyncErrors");


exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("Please login to access the resources!", 401));
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    
    req._id = id;
    next();
});