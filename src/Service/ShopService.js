import axios from "axios";

const API_URL = "http://localhost:8080/";
const LIST_SHOP = `${API_URL}shop/listshop`;
const ADD_SHOP = `${API_URL}shop/save`;
const LIST_CATEGORY = `${API_URL}category/list`;
const GET_BY_ID = `${API_URL}shop/shopById`;

// Get All User List
export const getListOfShop = async () => {
  try {
    return await axios.get(LIST_SHOP);
  } catch (error) {
    console.log("Error while calling getUser api", error.message);
  }
};

// Save Shop Details
export const addShop = async (data) => {
  try {
    return await axios.post(ADD_SHOP, data);
  } catch (error) {
    console.log("Error while calling addUser api", error.message);
  }
};

// Get All Category List
export const getListOfCategory = async () => {
  try {
    return await axios.get(LIST_CATEGORY);
  } catch (error) {
    console.log("Error while calling getUser api", error.message);
  }
};

export const getShopByID = async (id) => {
  try {
    return await axios.get(`${GET_BY_ID}?id=${id}`);
  } catch (error) {
    console.log("Error while calling getUpdate api", error.message);
  }
};
