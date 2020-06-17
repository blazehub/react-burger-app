import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-33e66.firebaseio.com/'
});

export default instance;