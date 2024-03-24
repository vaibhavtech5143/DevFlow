import mongoose from "mongoose";

let isConnected:boolean = false;

export const connectToDatabase = async() => {
    mongoose.set("strictQuery",true);

if(!process.env.NEXT_SECRET_MONGO_URI){

    return console.log("MISSING MONGO URL",process.env.NEXT_SECRET_MONGO_URI);
}

if(isConnected){
    return console.log("MongoDB is already connected",process.env.NEXT_SECRET_MONGO_URI);
}

try {
    await mongoose.connect(process.env.NEXT_SECRET_MONGO_URI,{
        dbName:"DevFlow"
    })
    isConnected= true;
    console.log("Successfully connected ",process.env.NEXT_SECRET_MONGO_URI)
} catch (error) {
    return error;
}
}
