import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Signup from "../Page/Signup/Signup";

export const routes = [
  { path: "/", element: <Home />, isPrivate: false },
  { path: "/login", element: <Login />, isPrivate: false },
  { path: "/signup", element: <Signup />, isPrivate: false },
  //   { path: "/dashboard", element: <Dashboard />, isPrivate: true },
];
