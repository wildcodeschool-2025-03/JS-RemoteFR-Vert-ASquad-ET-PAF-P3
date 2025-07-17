import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./App.css";

import App from "./App";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFound";
import Offers from "./pages/Offers";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/offers", element: <Offers /> },
      { path: "/dashboard/:roleId", element: <DashboardPage /> },
    ],
  },
]);

/* ************************************************************************* */

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
