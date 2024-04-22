import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  HomeOutlined,
  ScheduleOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import Filter from "./Filter";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  function logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  const username = JSON.parse(localStorage.getItem("user")).username;
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ position: "sticky", overflow: "auto", height: "100%", top: 0 }}
      >
        <div className="logo">{collapsed ? <h1>JH</h1> : <h1>JobHelp</h1>}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/" style={{ textDecoration: "none" }}>
              All Jobs
            </Link>
          </Menu.Item>
          <Menu.Item key="/appliedjobs" icon={<ScheduleOutlined />}>
            <Link to="/appliedjobs" style={{ textDecoration: "none" }}>
              Applied Jobs
            </Link>
          </Menu.Item>
          <Menu.Item key="/postjob" icon={<PlusCircleOutlined />}>
            <Link to="/postjob" style={{ textDecoration: "none" }}>
              Post Job
            </Link>
          </Menu.Item>
          <Menu.Item key="/posted" icon={<FileTextOutlined />}>
            <Link to="/posted" style={{ textDecoration: "none" }}>
              Posted Jobs
            </Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<ProfileOutlined />}>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}>
            <Link onClick={logout} style={{ textDecoration: "none" }}>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          // z-index is used to overlap this content over others
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            overflow: "auto",
            top: 0,
            zIndex: 9999,
          }}
        >
          <div className="flex justify-content-between">
            <div>
              <Button
                className="ant-btn"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            <div>
              <Filter />
            </div>
            <div>
              <h4 style={{ marginRight: "25px" }}>
                <b>{username}</b>
              </h4>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
