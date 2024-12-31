const { catchAsyncError } = require("../middlewares/HandleAsyncErrors");
const StudentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncError(async (req, res, next) => {
    const { resume } = await StudentModel.findById(req._id);
    res.json({ message:"SECURE RESUME PAGE",resume });
});

exports.studentaddeducation = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    student.resume.education.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({ message: "EDUCATION ADDED!" });
});

exports.studentediteducation = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid);
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "EDUCATION UPDATED!" });
});

exports.studentdeleteeducation = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const filteredEducation = student.resume.education.filter((i) => i.id !== req.params.eduid);
    student.resume.education = filteredEducation;
    await student.save();
    res.json({ message: "EDUCATION DELETED!" });
});

exports.studentaddjob = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    student.resume.jobs.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({ message: "JOB DETAILS ADDED!",student });
});

exports.studenteditjob = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const jobIndex = student.resume.jobs.findIndex((i) => i.id === req.params.jobid);
    student.resume.jobs[jobIndex] = {
        ...student.resume.jobs[jobIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "JOB DETAILS UPDATED!" });
});

exports.studentdeletejob = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const filteredjob = student.resume.jobs.filter((i) => i.id !== req.params.jobid);
    student.resume.jobs = filteredjob;
    await student.save();
    res.json({ message: "JOB DETAILS DELETED!" });
});

exports.studentaddintern = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    student.resume.internships.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({ message: "INTERNSHIP DETAILS ADDED!",student });
});

exports.studenteditintern = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const internIndex = student.resume.internships.findIndex((i) => i.id === req.params.internid);
    student.resume.internships[internIndex] = {
        ...student.resume.internships[internIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "INTERNSHIP DETAILS UPDATED!" });
});

exports.studentdeleteintern = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const filteredintern = student.resume.internships.filter((i) => i.id !== req.params.internid);
    student.resume.internships = filteredintern;
    await student.save();
    res.json({ message: "INTERNSHIP DETAILS DELETED!" });
});

exports.studentaddresponse = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    student.resume.responsibilities.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({ message: "RESPONSIBILITIES DETAILS ADDED!",student });
});

exports.studenteditresponse = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const responseIndex = student.resume.responsibilities.findIndex((i) => i.id === req.params.responseid);
    student.resume.responsibilities[responseIndex] = {
        ...student.resume.responsibilities[responseIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "RESPONSIBILITIES DETAILS UPDATED!" });
});

exports.studentdeleteresponse = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const filteredresponse = student.resume.responsibilities.filter((i) => i.id !== req.params.responseid);
    student.resume.responsibilities = filteredresponse;
    await student.save();
    res.json({ message: "RESPONSIBILITIES DETAILS DELETED!" });
});

exports.studentaddcourse = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    student.resume.courses.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({ message: "COURSE DETAILS ADDED!",student });
});

exports.studenteditcourse = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const courseIndex = student.resume.courses.findIndex((i) => i.id === req.params.courseid);
    student.resume.courses[courseIndex] = {
        ...student.resume.courses[courseIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "COURSE DETAILS UPDATED!" });
});

exports.studentdeletecourse = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const filteredcourse = student.resume.courses.filter((i) => i.id !== req.params.courseid);
    student.resume.courses = filteredcourse;
    await student.save();
    res.json({ message: "COURSE DETAILS DELETED!" });
});

exports.studentaddproject = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    student.resume.projects.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({ message: "PROJECT DETAILS ADDED!",student });
});

exports.studenteditproject = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const projectIndex = student.resume.projects.findIndex((i) => i.id === req.params.projectid);
    student.resume.projects[projectIndex] = {
        ...student.resume.projects[projectIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "PROJECT DETAILS UPDATED!" });
});

exports.studentdeleteproject = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const filteredproject = student.resume.projects.filter((i) => i.id !== req.params.projectid);
    student.resume.projects = filteredproject;
    await student.save();
    res.json({ message: "PROJECT DETAILS DELETED!" });
});

exports.studentaddskill = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    student.resume.skills.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({ message: "SKILL DETAILS ADDED!",student });
});

exports.studenteditskill = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const skillIndex = student.resume.skills.findIndex((i) => i.id === req.params.skillid);
    student.resume.skills[skillIndex] = {
        ...student.resume.skills[skillIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "SKILL DETAILS UPDATED!" });
});

exports.studentdeleteskill = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const filteredskill = student.resume.skills.filter((i) => i.id !== req.params.skillid);
    student.resume.skills = filteredskill;
    await student.save();
    res.json({ message: "SKILL DETAILS DELETED!" });
});

exports.studentaddaccomplish = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    student.resume.accomplishments.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({ message: "ACCOMPLISHMENTS DETAILS ADDED!",student });
});

exports.studenteditaccomplish = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const accomplishIndex = student.resume.accomplishments.findIndex((i) => i.id === req.params.accomplishid);
    student.resume.accomplishments[accomplishIndex] = {
        ...student.resume.accomplishments[accomplishIndex],
        ...req.body
    };
    await student.save();
    res.json({ message: "ACCOMPLISHMENTS DETAILS UPDATED!" });
});

exports.studentdeleteaccomplish = catchAsyncError(async (req, res, next) => {
    const student = await StudentModel.findById(req._id);
    const filteredaccomplish = student.resume.accomplishments.filter((i) => i.id !== req.params.accomplishid);
    student.resume.accomplishments = filteredaccomplish;
    await student.save();
    res.json({ message: "ACCOMPLISHMENTS DETAILS DELETED!" });
});