exports.generatedError = (err, req, res, next) => {
    if (err.name === "MongoServerError" && err.message.includes("E11000 duplicate key error")) {
        err.message = "Student already exists!"
    };

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        errName: err.name,
        stack: err.stack
    });
};