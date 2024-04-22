import { Row, Col, Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();

  function register(values) {
    if (values.password !== values.confirmpassword) {
      message.error("Passwords do not match. Please try again!");
    } else {
      console.log(values);
      dispatch(registerUser(values));
    }
  }

  return (
    <div className="register">
      <Row justify="center" className="flex align-items-center">
        <Col>
          <h1 className="heading1">JOB</h1>
        </Col>
        <Col lg={10} sm={24} className="bs p-5 register-form">
          <h1>Register</h1>
          <Form layout="vertical" onFinish={register}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmpassword"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Button
              htmlType="submit"
              className="view-btn"
              style={{ marginRight: "200px" }}
            >
              Register
            </Button>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              Already Registered ? Click Here To Login
            </Link>
          </Form>
        </Col>
        <Col>
          <h1 className="heading2">HELP</h1>
        </Col>
      </Row>
    </div>
  );
}
export default Register;
