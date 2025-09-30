import React, { useContext, useState } from "react";
import {
  FiBell,
  FiSettings,
  FiUser,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./style.css";
import axios from "axios";
import { jobContext } from "../../../App";
import { FaSquareXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { jobApi } from "../../../utils/axios";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "posted"
  );

    const [category, setCategory] = useState("All"); // 🔥 category state
    const [searchTerm, setSearchTerm] = useState(""); // 🔥 new search filter

  const {
    jobList,
    setJobList,
    appliedJob,
    setAppliedJob,
    error,
    setError,
    success,
    setSuccess,
  } = useContext(jobContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteJob, setDeleteJob] = useState([]);
  const [newJob, setNewJob] = useState({
    image: "",
    name: "",
    title: "",
    skills: "",
    country: "",
    city: "",
    vacancy: "",
    qualification: "",
    experience: "",
    salary: "",
    jobtype: "",
    desc: "",
    responsibilities: "",
    deadline: "",
  });
  const [editJob, setEditJob] = useState({
    image: "",
    name: "",
    title: "",
    skills: "",
    country: "",
    city: "",
    vacancy: "",
    qualification: "",
    experience: "",
    salary: "",
    jobtype: "",
    desc: "",
    responsibilities: "",
    deadline: "",
  });
  const [jobDescription, setJobDescription] = useState(false);
  const [editJobDescription, setEditJobDescription] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // 🔥 new state
  const [profileImage, setProfileImage] = useState("");

  // Remove profile image
const handleRemoveImage = () => {
  setProfile((prev) => ({ ...prev, image: "" }));
};

  // Add this near your other states
const [profile, setProfile] = useState(() => {
  return JSON.parse(localStorage.getItem("profile")) || {
    username: "",
    email: "",
    role: "",
    about: "",
    image: "",
  };
});

// Handle input changes
const handleProfileChange = (e) => {
  const { name, value } = e.target;
  setProfile((prev) => ({ ...prev, [name]: value }));
};

// Handle image upload
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};

// Save profile to localStorage
const handleProfileUpdate = () => {
  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Profile updated successfully ✅");
  setProfileOpen(false); // close modal
};



  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  // Error handler
  const handleError = (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Try again.";
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  // Success handler
  const handleSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Get Job by Id
  const handleEditClick = async (id) => {
    try {
      const res = await jobApi.get(`/${id}`);
      setEditJob(res.data.job);
      setEditModalOpen(true);
    } catch (error) {
      console.log(error.message);
      handleError(error);
    }
  };

  // Edit change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditJob((preJob) => ({ ...preJob, [name]: value }));
  };

  // Update Job
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await jobApi.put(
        `/${editJob._id}`,
        editJob
      );
      setJobList(res.data.jobs);
      handleSuccess(res.data.message);
      setEditJob({
        image: "",
        name: "",
        title: "",
        skills: "",
        country: "",
        city: "",
        vacancy: "",
        qualification: "",
        experience: "",
        salary: "",
        jobtype: "",
        desc: "",
        responsibilities: "",
        deadline: "",
      });
      setTimeout(() => {
        setEditModalOpen(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error.message);
      handleError(error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  // Create Job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await jobApi.post(
        "/create",
        newJob
      );
      setJobList(res.data.jobs);
      handleSuccess(res.data.message);
      setNewJob({
        image: "",
        name: "",
        title: "",
        skills: "",
        country: "",
        city: "",
        vacancy: "",
        qualification: "",
        experience: "",
        salary: "",
        jobtype: "",
        desc: "",
        responsibilities: "",
        deadline: "",
      });
      setTimeout(() => {
        setModalOpen(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error.message);
      handleError(error);
    }
  };

  // Delete Job
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure delete job?")) {
        const res = await jobApi.delete(`/${id}`);
        setDeleteJob((job) => job.filter((item) => item._id !== id));
        window.location.reload();
      } else {
        console.log("User clicked No");
      }
    } catch (error) {
      console.log(error.message);
      handleError(error);
    }
  };

  return (
    <div className="dashboard">
       <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "hidden"}`}>
        <div className="logo">Admin Dashboard</div>
        <ul className="menu">
          <li
            className={activeTab === "posted" ? "bg-primary" : ""}
            onClick={() => handleTabChange("posted")}
          >
            <FiBriefcase /> <span>Job Posted</span>
          </li>

          <li
            className={activeTab === "customers" ? "bg-primary" : ""}
            onClick={() => handleTabChange("customers")}
          >
            <FiBriefcase /> <span>Customers</span>
          </li>
        </ul>
      </aside>

      {/* Main Section */}
      <div className="main">
        <header className="topbar">
          <div className="actions">
            <button>
              <FiBell />
            </button>
            <button>
              <FiSettings />
            </button>
            <button onClick={() => setProfileOpen(true)}> {/* 🔥 open modal */}
              <FiUser />
            </button>
          </div>
        </header>
{profileOpen && (
  <div className="modal-overlay">
    <div className="card shadow-lg">
      <div className="close">
        <FaSquareXmark
          size={20}
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => setProfileOpen(false)}
        />
      </div>
      <h3 className="d-flex justify-content-center mb-3">My Profile</h3>

      {/* Profile Picture */}
      <div className="d-flex flex-column align-items-center mb-3">
        <img
          src={profile.image || "https://via.placeholder.com/100"}
          alt="Profile"
          className="rounded-circle mb-2"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* 🔥 Remove Button */}
        {profile.image && (
          <button
            type="button"
            className="btn btn-danger btn-sm mt-2"
            onClick={() =>
              setProfile((prev) => ({ ...prev, image: "" }))
            }
          >
            Remove Picture
          </button>
        )}
      </div>

      {/* Profile Form */}
      <form>
        <input
          type="text"
          name="username"
          placeholder="UserName"
          value={profile.username}
          onChange={handleProfileChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleProfileChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={profile.role}
          onChange={handleProfileChange}
        />
        <input
          type="text"
          name="about"
          placeholder="About"
          value={profile.about}
          onChange={handleProfileChange}
        />

        <button
          type="button"
          className="btn btn-primary w-100 mt-2"
          onClick={handleProfileUpdate}
        >
          Update Profile
        </button>
      </form>
    </div>
  </div>
)}

        {/* Content */}
        <div className="content">
          <div className="content-header">
            <h2>{activeTab === "posted" ? "Job Posted" : "Job Applied"}</h2>
            {activeTab === "posted" && (
              <div className="header-actions">
                {/* 🔥 Category Dropdown */}
                <select
                  className="category-dropdown"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                  <option value="WFH">WFH</option>
                </select>

                {/* 🔥 Job Name Search */}
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by Job Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

              <button
                className="btn btn-primary"
                onClick={() => setModalOpen(true)}
              >
                + Create Job
              </button>
              </div>
            )}
          </div>

          {/* Job Posted Section */}
          {activeTab === "posted" && (
            <>
              {/* Header Row */}
              <div className="job-card header-row">
                <div className="job-info">
                  <span>Logo</span>
                  <span>Company</span>
                  <span>Role</span>
                  <span>Job Type</span>
                  <span>Country</span>
                  <span>Applied</span>
                  <span>Vacancy</span>
                  <span>Salary</span>
                </div>
                <div className="job-actions">Actions</div>
              </div>

              {/* 🔥 Filter Jobs by Category */}
              {[...jobList]
                .filter((item) =>
                  category === "All" ? true : item.jobtype === category
                )
                .filter((item) =>
                searchTerm === "" 
                 ? true 
                : item.title.toLowerCase().includes(searchTerm.toLowerCase())
                 )
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item, index) => (
                  <div className="job-card" key={index}>
                    <Link to={item._id} className="job-info">
                      <span>
                        <img
                          src={item.image && item.image}
                          alt="company-logo"
                          style={{ width: "50px" }}
                        />
                      </span>
                      <span>{item.name && item.name}</span>
                      <span>{item.title && item.title}</span>
                      <span>{item.jobtype && item.jobtype}</span>
                      <span>{item.country && item.country}</span>
                      <span>{item.applied && item.applied}</span>
                      <span>{item.vacancy && item.vacancy}</span>
                      <span>{item.salary && item.salary}</span>
                    </Link>
                    <div className="job-actions">
                      <button
                        className="btn btn-success"
                        onClick={() => handleEditClick(item._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </>
          )}

          {/* Job Applied Section */}
          {activeTab === "customers" && (
            <>
              <div className="job-card header-row">
                <div className="job-info">
                  <span>Company Id</span>
                  <span>Role</span>
                  <span>Name</span>
                  <span>Email</span>
                  <span>Applied Date</span>
                </div>
                <div className="job-actions">Actions</div>
              </div>

              {appliedJob?.map((item, index) => (
                <div className="job-card" key={index}>
                  <div className="job-info">
                    <span>{item.job && item.job}</span>
                    <span>{item.jobTitle && item.jobTitle}</span>
                    <span>{item.name && item.name}</span>
                    <span>{item.email && item.email}</span>
                    <span>
                      {item?.createdAt &&
                        new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                    </span>
                  </div>
                  <div className="job-actions">
                    <button className="action-btn edit">View</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* ===== Create Job Modal ===== */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="card shadow-lg">
            <div className="close">
              <FaSquareXmark
                size={20}
                style={{ color: "red" }}
                onClick={() => setModalOpen(false)}
                className="mt-0 mb-0"
              />
            </div>
            {error && (
              <div className="d-flex justify-content-center align-items-center p-2 mb-2 rounded-4 bg-danger text-white">
                {error}
              </div>
            )}
            {success && (
              <div className="d-flex justify-content-center align-items-center p-2 mb-2 rounded-4 bg-success text-white">
                {success}
              </div>
            )}
            <h3 className="d-flex justify-content-center mb-1 p-0">
              Create Job
            </h3>
            <form onSubmit={handleSubmit}>
              {jobDescription ? (
                <>
                  <textarea
                    name="desc"
                    placeholder="Job Description"
                    value={newJob.desc}
                    onChange={handleChange}
                    className="w-100 form-control mb-3"
                    rows="5"
                    cols="40"
                    required
                  />
                  <textarea
                    name="responsibilities"
                    placeholder="Responsibilities and Duties:"
                    value={newJob.responsibilities}
                    onChange={handleChange}
                    className="w-100 form-control mb-3"
                    rows="5"
                    cols="40"
                    required
                  />
                  <textarea
                    name="skills"
                    placeholder="Required Experience, Skills and Qualifications:"
                    value={newJob.skills}
                    onChange={handleChange}
                    className="w-100 form-control mb-3"
                    rows="5"
                    cols="40"
                    required
                  />
                  <div className="button-container d-flex justify-content-between">
                    <button
                      type="button"
                      onClick={() => setJobDescription(false)}
                      className="btn btn-primary"
                    >
                      Back <GrFormPreviousLink size={25} />
                    </button>
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image-Url"
                    value={newJob.image}
                    onChange={handleChange}
                    required
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newJob.name}
                    onChange={handleChange}
                    required
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newJob.title}
                    onChange={handleChange}
                    required
                    className="w-100 form-control mb-2"
                  />

                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={newJob.country}
                    onChange={handleChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newJob.city}
                    onChange={handleChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="vacancy"
                    placeholder="Vacancy"
                    value={newJob.vacancy}
                    onChange={handleChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Qualification"
                    value={newJob.qualification}
                    onChange={handleChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="experience"
                    placeholder="Experience"
                    value={newJob.experience}
                    onChange={handleChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={newJob.salary}
                    onChange={handleChange}
                    className="w-100 form-control mb-2"
                  />

                  {newJob && (
                    <select
                      name="jobtype"
                      className="form-control form-select mb-2 w-100"
                      value={newJob.jobtype}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    >
                      <option value="">Select JobType</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Remote">Remote</option>
                      <option value="WFH">WFH</option>
                    </select>
                  )}

                  <input
                    type="text"
                    name="deadline"
                    placeholder="Deadline"
                    value={newJob.deadline}
                    onChange={handleChange}
                    className="w-100 form-control mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => setJobDescription(true)}
                    className="btn btn-primary"
                  >
                    Next <GrFormNextLink size={25} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ===== Edit Job Modal ===== */}
      {editModalOpen && (
        <div className="modal-overlay">
          <div className="card shadow-lg">
            {error && <div className="error-message">{error}</div>}
            <div className="close">
              <FaSquareXmark
                size={30}
                style={{ color: "red" }}
                onClick={() => setEditModalOpen(false)}
              />
            </div>
            {error && (
              <div className="d-flex justify-content-center align-items-center p-2 mb-2 rounded-4 bg-danger text-white">
                {error}
              </div>
            )}
            {success && (
              <div className="d-flex justify-content-center align-items-center p-2 mb-2 rounded-4 bg-success text-white">
                {success}
              </div>
            )}
            <h3
              className="d-flex justify-content-center"
              style={{ marginTop: "0px" }}
            >
              Edit Job
            </h3>
            <form onSubmit={handleEditSubmit}>
              {editJobDescription ? (
                <>
                  <textarea
                    name="desc"
                    placeholder="Job Description"
                    value={editJob.desc}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-3"
                    rows="5"
                    cols="40"
                    required
                  />
                  <textarea
                    name="responsibilities"
                    placeholder="Responsibilities and Duties:"
                    value={editJob.responsibilities}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-3"
                    rows="5"
                    cols="40"
                    required
                  />

                  <textarea
                    name="skills"
                    placeholder="Required Experience, Skills and Qualifications:"
                    value={editJob.skills}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-3"
                    rows="5"
                    cols="40"
                    required
                  />
                  <div className="button-container d-flex justify-content-between">
                    <button
                      type="button"
                      onClick={() => setEditJobDescription(false)}
                      className="btn btn-primary"
                    >
                      Back <GrFormPreviousLink size={25} />
                    </button>
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image-Url"
                    value={editJob.image}
                    onChange={handleEditChange}
                    required
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editJob.name}
                    onChange={handleEditChange}
                    required
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={editJob.title}
                    onChange={handleEditChange}
                    required
                    className="w-100 form-control mb-2"
                  />

                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={editJob.country}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={editJob.city}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="vacancy"
                    placeholder="Vacancy"
                    value={editJob.vacancy}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Qualification"
                    value={editJob.qualification}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="experience"
                    placeholder="Experience"
                    value={editJob.experience}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-2"
                  />
                  <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={editJob.salary}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-2"
                  />

                  {editJob && (
                    <select
                      name="jobtype"
                      className="form-control form-select mb-2 w-100"
                      value={editJob.jobtype}
                      onChange={handleEditChange}
                      required
                      autoComplete="off"
                    >
                      <option value="">Select JobType</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Remote">Remote</option>
                      <option value="WFH">WFH</option>
                    </select>
                  )}

                  <input
                    type="text"
                    name="deadline"
                    placeholder="Deadline"
                    value={editJob.deadline}
                    onChange={handleEditChange}
                    className="w-100 form-control mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => setEditJobDescription(true)}
                    className="btn btn-primary"
                  >
                    Next <GrFormNextLink size={25} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
