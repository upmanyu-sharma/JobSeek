const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const moment = require("moment");
const { MailSend } = require("../Helpers/MailSend");

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
  const { currjob, user } = req.body;
  console.log("job posted by = " + currjob.postedBy);
  try {
    const currJob = await Job.findOne({ _id: currjob._id });

    const appliedCandidate = {
      userId: user._id,
      appliedDate: moment().format("MMM DD yy"),
    };

    currJob.appliedCandidates.push(appliedCandidate);
    await currJob.save();

    const currUser = await User.findOne({ _id: user._id });

    const appliedJob = {
      jobId: currjob._id,
      appliedDate: moment().format("MMM DD yy"),
    };
    currUser.appliedJobs.push(appliedJob);
    await currUser.save();

    const jobPosterUser = await User.findOne({ _id: currjob.postedBy });
    const recruiterEmail = jobPosterUser.email;
    console.log("recruiter = " + recruiterEmail);
    MailSend(
      recruiterEmail,
      `Candidate Application Received for ${currjob.title} position at ${currjob.company} on JobHelp`,
      `Dear Sir/Mam,

I hope this email finds you well. I am writing to inform you that a candidate has recently applied for the ${currjob.title} position at ${currjob.company} posted on JobHelp. We are excited to connect you with potential candidates who meet your job requirements.

To review the candidate's application details, please log in to your JobHelp account and navigate to the job posting for ${currjob.title} position at ${currjob.company}. There, you will find all the information provided by the candidate.

We believe this candidate's skills and experience align well with the requirements you outlined in your job posting. We encourage you to review their application at your earliest convenience and take the necessary steps in the recruitment process.

Thank you for choosing JobHelp for your recruitment needs. We look forward to facilitating a successful hiring process for you.

Best regards,
JobHelp`
    );

    res.send("Job Applied Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
