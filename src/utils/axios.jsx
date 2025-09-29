import axios from "axios";

// Base URL for job-related APIs
export const jobApi = axios.create({
  baseURL: "https://api.myjobopening.in/api/job",
  headers: {
    "Content-Type": "application/json",
  },
});

// Base URL for user-related APIs
export const userApi = axios.create({
  baseURL: "https://api.myjobopening.in/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});
