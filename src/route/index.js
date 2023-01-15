import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import ForgetPassword from "../components/ForgetPassword";
import Index from "../components/Index";

const config = [
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/home/:catalog",
        element: <Home />,
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
  },
]
const Route = createBrowserRouter(config)

export default Route;