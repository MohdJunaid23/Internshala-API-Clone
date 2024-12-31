const express = require("express");
const { resume,
    studentaddeducation,
    studentediteducation,
    studentdeleteeducation,
    studentaddjob,
    studenteditjob,
    studentdeletejob,
    studentaddintern,
    studenteditintern,
    studentdeleteintern,
    studentaddresponse,
    studenteditresponse,
    studentdeleteresponse,
    studentaddcourse,
    studenteditcourse,
    studentdeletecourse,
    studentaddproject,
    studenteditproject,
    studentdeleteproject,
    studentaddskill,
    studenteditskill,
    studentdeleteskill,
    studentaddaccomplish,
    studenteditaccomplish,
    studentdeleteaccomplish} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /resume
router.get("/",isAuthenticated, resume);

// POST /add-education
router.post("/add-education",isAuthenticated, studentaddeducation);

// POST /edit-education/:eduid
router.post("/edit-education/:eduid",isAuthenticated, studentediteducation);

// POST /delete-education/:eduid
router.post("/delete-education/:eduid",isAuthenticated, studentdeleteeducation);

// POST /add-job
router.post("/add-job",isAuthenticated, studentaddjob);

// POST /edit-job/:jobid
router.post("/edit-job/:jobid",isAuthenticated, studenteditjob);

// POST /delete-job/:jobid
router.post("/delete-job/:jobid",isAuthenticated, studentdeletejob);

// POST /add-intern
router.post("/add-intern",isAuthenticated, studentaddintern);

// POST /edit-intern/:internid
router.post("/edit-intern/:internid",isAuthenticated, studenteditintern);

// POST /delete-intern/:internid
router.post("/delete-intern/:internid",isAuthenticated, studentdeleteintern);

// POST /add-response
router.post("/add-response",isAuthenticated, studentaddresponse);

// POST /edit-response/:responseid
router.post("/edit-response/:responseid",isAuthenticated, studenteditresponse);

// POST /delete-response/:responseid
router.post("/delete-response/:responseid",isAuthenticated, studentdeleteresponse);

// POST /add-course
router.post("/add-course",isAuthenticated, studentaddcourse);

// POST /edit-course/:courseid
router.post("/edit-course/:courseid",isAuthenticated, studenteditcourse);

// POST /delete-course/:courseid
router.post("/delete-course/:courseid",isAuthenticated, studentdeletecourse);

// POST /add-project
router.post("/add-project",isAuthenticated, studentaddproject);

// POST /edit-project/:projectid
router.post("/edit-project/:projectid",isAuthenticated, studenteditproject);

// POST /delete-project/:projectid
router.post("/delete-project/:projectid",isAuthenticated, studentdeleteproject);

// POST /add-skill
router.post("/add-skill",isAuthenticated, studentaddskill);

// POST /edit-skill/:skillid
router.post("/edit-skill/:skillid",isAuthenticated, studenteditskill);

// POST /delete-skill/:skillid
router.post("/delete-skill/:skillid",isAuthenticated, studentdeleteskill);

// POST /add-accomplish
router.post("/add-accomplish",isAuthenticated, studentaddaccomplish);

// POST /edit-accomplish/:accomplishid
router.post("/edit-accomplish/:accomplishid",isAuthenticated, studenteditaccomplish);

// POST /delete-accomplish/:accomplishid
router.post("/delete-accomplish/:accomplishid",isAuthenticated, studentdeleteaccomplish);

module.exports = router;