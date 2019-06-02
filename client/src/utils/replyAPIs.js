import axios from 'axios';

// set up functions for talking to our backend

// getAllReplies
export const getAllReplies = () => {
    return axios.get('/api/replies')
}

// getReplyById
export const getReplyById = (replyId) => {
    return axios.get(`/api/replies/${replyId}`)
}

// createReply
// takes in an object 
export const createReply = (replyInfo) => {
    return axios.post('/api/replies', replyInfo)
}

// updateReply
// takes in object AND replies id
export const updateReply = (replyId, replyInfo) => {
    return axios.put(`/api/replies/${replyId}`, replyInfo)
}

// removeReply
// takes in replies id
export const removeReply = (replyId) => {
    return axios.delete(`/api/replies/${replyId}`);
}

// export all functions so if someone needs to import all they can
export default {
    getAllReplies,
    getReplyById,
    createReply,
    updateReply,
    removeReply
}


