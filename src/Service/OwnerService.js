import axios from "axios";

const API_URL = 'http://localhost:8080/';
const OWNER_LIST = `${API_URL}owners/list`;
const SAVE_USER = `${API_URL}owners/save`;
const DELETE_OWNER = `${API_URL}owners/delete`;
const UPDATE_OWNER = `${API_URL}owners/byId`;
const SHOP_LIST = `${API_URL}shop/notRended`;

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

// Delete Owner Details
export const deleteOwner = async (id) => {
    try {
        return await axios.get(`${DELETE_OWNER}?id=${id}`);
    } catch (error) {
        console.log('Error while calling deleteOwner api', error.message);
    }
}

// Update or Edit details
export const updateOwner = async (id) => {
    try {
        return await axios.get(`${UPDATE_OWNER}?id=${id}`);
    } catch (error) {
        console.log('Error while calling getUpdate api', error.message);
    }
}

// Get Shop in not rented
export const getShopNotRented = async () => {
    try {
        return await axios.get(SHOP_LIST);
    } catch (error) {
        console.log('Error while calling get shop by not rented api', error.message);

    }

}

