import axios from 'axios';
const API_URL = 'http://localhost:9000';

const api = {
  markers: {
    GetAll: () => {
      return axios.get(`${API_URL}/markers`);
    },
    GetById: (id) => {
      return axios.get(`${API_URL}/markers/${id}`);
    },
  },
};

export default api;
