const mongoose=require("mongoose")

async function connectToDB(){
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database")
} catch (error) {
   console.log("database connection error:",error) 
}
}

module.exports=connectToDB