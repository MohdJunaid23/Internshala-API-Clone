const express = require("express");
const { homepage,studentsignup,studentsignin,studentsignout,currentUser,studentforget,studentforgetlink,studentresetlink,studentupdate,studentavatar,applyinternship,applyjob } = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /homepage
router.get("/",isAuthenticated, homepage);

// POST /student
router.post("/student",isAuthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// GET /student/signout
router.get("/student/signout",isAuthenticated, studentsignout);

// POST /student/forget/send-mail
router.post("/student/forget/send-mail", studentforget);

// GET /student/forget/:id
router.get("/student/forget/:id", studentforgetlink);

// POST /student/reset/:id
router.post("/student/reset/:id",isAuthenticated, studentresetlink);

// POST /student/update/:id
router.post("/student/update/:id",isAuthenticated, studentupdate);

// POST /student/avatar/:id
router.post("/student/avatar/:id",isAuthenticated, studentavatar);

//------------------APPLY INTERNSHIP--------------------

// POST /student/apply/internship/:internid
router.post("/student/apply/internship/:internid",isAuthenticated,applyinternship);

//------------------APPLY JOB--------------------

// POST /student/apply/internship/:internid
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob);

module.exports = router;