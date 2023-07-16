import axios from "axios";

const API_URL = 'http://localhost:8080/';
const OWNER_LIST = `${API_URL}owners/list`;
const SAVE_USER = `${API_URL}owners/save`;

// Get All Owner List
export const getListOwners = async () => {
    try {
        return await axios.get(OWNER_LIST);
    } catch (error) {
        console.log('Error while calling getUser api', error.message);

    }

}

// Save Owner Details
export const addOwner = async (data) => {
    try {
        return await axios.post(SAVE_USER, data);
    } catch (error) {
        console.log('Error while calling addUser api', error.message);
    }
}


