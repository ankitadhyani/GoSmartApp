import axios from 'axios';

// set up functions for talking to our backend

// registerUser
// takes in an object
// linked to user-router.js
export const registerUser = (userInfo) => {
    return axios.post('/api/users/register', userInfo)
}

// loginUser
// takes in an object
// linked to user-router.js
export const loginUser = (userInfo) => {
    return axios.post('/api/users/login', userInfo)
}


// getUserProfile
export const getUserProfile = () => {
    const jwtToken = localStorage.getItem('accessToken');

    return axios.get('/api/users', {
        headers: {
            "Authorization": `Bearer ${jwtToken}`
        }
    }
    );
}


// logOutUser
export const logOutUser = () => {
    return axios.delete('/api/users')
}

// getUserById
export const getUserById = (userId) => {
    return axios.get(`/api/users/${userId}`)
}

// updateUserProfile
export const updateUserProfile = (userInfo) => {

    const jwtToken = localStorage.getItem('accessToken');
    return axios.put('/api/users/update', userInfo, {
        headers: {
            "Authorization": `Bearer ${jwtToken}`
        }
    });
}

// removeUser
// takes in User's id
export const removeUser = (userId) => {
    return axios.delete(`/api/users/${userId}`);
}


// getAllUsers
export const getAllUsers = () => {
    return axios.get('/api/users/allusers');
}


// export all functions so if someone needs to import all they can
export default {
    getAllUsers,
    registerUser,
    loginUser,
    getUserProfile,
    getUserById,
    updateUserProfile,
    removeUser,
    logOutUser
}


