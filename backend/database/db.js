const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
    console.log("DB");
    }
    catch(error){
        console.log("Database not connected "+error);
    }
}
module.exports=connectDB
