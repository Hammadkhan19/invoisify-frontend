import { StrictMode, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InvoiceDetails from "./components/InvoiceDetails";
import { AuthContextProvider } from "./context/AuthContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import Signup from "./components/register/Signup";
import Login from "./components/register/Login";
import NotFound from "./components/NotFound";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/invoice/:id"
          element={user ? <InvoiceDetails /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <InvoiceProvider>
        {" "}
        <App />
      </InvoiceProvider>
    </AuthContextProvider>
  </StrictMode>
);
