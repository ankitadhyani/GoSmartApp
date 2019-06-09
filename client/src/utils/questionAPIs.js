import axios from 'axios';

// set up functions for talking to our backend

// getAllQuestions
export const getAllQuestions = () => {
  return axios.get('/api/questions')
}

// getQuestionsByTag
export const getQuestionsByTag = (tag) => {
  return axios.get(`/api/questions/tag/${tag}`)
}

// getQuestionsByUserId
export const getQuestionsByUserId = () => {

  const jwtToken = localStorage.getItem('accessToken');
  return axios.get('/api/questions/user/question', {
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    }
  });
}

// getQuestionById
export const getQuestionById = (questionId) => {
  return axios.get(`/api/questions/${questionId}`)
}

// createQuestion
// takes in an object 
export const createQuestion = (questionInfo) => {
  return axios.post('/api/questions', questionInfo)
}

// updateQuestion
// takes in object AND Question's id
export const updateQuestion = (questionId, questionInfo) => {
  return axios.put(`/api/questions/${questionId}`, questionInfo)
}

// removeQuestion
// takes in Question's id
export const removeQuestion = (questionId) => {
  return axios.delete(`/api/questions/${questionId}`);
}

// export all functions so if someone needs to import all they can
export default {
  getAllQuestions,
  getQuestionById,
  getQuestionsByUserId,
  createQuestion,
  updateQuestion,
  removeQuestion
}


