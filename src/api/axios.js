import axios from "axios";

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    params : {
        api_key : "8a81f01d446dd2d86bcd5f40cb08a7ba",
        language : "ko-KR",
    }
});

export default instance;