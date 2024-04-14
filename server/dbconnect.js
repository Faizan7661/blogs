import mongoose from "mongoose";
import config from 'config'
const mongoString = config.get("MONGO_STRING");
async function dbConnect(){
    try {
        await mongoose.connect(mongoString);
        console.log('Mongo DB Connected Successfully!')
    } catch (error) {
        console.error('Connection Failed');
    }
}

export default dbConnect;