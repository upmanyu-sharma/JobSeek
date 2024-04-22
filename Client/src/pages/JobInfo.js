import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tag } from "antd";
import moment from "moment";
import DefaultLayout from "../components/DefaultLayout";
import { applyJob } from "../redux/actions/jobActions";

function JobInfo() {
  let { id } = useParams();

  const jobsData = useSelector((state) => state.JobsReducer);
  const jobs = jobsData.jobs;
  const job = jobs.find((job) => job._id === id);
  console.log(job);

  const userData = localStorage.getItem("user");
  const userID = JSON.parse(userData)._id;
  const jobPostedBy = job.postedBy;

  const dispatch = useDispatch();
  function applyjob() {
    dispatch(applyJob(job));
  }

  const appliedCandidates = job.appliedCandidates;
  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate.userId === userID
  );
  return (
    <>
      <DefaultLayout>
        {job && (
          <div>
            <p>
              <b>Company</b> : {job.company}
            </p>
            <p>
              <b>Company Profile</b> : {job.companyDescription}
            </p>
            <p>
              <b>Department</b> : {job.department}
            </p>
            <hr />
            <p>
              <b>Designation</b> : {job.title}
            </p>
            <p>
              <b>Job Description</b> : {job.fullDescription}
            </p>

            <p>
              <b>Skills Required</b> : {job.skillsRequired}
            </p>
            <p>
              <b>Min Experience Required</b> : {job.experience}
            </p>
            <p>
              <b>Minimum Qualification Required </b> :{" "}
              {job.minimumQualification}
            </p>

            <p>
              <b>Salary Range</b> : {job.salaryFrom} - {job.salaryTo}
            </p>
            <hr />
            <p>
              <b>Total Candidates applied</b> : {job.appliedCandidates.length}
            </p>

            <hr />

            <div className="flex justify-content-between">
              {userID === jobPostedBy ? (
                <Button className="view-btn">
                  <Link
                    to={`/editjob/${job._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Edit Job
                  </Link>
                </Button>
              ) : alreadyApplied ? (
                <Tag color="blue">Already Applied</Tag>
              ) : (
                <Button onClick={applyJob} className="view-btn">
                  Apply Now
                </Button>
              )}
              <p>Posted on : {moment(job.createdAt).format("MMMM Do YYYY")}</p>
            </div>
          </div>
        )}
      </DefaultLayout>
    </>
  );
}
export default JobInfo;
