import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Signup from "../Page/Signup/Signup";
import UploadImg from "../Page/UploadImg/UploadImg";
import UploadResult from "../Page/UploadImg/UploadResult";
import ImgProcess from "../Page/ImgProcess/ImgProcess";
import ModelList from "../components/List_Type/ListType";

export const routes = [
  { path: "/", element: <Home />, isPrivate: false },
  { path: "/login", element: <Login />, isPrivate: false },
  { path: "/signup", element: <Signup />, isPrivate: false },
  { path: "/upload/:typeId?", element: <UploadImg />, isPrivate: false },
  { path: "/upload/result", element: <UploadResult />, isPrivate: false },
  { path: "/images", element: <ImgProcess />, isPrivate: false },
  { path: "/models", element: <ModelList />, isPrivate: false },
];
