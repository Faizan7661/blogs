import express from "express";
import bodyParser from "body-parser";
import dbConnect from "./dbconnect.js";
import adminRoutes from "./controllers/adminRoutes/index.js";
import blogRoutes from "./controllers/blogRoutes/index.js";

dbConnect();
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
const port = 5001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express Server is Up And Running!");
});

app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);

app.listen(port, () => {
  console.info("Server is Running on port -> ", port);
});
