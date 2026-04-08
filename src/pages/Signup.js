import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="logo">
        📘
      </div>

      <h1>PathForge</h1>
      <p className="tagline">Start your learning journey today.</p>

      <AuthCard
        title="Create an account"
        subtitle="Enter your details to get started"
      >
        <InputField label="Full Name" type="text" placeholder="Jane Doe" />
        <InputField label="Email" type="email" placeholder="you@example.com" />
        <InputField label="Password" type="password" placeholder="••••••••" />

        <button className="btn">Create account →</button>
      </AuthCard>

      <p className="bottom-text">
        Already have an account? <Link to="/">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;