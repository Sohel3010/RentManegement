import axios from "axios";

const API_URL = 'http://localhost:8080/';
const SAVE_USER = `${API_URL}user/save`;
const LIST_USER = `${API_URL}user/listUser`;
const UPDATE_USER = `${API_URL}user/byId`;
//`${API_URL}${SAVE_USER}`

export const addUser = async (data) => {
    try {
        return await axios.post(SAVE_USER, data);
    } catch (error) {
        console.log('Error while calling addUser api', error.message);
    }
}

export const getUser = async () => {
    try {
        return await axios.get(LIST_USER);
    } catch (error) {
        console.log('Error while calling getUser api', error.message);

    }

}
export const updateUser = async (data) => {
    try {
        return await axios.get(`${UPDATE_USER}/${data}`);
    } catch (error) {
        console.log('Error while calling getUpdate api', error.message);
    }
}

