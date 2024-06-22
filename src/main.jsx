import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./pages/admin.jsx";
import Reader from "./pages/reader.jsx";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList.jsx";
import ListIssues from "./components/ListIssues.jsx";

import hero from "./assets/hero.png";
import UpdateBooks from "./components/UpdateBook";

const ProtectRoute = ({ children }) => {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  if (!currentUser) {
    return children;
  }
  return <Navigate to="/" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={hero} width="300" />
            <h2>Welcome to Library Management System</h2>
            <div style={{ width: "900px", textAlign: "center" }}>
              An integrated library management system (LMS) is ERP software that
              helps in simplifying the daily operations of the library. The
              purpose of a library management system is to manage & track the
              daily work of the library such as issuing books, return books etc.
            </div>
          </div>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectRoute>
            <Login />
          </ProtectRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/reader",
        element: <Reader />,
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/updatebooks/:bookId",
        element: <UpdateBooks />,
      },
      {
        path: "/allbooks",
        element: <BookList />,
      },
      {
        path: "/listissues",
        element: <ListIssues />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
