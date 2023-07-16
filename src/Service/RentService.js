import axios from "axios";

const API_URL = 'http://localhost:8080/';
const LIST_RENT = `${API_URL}rent/listrent`;
const SAVE_USER = `${API_URL}rent/save`;


// Get All Rent List
export const getListOfRent = async () => {
    try {
        return await axios.get(LIST_RENT);
    } catch (error) {
        console.log('Error while calling getUser api', error.message);
    }
}

export const addRent = async (data) => {
    try {
        return await axios.post(SAVE_USER, data);
    } catch (error) {
        console.log('Error while calling addUser api', error.message);
    }
}