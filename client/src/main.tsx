import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./App.css";

import App from "./App";
import AboutPage from "./pages/AboutPage";
import Connexion from "./pages/Connexion";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Homepage from "./pages/Homepage";
import Inscription from "./pages/Inscription";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";

import { AuthProvider } from "./context/AuthContext";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "*", element: <NotFound /> },
      { path: "/", element: <Homepage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/offers", element: <Offers /> },
      { path: "/login", element: <Connexion /> },
      { path: "/signup", element: <Inscription /> },
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
