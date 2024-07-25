import axios from "axios";
import { BASE_URL } from "./constants";

const config = {
  Headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
};

export const callAPI = async (resource)=>{
    const {data}= await axios.get(`${BASE_URL}/{resource}`,config);
    console.log(`${BASE_URL}/{resource}`);
    return data;
}