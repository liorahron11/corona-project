import { City } from './city';

const GROUND_HEIGHT: number = 0;
const DEFAULT_FLY_POSITION: number = 50000;

export const CITIES: City[] = [
  {
    id: 1,
    name: 'באר שבע',
    position: Cesium.Cartesian3.fromDegrees(
      34.7938276617,
      31.2494783975,
      GROUND_HEIGHT
    ),
    flyPosition: Cesium.Cartesian3.fromDegrees(
      34.7938276617,
      31.2494783975,
      DEFAULT_FLY_POSITION
    ),
  },
  {
    id: 2,
    name: 'תל אביב',
    position: Cesium.Cartesian3.fromDegrees(
      34.7759582415,
      32.0579568361,
      GROUND_HEIGHT
    ),
    flyPosition: Cesium.Cartesian3.fromDegrees(
      34.7759582415,
      32.0579568361,
      DEFAULT_FLY_POSITION
    ),
  },
  {
    id: 3,
    name: 'חיפה',
    position: Cesium.Cartesian3.fromDegrees(
      34.9813095846,
      32.8131240091,
      GROUND_HEIGHT
    ),
    flyPosition: Cesium.Cartesian3.fromDegrees(
      34.9813095846,
      32.8131240091,
      DEFAULT_FLY_POSITION
    ),
  },
  {
    id: 4,
    name: 'ירושלים',
    position: Cesium.Cartesian3.fromDegrees(
      35.2233397574,
      31.7725201786,
      GROUND_HEIGHT
    ),
    flyPosition: Cesium.Cartesian3.fromDegrees(
      35.2233397574,
      31.7725201786,
      DEFAULT_FLY_POSITION
    ),
  },
  {
    id: 5,
    name: 'אילת',
    position: Cesium.Cartesian3.fromDegrees(
      34.9494684182,
      29.5658078392,
      GROUND_HEIGHT
    ),
    flyPosition: Cesium.Cartesian3.fromDegrees(
      34.9494684182,
      29.5458078392,
      DEFAULT_FLY_POSITION
    ),
  },
];
