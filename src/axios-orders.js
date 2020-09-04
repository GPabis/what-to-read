import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.nytimes.com/svc/books/v3/lists/",
});

export default instance;
