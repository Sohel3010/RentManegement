import axios from "axios";

const API_URL = 'http://localhost:8080/';
const SAVE_USER = `${API_URL}user/save`;
const LIST_USER = `${API_URL}user/listUser`;
const UPDATE_USER = `${API_URL}user/byId`;
const DELETE_USER = `${API_URL}user/delete`;


// Save Data
export const addUser = async (data) => {
    try {
        return await axios.post(SAVE_USER, data);
    } catch (error) {
        console.log('Error while calling addUser api', error.message);
    }
}


// Get All User List
export const getUser = async () => {
    try {
        return await axios.get(LIST_USER);
    } catch (error) {
        console.log('Error while calling getUser api', error.message);

    }

}

// Edit Or Update
export const updateUser = async (id) => {
    try {
        return await axios.get(`${UPDATE_USER}?id=${id}`);
    } catch (error) {
        console.log('Error while calling getUpdate api', error.message);
    }
}

// Delete
export const deleteUser = async (id) => {
    try {
        return await axios.get(`${DELETE_USER}?id=${id}`);
    } catch (error) {
        console.log('Error while calling deleteUser api', error.message);
    }
}

