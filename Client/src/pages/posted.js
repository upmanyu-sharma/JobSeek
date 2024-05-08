import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table, Modal } from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, OrderedListOutlined } from "@ant-design/icons";
import { useState } from "react";

function Posted() {
  const jobsData = useSelector((state) => state.JobsReducer);
  const allJobs = jobsData.jobs;

  const usersData = useSelector((state) => state.usersReducer);
  const allUsers = usersData.users;

  const userID = JSON.parse(localStorage.getItem("user"))._id; //curr user id

  const navigate = useNavigate();

  const userPostedJobs = allJobs.filter((job) => {
    return job.postedBy === userID;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Applied Candidates",
      dataIndex: "appliedCandidates",
    },
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div className="flex">
            <EditOutlined
              style={{ fontSize: "17px", marginRight: "5px" }}
              onClick={() => {
                navigate(`/editjob/${data.completeJobData._id}`);
              }}
            />
            <OrderedListOutlined
              style={{ fontSize: "17px", marginLeft: "0px" }}
              onClick={() => showModal(data.completeJobData)}
            />
          </div>
        );
      },
    },
  ];

  const dataSource = [];

  for (var job of userPostedJobs) {
    var obj = {
      title: job.title,
      company: job.company,
      postedOn: moment(job.createdAt).format("MMMM Do YYYY"),
      appliedCandidates: job.appliedCandidates.length,
      completeJobData: job,
    };
    dataSource.push(obj);
  }

  const showModal = (job) => {
    setIsModalOpen(true);
    setSelectedJob(job);
    // console.log(job);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function CandidatesList() {
    console.log("data");
    const candidatesColumns = [
      {
        title: "Candidate Id",
        dataIndex: "candidateId",
        render: (text, data) => {
          return (
            <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
          );
        },
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
      },
      { title: "Applied Date", dataIndex: "appliedDate" },
    ];

    var candidatesDatasource = [];

    for (var candidate of selectedJob.appliedCandidates) {
      var user = allUsers.find((user) => user._id === candidate.userId);

      var obj = {
        candidateId: user._id,
        fullName: user.firstName + " " + user.lastName,
        appliedDate: candidate.appliedDate,
      };

      candidatesDatasource.push(obj);
    }
    return (
      <Table columns={candidatesColumns} dataSource={candidatesDatasource} />
    );
  }

  return (
    <div>
      <DefaultLayout>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title="Applied Candidates List"
          open={isModalOpen}
          onOk={handleOk}
          closable={false}
          onCancel={handleCancel}
          width={1000}
        >
          <CandidatesList />
        </Modal>
      </DefaultLayout>
    </div>
  );
}
export default Posted;
