import axios from "axios";
import { message } from "antd";

export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/register", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("User Created Successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  } catch (error) {
    console.log(error.response.data.error);
    if (error.response.data.error === "Username already taken") {
      message.error("Username Already Taken, Please Choose Another One");
    } else {
      message.error("Something went wrong , please try again later");
    }
    dispatch({ type: "LOADING", payload: false });
  }
};

export const loginUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const user = await axios.post("/api/users/login", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("Login Successful!");
    localStorage.setItem("user", JSON.stringify(user.data));
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } catch (error) {
    message.error("Invalid Credentials");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const updateUser = (values) => async (dispatch) => {
  const userID = JSON.parse(localStorage.getItem("user"))._id;
  values._id = userID;
  dispatch({ type: "LOADING", payload: true });

  try {
    const user = await axios.post("/api/users/update", values);
    dispatch({ type: "LOADING", payload: false });
    message.success("User Updated Successfully!");
    localStorage.setItem("user", JSON.stringify(user.data));
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    message.error("Something went wrong , please try again later");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });
  try {
    const res = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_ALL_USERS", payload: res.data });
    dispatch({
      type: "LOADING",
      payload: false,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "LOADING",
      payload: false,
    });
  }
};
