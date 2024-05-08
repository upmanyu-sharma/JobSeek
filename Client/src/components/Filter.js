import { Input, Modal, Form, Select, Button } from "antd";
import React, { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { searchJobs, sortJobs } from "../redux/actions/jobActions";

const { Search } = Input;
const { Option } = Select;

function Filter() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function sort(values) {
    dispatch(sortJobs(values));

    handleCancel();
  }
  return (
    <div className="flex">
      <Search
        placeholder="input search text"
        onSearch={(value) => {
          dispatch(searchJobs(value));
        }}
        enterButton="Search"
        style={{
          width: 300,
        }}
      />

      <FilterOutlined onClick={showModal} />

      <Modal
        title="Select filters"
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <Form layout="vertical" onFinish={sort}>
          <Form.Item name="experience" label="Experipence">
            <Select>
              <Option value={0}>Fresher</Option>
              <Option value={1}>1 Year</Option>
              <Option value={2}>2 Years</Option>
              <Option value={3}>3 Years</Option>
              <Option value={4}>4 Years</Option>
              <Option value={5}>5 Years</Option>
            </Select>
          </Form.Item>

          <Form.Item name="salary" label="Salary">
            <Select>
              <Option value={1000000}>1000000+</Option>
              <Option value={1500000}>1500000+</Option>
              <Option value={2500000}>2500000+</Option>
              <Option value={3500000}>3500000+</Option>
              <Option value={5000000}>5000000+</Option>
              <Option value={7000000}>7000000+</Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit">Filter</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Filter;
