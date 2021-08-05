import Axios from "axios";

export const baseURL = "https://meeting-rooms-api.herokuapp.com/api";

const instance = Axios.create({
  baseURL,
});

export default instance;
