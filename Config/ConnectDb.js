import mongoose from "mongoose";
export const ConnectionDataBase =async()=>{
    try{
        const response =await mongoose.connect(process.env.Mongo_URL)
        if(response){
          return console.log("Database Connected successfully")
        }
        else{
            mongoose.connection.on('disconnected',()=>{
            return console.log("database disconnected")
        })
        }

    }catch(error){
        console.log("Error in connecting the database")
    }
}
