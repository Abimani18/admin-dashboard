import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import Dashboard from "./pages/signin/dashboard";
import axios from "axios";
import JobApplication from "./pages/application/JobApplication";

export const jobContext = createContext();
export default function App() {
  const [jobList,setJobList] = useState([]);
  const [appliedJob,setAppliedJob] = useState([]);
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")

  useEffect(()=>{
    jobData()
    applyJobData()
  },[])
  const jobData = async()=>{
    try {
      const res = await axios.get("http://localhost:3333/api/job/allJobs")
      setJobList(res.data.jobs)
    } catch (error) {
      console.log(error.message);
    }
  }
  const applyJobData = async()=>{
    try {
      const res = await axios.get("http://localhost:3333/api/job/applications")
      setAppliedJob(res.data.applications)
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <jobContext.Provider value={{jobList,setJobList,appliedJob,setAppliedJob,error,setError,success,setSuccess}}>
    <Routes>
      {/* Default route goes to SignIn */}
      <Route path="/" element={<SignIn />} />

      {/* Explicit SignIn route */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:id" element={<JobApplication />} />

      {/* Add more routes here */}
    </Routes>
    </jobContext.Provider>
  );
}
