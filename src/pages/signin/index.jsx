import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

  // form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Dummy login validation (replace with API later)
    if (username === "admin" && password === "1234") {
      navigate("/dashboard"); // redirect to dashboard
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Welcome Back</h1>
        <p className="signin-sub">Secure your communication with Easymail</p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="signin-input-group">
            <FaUser />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="signin-input-group">
            <IoIosMail />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="signin-input-group">
            <TbLockPassword />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" className="signin-btn">
            Sign In →
          </button>
        </form>

        <div className="signin-divider">Or continue with</div>

        <div className="signin-socials">
          <button
            type="button"
            className="signin-social-btn facebook"
            onClick={() =>
              window.open("https://www.facebook.com/login", "_blank")
            }
          >
            <FaFacebook />
          </button>
          <button
            type="button"
            className="signin-social-btn google"
            onClick={() =>
              window.open("https://accounts.google.com/signin", "_blank")
            }
          >
            <FaGoogle />
          </button>
        </div>

        <div className="signin-footer">
          Don’t have an account?{" "}
          <a
            href="/signup"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
