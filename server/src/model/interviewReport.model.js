const mongoose =require ('mongoose')
/**
 * -job description schema -string
 * -resume text -string
 * -self description-string
 * -matchScore-number
 * 
 * -technical questions : [{
 *                         question: "",
 *                         intention:"",
 *                         answer:""
 *                            }]
 * -behavioral questions : [{
 *                         question: "",
 *                         intention:"",
 *                         answer:""
 *                            }]
 * -skill gaps:[{
 *            skill:"",
 *             severity:{
 *              type:sting,
 *              enum:['low','medium','high']  
 *              }           
 * }]
 * -preparation plan :[{
 *             day:number,
 * focus:string,
 * task:[string]
 *  }]
 */
const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
     intention:{
        type:String,
        required:[true,"Intention is required"]
     },
     answer:{
        type:String,
        required:[true,"Answer is required"]
     }
},{
    _id:false
})
const behavioralQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
     intention:{
        type:String,
        required:[true,"Intention is required"]
     },
     answer:{
        type:String,
        required:[true,"Answer is required"]
     }
},{
    _id:false
})
const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
}, {
    _id: false
})
const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "Task is required"]
    }]
})
const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"job description required"],
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
},
},{
    timestamps:true
})
const InterviewReportModel=mongoose.model("InterviewReport",interviewReportSchema);

module.exports=InterviewReportModel
