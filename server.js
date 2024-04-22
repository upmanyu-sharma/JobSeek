const express = require("express");
const db = require("./db.js");
const jobsRoute = require("./Routes/jobsRoute.js");
const userRoute = require("./Routes/userRoute.js");

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("OAHKCV server running successfully"));

app.use(express.json());

app.use("/api/jobs", jobsRoute);
app.use("/api/users", userRoute);
