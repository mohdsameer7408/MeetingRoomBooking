import Axios from "axios";

export const baseURL = "https://meeting-rooms-api.herokuapp.com/api"; // "http://localhost:80/api";

const instance = Axios.create({
  baseURL,
});

export default instance;
