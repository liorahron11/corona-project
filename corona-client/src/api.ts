import axios from 'axios';
import { IMapItem } from './map-item';
import { environment } from './environments/environment';
const API_URL: string = environment.apiURL;

const api = {
  MapItems: {
    GetAll: () => {
      return axios.get(`${API_URL}/mapItems`);
    },
    GraphQLUpdate: (list) => {
      let newList: Object[] = [];
      list.forEach((mapItem: IMapItem) => {
        newList.push({
          _id: mapItem.id,
          entity: mapItem.entity,
          actionType: mapItem.actionType,
          saved: true,
        });
      });

      const query: string = `mutation query($list: [MapItemInput]) {
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
