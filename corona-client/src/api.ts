import axios from 'axios';
import { MapItem } from './app/map-item';
const API_URL = 'http://localhost:9000';

const api = {
  mapItems: {
    GetAll: () => {
      return axios.get(`${API_URL}/mapItems`);
    },
    GraphQLUpdate: (list) => {
      let newList = [];
      list.forEach((mapItem: MapItem) => {
        newList.push({
          _id: mapItem.id,
          entity: mapItem.entity,
          actionType: mapItem.actionType,
          saved: true,
        });
      });

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
};

export default api;
