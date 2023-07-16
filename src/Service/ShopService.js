import axios from "axios";

const API_URL = 'http://localhost:8080/';
const LIST_SHOP = `${API_URL}shop/listshop`;


// Get All User List
export const getListOfShop = async () => {
    try {
        return await axios.get(LIST_SHOP);
    } catch (error) {
        console.log('Error while calling getUser api', error.message);
    }
}