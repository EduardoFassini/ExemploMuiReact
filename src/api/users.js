
import axios from 'axios';

const BASE_URL = "https://randomuser.me/api/";

export const getUsers = () => {

    return axios.get(`${BASE_URL}?results=20&nat=br`)

}