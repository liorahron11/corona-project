import axios from 'axios';
import { MapItem } from './app/mapItem';
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
      let newList = [];
      list.forEach((mapItem: MapItem) => {
        newList.push({
          _id: mapItem.id,
          entity: mapItem.entity,
          actionType: mapItem.actionType,
        });
      });
      console.log(newList);

      const query = `mutation query($list: [MapItemInput]) {
        clearMarkers {
          _id
        }
        setMarkers(list: $list) {
          _id
        }
      }`;

      return axios.post(
        `${API_URL}/graphql`,
        {
          query,
          variables: {
            list: newList,
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
  mapItems: {
    GetAll: () => {
      return axios.get(`${API_URL}/mapItems`);
    },
    GetById: (id) => {
      return axios.get(`${API_URL}/mapItems/${id}`);
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
