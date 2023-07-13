import axios from "axios";

const API_URL = 'http://localhost:8080/';
const OWNER_LIST = `${API_URL}owners/list`;

// Get All Owner List
export const getListOwners = async () => {
    try {
        return await axios.get(OWNER_LIST);
    } catch (error) {
        console.log('Error while calling getUser api', error.message);

    }

}

