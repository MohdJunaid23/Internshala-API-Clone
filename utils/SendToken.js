const { catchAsyncError } = require("../middlewares/HandleAsyncErrors");

exports.sendToken = catchAsyncError(async(student, statusCode, res) => {
    const token = student.getjwttoken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 1000 * 60 * 60 * 24
        ),
        httpOnly: true,
        // secure:true
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        id: student._id,
        token
    });
});