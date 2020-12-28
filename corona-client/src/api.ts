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
    Update: (list) => {
      return axios.post(`${API_URL}/markers`, { list: list });
    },
    GraphQLUpdate: (list) => {
      const query = `mutation query($list: [MarkerInput]) {
        clearMarkers {
          name
        }
        setMarkers(list: $list) {
          name
        }
      }`;

      return axios.post(
        `${API_URL}/graphql`,
        {
          query,
          variables: {
            list,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    },
  },
};

export default api;
