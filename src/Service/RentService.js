import axios from "axios";

const API_URL = "http://localhost:8080/";
const LIST_RENT = `${API_URL}rent/listrent`;
const SAVE_USER = `${API_URL}rent/save`;
const DELETE_RENT = `${API_URL}rent/deleteById`;
const UPDATE_RENT = `${API_URL}rent/rentById`;

// Get All Rent List
export const getListOfRent = async () => {
  try {
    return await axios.get(LIST_RENT);
  } catch (error) {
    console.log("Error while calling getUser api", error.message);
  }
};

export const addRent = async (data) => {
  try {
    return await axios.post(SAVE_USER, data);
  } catch (error) {
    console.log("Error while calling addUser api", error.response.data);
  }
};

//DELETE RENT DEATAILS BY ID

export const deleteRent = async (id) => {
  try {
    return await axios.get(`${DELETE_RENT}?id=${id}`);
  } catch (error) {
    console.log("Error while calling deleteRent api", error.message);
  }
};

//UPDATE RENT DEATAILS BY ID
export const updateRent = async (id) => {
  try {
    return await axios.get(`${UPDATE_RENT}?id=${id}`);
  } catch (error) {
    console.log("Error while calling getUpdate api", error.message);
  }
};
