import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
// import Dashboard from "../pages/Dashboard";

export const routes = [
  { path: "/", element: <Home />, isPrivate: false },
  { path: "/login", element: <Login />, isPrivate: false },
  //   { path: "/dashboard", element: <Dashboard />, isPrivate: true },
];
