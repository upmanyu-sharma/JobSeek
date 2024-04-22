import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table } from "antd";
function AppliedJobs() {
  const jobsData = useSelector((state) => state.JobsReducer);
  const jobs = jobsData.jobs;

  const user = JSON.parse(localStorage.getItem("user"));
  const userAppliedJobs = [];

  for (var job of jobs) {
    var appliedCandidates = job.appliedCandidates; //array of applied candidates

    var temp = appliedCandidates.find(
      (candidate) => candidate.userId == user._id
    );

    if (temp) {
      var obj = {
        title: job.title,
        company: job.company,
        appliedDate: temp.appliedDate,
      };

      userAppliedJobs.push(obj);
    }
  }

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Applied Date",
      dataIndex: "appliedDate",
    },
  ];

  return (
    <div>
      <DefaultLayout>
        {/* <h3>AppliedJobs</h3> */}
        <Table columns={columns} dataSource={userAppliedJobs} />
      </DefaultLayout>
    </div>
  );
}

export default AppliedJobs;
