import React, { useState } from "react";
import {
  FiBell,
  FiSettings,
  FiUser,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./style.css";

// Initial Data for Job Posted
const initialPostedJobs = [
  {
    id: 1,
    company: "Creative Labs",
    role: "Frontend Developer",
    country: "India",
    applied: 20,
    vacancy: 5,
    salary: "$1200",
    jobType: "Full-time",
  },
  {
    id: 2,
    company: "Facebook",
    role: "UI Designer",
    country: "Australia",
    applied: 10,
    vacancy: 3,
    salary: "$950 - 1100",
    jobType: "Part-time",
  },
];

// Data for Job Applied
const appliedJobs = [
  {
    id: 1,
    company: "Google",
    role: "Backend Developer",
    country: "USA",
    appliedDate: "2025-09-01",
    status: "Pending",
  },
  {
    id: 2,
    company: "Amazon",
    role: "Cloud Engineer",
    country: "Canada",
    appliedDate: "2025-08-28",
    status: "Shortlisted",
  },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("posted"); // posted | applied
  const [postedJobs, setPostedJobs] = useState(initialPostedJobs);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    company: "",
    role: "",
    country: "",
    applied: 0,
    vacancy: 0,
    salary: "",
    jobType: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const jobToAdd = { ...newJob, id: Date.now() };
    setPostedJobs([...postedJobs, jobToAdd]);
    setIsModalOpen(false); // close modal
    setNewJob({
      company: "",
      role: "",
      country: "",
      applied: 0,
      vacancy: 0,
      salary: "",
      jobType: "",
    }); // reset form
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "hidden"}`}>
        <div className="logo">JOB.in</div>
        <ul className="menu">
          <li onClick={() => setActiveTab("posted")}>
            <FiBriefcase /> <span>Job Posted</span>
          </li>
          <li onClick={() => setActiveTab("applied")}>
            <FiBriefcase /> <span>Job Applied</span>
          </li>
        </ul>
      </aside>

      {/* Main Section */}
      <div className="main">
        {/* Top Navbar */}
        <header className="topbar">
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>

          <div className="actions">
            <button>
              <FiBell />
            </button>
            <button>
              <FiSettings />
            </button>
            <button>
              <FiUser />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          <div className="content-header">
            <h2>{activeTab === "posted" ? "Job Posted" : "Job Applied"}</h2>
            {activeTab === "posted" && (
              <button
                className="create-btn"
                onClick={() => setIsModalOpen(true)}
              >
                + Create Job
              </button>
            )}
          </div>

          {/* Job Posted Section */}
          {activeTab === "posted" && (
            <>
              {/* Header Row */}
              <div className="job-card header-row">
                <div className="job-left">Logo</div>
                <div className="job-info">
                  <span>Company</span>
                  <span>Role</span>
                  <span>Country</span>
                  <span>Applied</span>
                  <span>Vacancy</span>
                  <span>Salary</span>
                  <span>Job Type</span>
                </div>
                <div className="job-actions">Actions</div>
              </div>

              {/* Job Cards */}
              {postedJobs.map((job) => (
                <div className="job-card" key={job.id}>
                  <div className="job-left">
                    <div className="job-logo">—</div>
                  </div>
                  <div className="job-info">
                    <span>{job.company}</span>
                    <span>{job.role}</span>
                    <span>{job.country}</span>
                    <span>{job.applied}</span>
                    <span>{job.vacancy}</span>
                    <span>{job.salary}</span>
                    <span>{job.jobType}</span>
                  </div>
                  <div className="job-actions">
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Job Applied Section */}
          {activeTab === "applied" && (
            <>
              <div className="job-card header-row">
                <div className="job-left">Logo</div>
                <div className="job-info">
                  <span>Company</span>
                  <span>Role</span>
                  <span>Country</span>
                  <span>Applied Date</span>
                  <span>Status</span>
                </div>
                <div className="job-actions">Actions</div>
              </div>

              {appliedJobs.map((job) => (
                <div className="job-card" key={job.id}>
                  <div className="job-left">
                    <div className="job-logo">—</div>
                  </div>
                  <div className="job-info">
                    <span>{job.company}</span>
                    <span>{job.role}</span>
                    <span>{job.country}</span>
                    <span>{job.appliedDate}</span>
                    <span>{job.status}</span>
                  </div>
                  <div className="job-actions">
                    <button className="action-btn edit">View</button>
                    <button className="action-btn delete">Withdraw</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* ===== Modal ===== */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create Job</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={newJob.company}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={newJob.role}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={newJob.country}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="applied"
                placeholder="Applied"
                value={newJob.applied}
                onChange={handleChange}
              />
              <input
                type="number"
                name="vacancy"
                placeholder="Vacancy"
                value={newJob.vacancy}
                onChange={handleChange}
              />
              <input
                type="text"
                name="salary"
                placeholder="Salary"
                value={newJob.salary}
                onChange={handleChange}
              />
              <input
                type="text"
                name="jobType"
                placeholder="Job Type"
                value={newJob.jobType}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
