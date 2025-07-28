import { Outlet } from "react-router";
import "../src/App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "../../server/src/middlewares/auth/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </AuthProvider>
    </>
  );
}

export default App;
