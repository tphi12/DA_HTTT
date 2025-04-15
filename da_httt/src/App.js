import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { routes } from "./Routers/routers";
import ProtectedRoute from "./Routers/protectedRouters";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route, index) =>
          route.isPrivate ? (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ) : (
            <Route key={index} path={route.path} element={route.element} />
          )
        )}
      </Routes>
    </>
  );
}

export default App;
