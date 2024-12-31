const { catchAsyncError } = require("../middlewares/HandleAsyncErrors");
const internshipModel = require("../models/internshipModel");
const StudentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/Nodemailer");
const { sendToken } = require("../utils/SendToken");
const imagekit = require("../utils/ImageKit").initimagekit();
const path = require("path");

exports.homepage = catchAsyncError(async (req, res, next) => {
    res.json({ message: "HOMEPAGE" });
});

exports.currentUser = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    res.json({student});
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
    // const student = {
    //     email: req.body.email,
    //     password: req.body.password
    // };
    // const newStudent = await StudentModel(student).save();
    // res.status(201).json({ newStudent });
    const student = await StudentModel(req.body).save();
    sendToken(student, 201, res);
});

exports.studentsignin = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findOne({ email: req.body.email }).select("+password");
    if (!student) return next(new ErrorHandler("Student Not Found!", 404));
    const isMatch = student.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credentials!", 401));
    sendToken(student, 200, res);
});

exports.studentsignout = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout Successfully!" });
});

exports.studentforget = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findOne({ email: req.body.email });
    if (!student) return next(new ErrorHandler("Student Not Found!", 404));
    const url = `${req.protocol}://${req.get("host")}/student/forget/${student._id}`;
    sendmail(req, res, next, url);
    student.resetToken = "1"
    await student.save();
    res.status(200).json({ student, url });
});

exports.studentforgetlink = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req.params.id);
    if (!student) return next(new ErrorHandler("Student Not Found!", 404));
    
    if (student.resetToken == "1") {
        student.password = req.body.password
        student.resetToken = "0";
        await student.save();
    } else {
        return next(new ErrorHandler("Link Expired or Invalid!", 500));
    }
    res.status(200).json({ message: "Password Changed Successfully!" });
});

exports.studentresetlink = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req.params.id);
        student.password = req.body.password
    await student.save();
    sendToken(student, 200, res);
});

exports.studentupdate = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findByIdAndUpdate(req.params.id,req.body);
    await student.save();
    res.status(200).json({
        message: "Student Updated Successfully!",
        student
    });
});

exports.studentavatar = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req.params.id);
    const file = req.files.avatar
    const ModifiedFileName= `Resumebuilder-${Date.now()}${path.extname(file.name)}`
    if (student.avatar.fileId !== "") {
        await imagekit.deleteFile(student.avatar.fileId);
    };
    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: ModifiedFileName,
    });
    student.avatar = { fileId, url };
    await student.save();
    res.status(200).json({
        success: true,
        message: "Avatar Updated Successfully!"
    });
});

exports.applyinternship = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const appliedInternship = await internshipModel.findById(req.params.internid);
    student.internships.push(appliedInternship._id);
    appliedInternship.applicants.push(student._id);
    await student.save();
    await appliedInternship.save();
    res.json({student,appliedInternship});
});

exports.applyjob = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const appliedjob = await jobModel.findById(req.params.jobid);
    student.jobs.push(appliedjob._id);
    appliedjob.applicants.push(student._id);
    await student.save();
    await appliedjob.save();
    res.json({student,appliedjob});
});