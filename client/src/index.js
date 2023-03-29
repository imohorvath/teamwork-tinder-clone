import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Header from "./Pages/Header";
import ErrorPage from "./Pages/ErrorPage";
import Login from './Pages/Login';
import Questionnaire from './Pages/Questionnaire';
import Matchbox from './Pages/Matchbox';
import Profile from './Pages/Profile';
import Matches from "./Pages/Matches";
import Picks from "./Pages/Picks";
import SecondChance from "./Pages/SecondChance";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/:id/questionnaire",
        element: <Questionnaire />,
      },
      {
        path: "/:id/matchbox",
        element: <Matchbox />,
      },
      {
        path: "/:id/profile",
        element: <Profile />,
      },
      {
        path: "/:id/matches",
        element: <Matches />,
      },
      {
        path: "/:id/picks",
        element: <Picks />,
      },
      {
        path: "/:id/second-chance",
        element: <SecondChance />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
