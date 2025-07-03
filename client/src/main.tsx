import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./App.css";

import App from "./App";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    element: <App />,
    children: [{ path: "/", element: <Homepage /> },
      { path: "*", element: <NotFound /> },
      { path: "/offers", element: <Offers /> }],
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
