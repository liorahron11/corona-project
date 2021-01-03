import axios from 'axios';
import { IMapItem } from './map-item';
const API_URL = 'http://localhost:9000';

const api = {
  MapItems: {
    GetAll: () => {
      return axios.get(`${API_URL}/mapItems`);
    },
    GraphQLUpdate: (list) => {
      let newList = [];
      list.forEach((mapItem: IMapItem) => {
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
