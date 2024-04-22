const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const moment = require("moment");

router.get("/getalljobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.send(jobs);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/postjob", async (req, res) => {
  try {
    const newjob = new Job(req.body);
    await newjob.save();
    res.send("Job Posted Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/editjob", async (req, res) => {
  try {
    await Job.findOneAndUpdate({ _id: req.body._id }, req.body);
    const updatedJob = await Job.findOne({ _id: req.body._id });
    res.send(updatedJob);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/applyjob", async (req, res) => {
  const { job, user } = req.body;
  try {
    const currJob = await Job.findOne({ _id: job._id });

    const appliedCandidate = {
      userId: user._id,
      appliedDate: moment().format("MMM DD yy"),
    };

    currJob.appliedCandidates.push(appliedCandidate);
    await currJob.save();

    const currUser = await User.findOne({ _id: user._id });
    const appliedJob = {
      jobId: job._id,
      appliedDate: moment().format("MMM DD yy"),
    };
    currUser.appliedJobs.push(appliedJob);
    await currUser.save();

    res.send("Job Applied Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
