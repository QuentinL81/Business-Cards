import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        //"Accept": "multipart/form-data"
        "Content-type": "multipart/form-data"
    }
}); 