import mongoose from "mongoose";
async function dbConnect(){
    try {
        await mongoose.connect('mongodb+srv://mdfaizaann:FaizanCodeForIndiaA23@faizan.r6pzw5j.mongodb.net/algoHire');
        console.log('Mongo DB Connected Successfully!')
    } catch (error) {
        console.error('Connection Failed');
    }
}

export default dbConnect;