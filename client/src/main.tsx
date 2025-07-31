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
import DashboardPageCandidat from "./pages/Candidat/DashboardCandidat";

import CompanyLists from "./pages/Company/CompanyLists";
import CompanyOffers from "./pages/Company/CompanyOffers";
import CompanyProfile from "./pages/Company/CompanyProfil";
import DashboardPageCompany from "./pages/Company/DashboardCompany";

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
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/dashboard/candidat", element: <DashboardPageCandidat /> },
      { path: "/dashboard/recruteur", element: <DashboardPageCompany /> },
      { path: "/dashboard/admin", element: <DashboardPage /> },
      { path: "/recruteur/trombinoscope", element: <CompanyLists /> },
      { path: "/recruteur/offers", element: <CompanyOffers /> },
      { path: "/recruteur/profile", element: <CompanyProfile /> },
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
