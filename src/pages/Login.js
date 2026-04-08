import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="logo">
        📘
      </div>

      <h1>PathForge</h1>
      <p className="tagline">Curate your learning journey.</p>

      <AuthCard
        title="Welcome back"
        subtitle="Enter your credentials to access your paths"
      >
        <InputField label="Email" type="email" placeholder="you@example.com" />
        <InputField label="Password" type="password" placeholder="••••••••" />

        <button className="btn">Sign in →</button>
      </AuthCard>

      <p className="bottom-text">
        Don’t have an account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
};

export default Login;