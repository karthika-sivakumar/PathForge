import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import { useState } from "react";
import { BookOpen } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.type === "text" ? "name" : e.target.type]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (form.name && form.email && form.password) {
    //store user in localStorage
    localStorage.setItem("user", JSON.stringify(form));

    toast.success("Account created successfully 🎉");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  } else {
    toast.error("Please fill all fields");
  }
};

  return (
    <div className="auth-container">
      <div className="logo flex items-center justify-center">
        <BookOpen size={24} />
      </div>

      <h1>PathForge</h1>
      <p className="tagline">Start your learning journey today.</p>

      <AuthCard
        title="Create an account"
        subtitle="Enter your details to get started"
      >
        <form onSubmit={handleSubmit}>
          <div onChange={handleChange}>
            <InputField label="Full Name" type="text" placeholder="Jane Doe" />
            <InputField label="Email" type="email" placeholder="you@example.com" />
            <InputField label="Password" type="password" placeholder="••••••••" />
          </div>

          <button className="btn">Create account →</button>
        </form>
      </AuthCard>

      <p className="bottom-text">
        Already have an account? <Link to="/">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;