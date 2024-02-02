import AdminModel from "../models/AdminModel.js";
import dbConnect from "../dbconnect.js";
dbConnect();

async function insertAdmin() {
  try {
    let admin = {
      name: "Mohammed Faizan",
      email: "admin@gmail.com",
      password: "admin@123",
      role: "admin",
    };
    let adminData = new AdminModel(admin);
    await adminData.save();
    console.log("Admin Added Successfully");
  } catch (error) {
    console.error(error);
  }
}

insertAdmin();
