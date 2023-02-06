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
import Username from "../components/Confirm/Username";
import Password from "../components/Confirm/Password";
import AddPosts from "../components/AddPosts";
import Questions from "../components/Questions";

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
        hasAuth: true,
        element: (
          <Center />
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
      {
        path: "/confirm",
        children: [
          {
            path: "username",
            element: <Username />,
          },
          {
            path: "password",
            element: <Password />,
          },
        ]
      },
      {
        path: "/add_posts",
        hasAuth: true,
        element: <AddPosts />,
      },
      {
        path: "/question/:id",
        element: <Questions />,
      },
      {
        path: "/aaa",
        element: <Register />,
      },
      {
        path: "/error",
        element: <ErrorBoundary />,
      },
    ],
    errorElement: <ErrorBoundary />
  },
]

// 根据hasAuth属性是否为true来判断是否需要前端鉴权
const handleConfig = (arr) => {
  arr.forEach(obj => {
    const { children, element, hasAuth } = obj;
    if (hasAuth) {
      obj.element = <RequireAuth children={element}></RequireAuth>
    }
    if (children && children.length !== 0) {
      handleConfig(children)
    }
  })
  return arr;
}
handleConfig(config);

const Route = createBrowserRouter(config)

export default Route;