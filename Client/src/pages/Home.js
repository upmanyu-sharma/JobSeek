//OAHKCV
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

function Home() {
  const jobsData = useSelector((state) => state.JobsReducer);
  const jobs = jobsData.jobs;

  return (
    <>
      <DefaultLayout>
        <Row gutter={14}>
          {jobs.map((job) => {
            return (
              //in total we have 24 cols, when can specify each box should take how much
              <Col lg={12} sm={24}>
                {/* bs = box shadow online styling uthai hai */}
                <div className="job-div bs m-2 p-2">
                  <h4>{job.title}</h4>
                  <p>{job.company}</p>
                  <hr />
                  <p>{job.smallDescription}</p>
                  <p>
                    Salary Range:{" "}
                    <b>
                      {job.salaryFrom} - {job.salaryTo}
                    </b>
                  </p>
                  <p>
                    Min Experience Required:{" "}
                    <b>
                      {job.experience} {job.experience === 1 ? "year" : "years"}
                    </b>
                  </p>

                  <hr />
                  <div className="flex justify-content-between">
                    <Link to={`/job/${job._id}`}>
                      <Button className="view-btn">View</Button>
                    </Link>
                    <p>
                      Posted on : {moment(job.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </DefaultLayout>
    </>
  );
}
export default Home;
