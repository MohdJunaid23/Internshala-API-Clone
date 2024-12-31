const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: [2, "Firstname should contain atleast 2 characters!"],
        maxLength: [10, "Firstname should not exceeds 10 characters!"]
    },
    lastname: {
        type: String,
        required: true,
        minLength: [2, "Lastname should contain atleast 2 characters!"],
        maxLength: [10, "Lastname should not exceeds 10 characters!"]
    },
    city: {
        type: String,
        required: true,
        minLength: [3, "City should contain atleast 2 characters!"],
        maxLength: [10, "City should not exceeds 10 characters!"]
    },
    contact: {
        type: String,
        required: true,
        minLength: [10, "Contact should contain atleast 10 characters!"],
        maxLength: [10, "Contact should not exceeds 10 characters!"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Student with this email address already exists!"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "Password should contain atleast 4 characters!"],
        maxLength: [13, "Password should not exceeds 13 characters!"],
        select: false,
        // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Special/Numbers/capital"]
    },
    resetToken: {
        type: String,
        default:"0"
    },
    avatar: {
        type: Object,
        default: {
            fileId: '',
            url:"https://cdn-icons-png.flaticon.com/512/4537/4537019.png"
        },
    },
    resume: {
        education: [],
        jobs: [],
        internships: [],
        responsibilities: [],
        courses: [],
        projects: [], 
        skills: [],
        accomplishments:[],
    },
    internships: [{
        type: mongoose.Schema.Types.ObjectId,ref:"internships"
    }],
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,ref:"jobs"
    }],
}, { timestamps: true});

studentModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

studentModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const Student = mongoose.model("students",studentModel);
module.exports = Student;