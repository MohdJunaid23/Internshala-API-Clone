const { catchAsyncError } = require("../middlewares/HandleAsyncErrors");
const EmployerModel = require("../models/employerModel");
const InternshipModel = require("../models/internshipModel");
const jobModel = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/Nodemailer");
const { sendToken } = require("../utils/SendToken");
const imagekit = require("../utils/ImageKit").initimagekit();
const path = require("path");

exports.homepage = catchAsyncError(async (req, res, next) => {
    res.json({ message: "EMPLOYER HOMEPAGE" });
});

exports.currentEmployer = catchAsyncError(async (req, res, next) => {
    const employer = await EmployerModel.findById(req._id);
    res.json({employer});
});

exports.employersignup = catchAsyncError(async (req, res, next) => {
    // const employer = {
    //     email: req.body.email,
    //     password: req.body.password
    // };
    // const newemployer = await EmployerModel(employer).save();
    // res.status(201).json({ newemployer });
    const employer = await EmployerModel(req.body).save();
    sendToken(employer, 201, res);
});

exports.employersignin = catchAsyncError(async (req, res, next) => {
    const employer = await EmployerModel.findOne({ email: req.body.email }).select("+password");
    if (!employer) return next(new ErrorHandler("Employer Not Found!", 404));
    const isMatch = employer.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credentials!", 401));
    sendToken(employer, 200, res);
});

exports.employersignout = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout Successfully!" });
});

exports.employerforget = catchAsyncError(async (req, res, next) => {
    const employer = await EmployerModel.findOne({ email: req.body.email });
    if (!employer) return next(new ErrorHandler("Employer Not Found!", 404));
    const url = `${req.protocol}://${req.get("host")}/employer/forget/${employer._id}`;
    sendmail(req, res, next, url);
    employer.resetToken = "1"
    await employer.save();
    res.status(200).json({ employer, url });
});

exports.employerforgetlink = catchAsyncError(async (req, res, next) => {
    const employer = await EmployerModel.findById(req.params.id);
    if (!employer) return next(new ErrorHandler("Employer Not Found!", 404));
    
    if (employer.resetToken == "1") {
        employer.password = req.body.password
        employer.resetToken = "0";
        await employer.save();
    } else {
        return next(new ErrorHandler("Link Expired or Invalid!", 500));
    }
    res.status(200).json({ message: "Password Changed Successfully!" });
});

exports.employerresetlink = catchAsyncError(async (req, res, next) => {
    const employer = await EmployerModel.findById(req.params.id);
        employer.password = req.body.password
    await employer.save();
    sendToken(employer, 200, res);
});

exports.employerupdate = catchAsyncError(async (req, res, next) => {
    const employer = await EmployerModel.findByIdAndUpdate(req.params.id,req.body);
    await employer.save();
    res.status(200).json({
        message: "Employer Updated Successfully!",
        employer
    });
});

exports.employerlogo = catchAsyncError(async (req, res, next) => {
    const employer = await EmployerModel.findById(req.params.id);
    const file = req.files.logo
    const ModifiedFileName= `Resumebuilder-${Date.now()}${path.extname(file.name)}`
    if (employer.logo.fileId !== "") {
        await imagekit.deleteFile(employer.logo.fileId);
    };
    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: ModifiedFileName,
    });
    employer.logo = { fileId, url };
    await employer.save();
    res.status(200).json({
        success: true,
        message: "Logo Updated Successfully!"
    });
});

exports.createinternship = catchAsyncError(async (req, res, next) => {
    const loggedInEmployer = await EmployerModel.findById(req._id);
    if (!loggedInEmployer) return next(new ErrorHandler("Employer Not Found!", 404));
    const internship = await InternshipModel(req.body).save();
    internship.creator = loggedInEmployer._id;
    loggedInEmployer.internships.push(internship._id);
    await internship.save();
    await loggedInEmployer.save();
    res.status(201).json({
        message: "Internship Created Successfully!",
        internship
    });
});

exports.readinternships = catchAsyncError(async (req, res, next) => {
    const {internships} = await EmployerModel.findById(req._id).populate("internships");
    res.status(200).json({
        message: "Internships fetched Successfully!",
        internships
    });
});

exports.readinternship = catchAsyncError(async (req, res, next) => {
    const internship = await InternshipModel.findById(req.params.id).exec();
    res.status(200).json({
        message: "Internship fetched Successfully!",
        internship
    });
});

exports.createjob = catchAsyncError(async (req, res, next) => {
    const loggedInEmployer = await EmployerModel.findById(req._id);
    if (!loggedInEmployer) return next(new ErrorHandler("Employer Not Found!", 404));
    const job = await jobModel(req.body).save();
    job.creator = loggedInEmployer._id;
    loggedInEmployer.jobs.push(job._id);
    await job.save();
    await loggedInEmployer.save();
    res.status(201).json({
        message: "Job Created Successfully!",
        job
    });
});

exports.readjobs = catchAsyncError(async (req, res, next) => {
    const {jobs} = await EmployerModel.findById(req._id).populate("jobs");
    res.status(200).json({
        message: "Jobs fetched Successfully!",
        jobs
    });
});

exports.readjob = catchAsyncError(async (req, res, next) => {
    const job = await jobModel.findById(req.params.id).exec();
    res.status(200).json({
        message: "job fetched Successfully!",
        job
    });
});