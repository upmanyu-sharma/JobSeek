import { Row, Col, Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  function login(values) {
    dispatch(loginUser(values));
  }
  return (
    <div className="login">
      <Row justify="center" className="flex align-items-center">
        <Col>
          <h1 className="heading1">JOB</h1>
        </Col>
        <Col lg={10} sm={24} className="bs p-5 login-form">
          <h1>Log-in</h1>
          <Form layout="vertical" onFinish={login}>
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
            <Button
              htmlType="submit"
              className="view-btn"
              style={{ marginRight: "230px" }}
            >
              Login
            </Button>
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              Not Registered ? Click Here To Register
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
export default Login;
