import { useRoutes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import ForgetPassword from "../components/ForgetPassword";

const config = [
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
  {
    path: "/",
    element: <Home />,
  },
]
const Route = () => useRoutes(config);

export default Route;