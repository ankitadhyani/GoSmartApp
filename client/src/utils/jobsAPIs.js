import axios from 'axios';

// set up functions for talking to our backend

// getSavedJobs
export const getSavedJobs = () => {

  const jwtToken = localStorage.getItem('accessToken');

  return axios.get('/api/jobs', {
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    }
  });
}

// getJobsById
export const getJobsById = (jobId) => {
  return axios.get(`/api/jobs/${jobId}`)
}

// saveJobToDB
export const saveJobToDB = (jobInfo) => {

  const jwtToken = localStorage.getItem('accessToken');

  return axios.post('/api/jobs', jobInfo, {
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    }
  });
}

// updateJobs
// takes in object => {title: "title", body: "body"} AND Jobs's id
export const updateJobs = (jobId, jobInfo) => {
  return axios.put(`/api/jobs/${jobId}`, jobInfo)
}

// deleteSavedJob
// takes in Jobs's id
export const deleteSavedJob = (jobId) => {

  const jwtToken = localStorage.getItem('accessToken');
  return axios.delete(`/api/jobs/${jobId}`, {
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    }
  });
  
}

// export all functions so if someone needs to import all they can
export default {
  saveJobToDB,
  getSavedJobs,
  deleteSavedJob,

  getJobsById
}


