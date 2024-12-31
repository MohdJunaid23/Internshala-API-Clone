const express = require("express");
const { homepage,employersignup,employersignin,employersignout,currentEmployer,employerforget,employerforgetlink,employerresetlink,employerupdate,employerlogo,createinternship,readinternships,readinternship,createjob,readjobs,readjob } = require("../controllers/employerController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /homepage
router.get("/",isAuthenticated, homepage);

// POST /current
router.post("/current",isAuthenticated, currentEmployer);

// POST /signup
router.post("/signup", employersignup);

// POST /signin
router.post("/signin", employersignin);

// GET /signout
router.get("/signout",isAuthenticated, employersignout);

// POST /forget/send-mail
router.post("/forget/send-mail", employerforget);

// GET /forget/:id
router.get("/forget/:id", employerforgetlink);

// POST /reset/:id
router.post("/reset/:id",isAuthenticated, employerresetlink);

// POST /update/:id
router.post("/update/:id",isAuthenticated, employerupdate);

// POST /logo/:id
router.post("/logo/:id",isAuthenticated, employerlogo);

// -----------------INTERNSHIP------------------

// POST /internship/create
router.post("/internship/create",isAuthenticated, createinternship);

// POST /internship/read
router.post("/internship/read",isAuthenticated, readinternships);

// POST /internship/read/:id
router.post("/internship/read/:id",isAuthenticated, readinternship);

// -----------------JOB------------------

// POST /job/create
router.post("/job/create",isAuthenticated, createjob);

// POST /job/read
router.post("/job/read",isAuthenticated, readjobs);

// POST /job/read/:id
router.post("/job/read/:id",isAuthenticated, readjob);

module.exports = router;