const mongoose = require("mongoose");

const jobModel = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "employers" },
    applicants:[{type:mongoose.Schema.Types.ObjectId,ref:"students"}],
    title: String,
    skill:String,
    jobtype: {
        type: String,
        enum:["In office","Remote"],
    },
    openings: Number,
    description: String,
    preferences: String,
    salary: Number,
    perks: String,
    assessments:String,
  
}, { timestamps: true});


const Job = mongoose.model("jobs",jobModel);
module.exports = Job;