// import React, { useContext, useEffect } from 'react'
// import './JobApplication.css'
// import { useParams } from 'react-router-dom';
// import { jobContext } from '../../App';
// import axios from 'axios';

// const JobApplication = () => {
//     const {appliedJob,setAppliedJob} = useContext(jobContext);
//     const params = useParams();
//     const id = params.id
//     const job = appliedJob.find((job)=>job._id === id)
//     useEffect(()=>{
//         fetchData()
//     })
//     const fetchData =async()=>{
//         try {
//            const res = await axios.get(`http://localhost:3333/api/job/applications/job/${id}`)
//             setAppliedJob(res.data.applications)
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
//   return (
//     <>
//       <div className="job-card header-row">
//         <div className="job-info">
//           <span>Job Title</span>
//           <span>Name</span>
//           <span>Email</span>
//           <span>Phone</span>
//           {/* <span>Country</span>
//           <span>Applied</span>
//           <span>Vacancy</span>
//           <span>Salary</span> */}
//         </div>
//         <div className="job-actions">Actions</div>
//       </div>
//         <div className="job-card">
//           <div className="job-info">
//             {/* <span>
//               <img
//                 src={job?.image && job.image}
//                 alt="company-logo"
//                 style={{ width: "50px" }}
//               />
//             </span> */}
//             <span>{job?.jobTitle && job.jobTitle}</span>
//             <span>{job?.name && job.name}</span>
//             <span>{job?.email && job.email}</span>
//             <span>{job?.phone && job.phone}</span>
//             {/* <span>{job?.applied && job.applied}</span>
//             <span>{job?.vacancy && job.vacancy}</span>
//             <span>{job?.salary && job.salary}</span>
//             <span>{job?.jobType && job.jobType}</span> */}
//           </div>
//           <div className="job-actions">
//             <button
//               className="btn btn-success"
//               onClick={() => handleEditClick(job._id)}
//             >
//               Edit
//             </button>
//             <button
//               className="btn btn-danger"
//               onClick={() => handleDelete(job._id)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//     </>
//   );
// }

// export default JobApplication

import React, { useContext, useEffect, useState } from "react";
import "./JobApplication.css";
import { useParams } from "react-router-dom";
import { jobContext } from "../../App";
import axios from "axios";
import { FaSquareXmark } from "react-icons/fa6";

const JobApplication = () => {
  const { appliedJob, setAppliedJob,error,setError,success,setSuccess } = useContext(jobContext);
  const [deleteApplication,setDeleteApplication] = useState([]);
  const [editApplication,setEditApplication] = useState({
    name:"",
    email:"",
    phone:""
  });
  const [cardOpen,setCardOpen] = useState(false);
 const [application,setApplication] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    fetchData();
  }, [id,deleteApplication]);

  
  // Reusable error handler
const handleError = (error) => {
  const message =
    error.response?.data?.message ||
    error.message ||
    "Something went wrong. Try again.";
  setError(message);

  // Clear error after 3 seconds
  setTimeout(() => setError(""), 3000);
};

// Reusable success handler
const handleSuccess = (message) => {
  setSuccess(message);
  setTimeout(() => setSuccess(""), 3000);
};


  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3333/api/job/applications/job/${id}`
      );
      setApplication(res.data.applications);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditClick = async(id) => {
    try {
        const res = await axios.get(`http://localhost:3333/api/job/applications/${id}`)
        setEditApplication(res.data.application)
        setCardOpen(true);
    } catch (error) {
          console.log(error.message)
          handleError(error)
    }
  };
  const handleApplicationChange = (e) =>{
    const {name,value} = e.target;
    setEditApplication((preApplication)=>({...preApplication,[name]:value}))
  }
   const handleEditSubmit = async(e) => {
    e.preventDefault();
    try {
       const res = await axios.put(`http://localhost:3333/api/job/applications/${editApplication._id}`,editApplication);
       handleSuccess(res.data.message);
       setAppliedJob(res.data.applicatios);
        setEditApplication({ name: "", email: "", phone: "" }); 
       setTimeout(()=>{
           setCardOpen(false);
           window.location.reload();
       },1000)
    } catch (error) {
       console.log(error.message)
        handleError(error);
    }
  };
  const handleDelete = async (id) => {
  try {
    if (window.confirm("Are you sure you want to delete this application?")) {
      await axios.delete(`http://localhost:3333/api/job/applications/${id}`);

      // Remove the deleted item from state
      setDeleteApplication((prev) =>
        prev.filter((item) => item._id !== id)
      );

      // Show success message
      handleSuccess("Application deleted successfully!");
    } else {
      console.log("Delete canceled");
    }
  } catch (error) {
    console.error(error.message);
    handleError(error); // Shows error message
  }
};


  return (
    <>
    <div className="table-container">
  {application && application.length > 0 ? (   // <-- use application
    <table className="job-table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th className="actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {application.map((app) => (
          <tr key={app._id}>
            <td>{app.jobTitle}</td>
            <td>{app.name}</td>
            <td>{app.email}</td>
            <td>{app.phone}</td>
            <td className="actions-col">
              <button
                className="btn btn-edit"
                onClick={() => handleEditClick(app._id)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(app._id)}
              >
                🗑 Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h1 className="d-flex justify-content-center text-white" style={{ marginTop: "200px" }}>
      Application Not Submitted
    </h1>
  )}
</div>

     {cardOpen && (
            <div className="modal-overlay">
              <div className="card shadow-lg">
                <div className="close">
                  <FaSquareXmark
                    size={30}
                    style={{ color: "red" }}
                    onClick={() => setCardOpen(false)}
                  />
                </div>
                {error && (
                  <div className="d-flex justify-content-center align-items-center p-2 mb-3 rounded-4 bg-danger text-white">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="d-flex justify-content-center align-items-center p-2 mb-3 rounded-4 bg-success text-white">
                    {success}
                  </div>
                )}
                <h3
                  className="d-flex justify-content-center"
                  style={{ marginTop: "0px" }}
                >
                  Edit Application
                </h3>
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editApplication.name}
                    onChange={handleApplicationChange}
                    required
                    className="w-100 form-control mb-3"
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={editApplication.email}
                    onChange={handleApplicationChange}
                    required
                    className="w-100 form-control mb-3"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="12345-67890"
                    value={editApplication.phone}
                    onChange={handleApplicationChange}
                    className="w-100 form-control mb-3"
                  />
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
    </>
  );
};

export default JobApplication;
