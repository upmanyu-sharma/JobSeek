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
  const currjob = jobs.find((job) => job._id === id);

  const userData = localStorage.getItem("user");
  const userID = JSON.parse(userData)._id;
  const jobPostedBy = currjob.postedBy;

  const dispatch = useDispatch();

  function applyjob() {
    dispatch(applyJob(currjob));
  }

  const appliedCandidates = currjob.appliedCandidates;
  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate.userId === userID
  );
  return (
    <>
      <DefaultLayout>
        {currjob && (
          <div>
            <p>
              <b>Company</b> : {currjob.company}
            </p>
            <p>
              <b>Company Profile</b> : {currjob.companyDescription}
            </p>
            <p>
              <b>Department</b> : {currjob.department}
            </p>
            <hr />
            <p>
              <b>Designation</b> : {currjob.title}
            </p>
            <p>
              <b>Job Description</b> : {currjob.fullDescription}
            </p>

            <p>
              <b>Skills Required</b> : {currjob.skillsRequired}
            </p>
            <p>
              <b>Min Experience Required</b> : {currjob.experience}
            </p>
            <p>
              <b>Minimum Qualification Required </b> :{" "}
              {currjob.minimumQualification}
            </p>

            <p>
              <b>Salary Range</b> : {currjob.salaryFrom} - {currjob.salaryTo}
            </p>
            <hr />
            <p>
              <b>Total Candidates applied</b> :{" "}
              {currjob.appliedCandidates.length}
            </p>

            <hr />

            <div className="flex justify-content-between">
              {userID === jobPostedBy ? (
                <Button className="view-btn">
                  <Link
                    to={`/editjob/${currjob._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Edit Job
                  </Link>
                </Button>
              ) : alreadyApplied ? (
                <Tag color="blue">Already Applied</Tag>
              ) : (
                <Button onClick={applyjob} className="view-btn">
                  Apply Now
                </Button>
              )}
              <p>
                Posted on : {moment(currjob.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>
          </div>
        )}
      </DefaultLayout>
    </>
  );
}
export default JobInfo;
