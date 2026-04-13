import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/auth.css";
import CreatePath from "./pages/CreatePath";
import PathDetails from "./pages/PathDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePath />} />
        <Route path="/path" element={<PathDetails />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;