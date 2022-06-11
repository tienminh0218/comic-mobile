import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://comic-be-v1.herokuapp.com/api';

const initializeAxios = () => {
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers,
    validateStatus: () => true,
  });
};

let API = initializeAxios();

API.interceptors.response.use((response) => {
  if (response?.request?.responseURL) {
    console.log(
      'URL ->',
      '\u001b[34m' +
        decodeURI(response?.request?.responseURL.replace(BASE_URL, '')),
    );
  }
  return response;
});

export default API;
