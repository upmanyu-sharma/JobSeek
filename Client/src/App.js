import "./App.css";
import "antd/dist/reset.css";
import Home from "./pages/Home";
import JobInfo from "./pages/JobInfo";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppliedJobs from "./pages/AppliedJobs";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import FadeLoader from "react-spinners/FadeLoader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posted from "./pages/posted";
import EditJob from "./pages/EditJob";
import { getAllJobs } from "./redux/actions/jobActions";
import { getAllUsers } from "./redux/actions/userActions";
import UserInfo from "./pages/UserInfo";

function App() {
  const { loading } = useSelector((state) => state.loaderReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="App">
      {loading && (
        <div className="sweet-loading text-center">
          <FadeLoader color={"#001529"} />
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/login" exact Component={Login} />
          <Route path="/Register" exact Component={Register} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appliedjobs"
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postjob"
            element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted"
            element={
              <ProtectedRoute>
                <Posted />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job/:id"
            element={
              <ProtectedRoute>
                <JobInfo />
              </ProtectedRoute>
            }
          />
          {/* applied user info */}
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <UserInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editjob/:id"
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <ProtectedRoute path="/" element={<Home />} />
          <ProtectedRoute path="/appliedjobs" element={<AppliedJobs />} />
          <ProtectedRoute path="/postjob" element={<PostJob />} />
          <ProtectedRoute path="/posted" element={<Posted />} />
          <ProtectedRoute path="/profile" element={<Profile />} />
          <ProtectedRoute path="/job/:id" element={<JobInfo />} />
          <ProtectedRoute path="/editjob/:id" element={<EditJob />} />
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default App;
