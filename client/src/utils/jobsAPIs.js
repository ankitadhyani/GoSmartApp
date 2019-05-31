import axios from 'axios';

// set up functions for talking to our backend

// getAllJobs
export const getAllJobs = () => {
  return axios.get('/api/jobs')
}

// getJobsById
export const getJobsById = (jobId) => {
  return axios.get(`/api/jobs/${jobId}`)
}

// createJobs
// takes in an object => {title: "title", body: "body"}
export const createJobs = (jobInfo) => {
  return axios.post('/api/jobs', jobInfo)
}

// updateJobs
// takes in object => {title: "title", body: "body"} AND Jobs's id
export const updateJobs = (jobId, jobInfo) => {
  return axios.put(`/api/jobs/${jobId}`, jobInfo)
}

// removeJobs
// takes in Jobs's id
export const removeJobs = (jobId) => {
  return axios.delete(`/api/jobs/${jobId}`);
}

// export all functions so if someone needs to import all they can
export default {
  getAllJobss,
  getJobsById,
  createJobs,
  updateJobs,
  removeJobs
}


