import React, { useContext, useState } from "react";
import { FaFacebook, FaGoogle, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { jobContext } from "../../App";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
 const {error,setError,success,setSuccess} = useContext(jobContext)
  // form state
  const [newUser,setNewUser] = useState({
    email:"",
    password:""
  })

  const showError = (message) => {
  setError(message);
  setTimeout(() => {
    setError("");
  }, 2000);
};

 
const handleChange = (e) =>{
  const {name,value} = e.target;
  setNewUser((user)=>({...user,[name]:value}))
}

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("")
    try {
       const res = await axios.post("http://localhost:3333/api/user/login",newUser)
       if(res.data.token){
         localStorage.setItem("token", res.data.token);
          setSuccess(res.data.message)
          setTimeout(()=>{
           setSuccess("")
           navigate("/dashboard")
         },1000)
       }
       else{
         showError(res.data.message || "Login failed. Please try again.");
       }
    } catch (error) {
      console.log(error.message)
          showError(
      error.response?.data?.message ||
        error.message ||
        "Something went wrong. Try again."
    );
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        {error && (
          <div className="d-flex justify-content-center align-items-center p-2 mb-3 rounded-4 bg-danger text-white" >
            {error}
          </div>
        )}
          {success && (
          <div className="d-flex justify-content-center align-items-center p-2 mb-3 rounded-4 bg-success text-white" >
            {success}
          </div>
        )}
        <h1 className="signin-title">Welcome Back</h1>
        <p className="signin-sub">Secure your communication with Easymail</p>

        <form onSubmit={handleSubmit}>
         

          {/* Email */}
          <div className="signin-input-group">
            <IoIosMail />
            <input
              type="email"
              placeholder="Email address"
              value={newUser.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>

          {/* Password */}
          <div className="signin-input-group">
            <TbLockPassword />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
              name="password"
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
