const mongoose = require("mongoose");

const internshipModel = mongoose.Schema({
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"employers"},
    applicants:[{type:mongoose.Schema.Types.ObjectId,ref:"students"}],
    profile: String,
    skill:String,
    internshiptype: {
        type: String,
        enum:["In office","Remote"],
    },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
        status: {
            type: String,
            enum:["Fixed","Negotiable","Performance based"],
        },
        amount:Number,
    },
    perks: String,
    assessments:String,
  
}, { timestamps: true});


const Internship = mongoose.model("internships",internshipModel);
module.exports = Internship;