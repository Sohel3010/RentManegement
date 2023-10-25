import axios from "axios";

const API_URL = "http://localhost:8080/";
const LIST_RENT = `${API_URL}rent/list`;
const SAVE_RENT = `${API_URL}rent/save`;
const DELETE_RENT = `${API_URL}rent/deleteById`;
const UPDATE_RENT = `${API_URL}rent/rentById`;
const SHOPBY_OWNERID = `${API_URL}owners/shopsByOwnerId`;
const GET_AMOUNT = `${API_URL}rent/getAmt`;
const GET_RECIPTNO = `${API_URL}number/dictionary_number`


export const getRiciptNo = async()=>{
    try{
      return await axios.get(`${GET_RECIPTNO}`)
    }catch(error){
      console.log("error while calling recipt number api",error)
    }
  }
// Get All Rent List
export const getListOfRent = async (data) => {
  try {
    return await axios.post(LIST_RENT,data);
  } catch (error) {
    console.log("Error while calling rentList api", error.message);
  }
};

export const addRent = async (data) => {
  try {
    return await axios.post(SAVE_RENT, data);
  } catch (error) {
    console.log("Error while calling addUser api", error.response);
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

export const shopByOwnerId = async (id) =>{
  try{
    return await axios.get(`${SHOPBY_OWNERID}?id=${id}`);
  }catch(error){
    console.log("Error while calling SHOPBY_OWNERID api", error.message)
  }
}

export const getAmount = async (selectShopId,Year,selectedRentType) =>{
  try{
    return await axios.get(`${GET_AMOUNT}?shopid=${selectShopId}&year=${Year}&paymentType=${selectedRentType}`)
  }catch(error){
    console.log(error.message)
  }
}
