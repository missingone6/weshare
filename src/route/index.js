import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Center from "../components/Center";
import User from "../components/Center/User";
import Settings from "../components/Center/Settings";
import Posts from "../components/Center/Posts";
import Messages from "../components/Center/Messages";
import ForgetPassword from "../components/ForgetPassword";
import Index from "../components/Index";
import RequireAuth from "../Auth/RequireAuth";
import GetAuthFromLocalStorage from "../Auth/GetAuthFromLocalStorage";
import ErrorBoundary from "../components/ErrorBoundary";

const config = [
  {
    path: "/",
    element: (
      <GetAuthFromLocalStorage>
        <Index />
      </GetAuthFromLocalStorage>
    ),
    children: [
      {
        path: "/home/:catalog",
        element: <Home />,
      },
      {
        path: "/center",
        element: (
          <RequireAuth>
            <Center />
          </RequireAuth>
        ),
        children: [
          {
            path: "user",
            element: <User />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "posts",
            element: <Posts />,
          },
          {
            path: "messages",
            element: <Messages />,
          },
        ]
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget",
        element: <ForgetPassword />,
      },
    ],
    errorElement: <ErrorBoundary />
  },
]
const Route = createBrowserRouter(config)

export default Route;