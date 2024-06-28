const mongoose = require("mongoose");
require('dotenv').config()

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        // await mongoose.connect(`${url}/${db}`)
        console.log("Connected to db");
    }
    catch(err){
        console.log(err);
    }
}

connectDb();

// const connection = mongoose.connect('mongodb+srv://sam:sam@sam.i7vxj6z.mongodb.net/e-comm?retryWrites=true&w=majority&appName=sam');
// module.exports = {connection}