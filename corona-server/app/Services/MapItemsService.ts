import MapItemModel, { IMapItem } from "../Models/MapItemModel";

export async function getAll(): Promise<Array<IMapItem>> {
  return await MapItemModel.find();
}

export async function addList(mapItemsList: any): Promise<IMapItem> {
  return await MapItemModel.insertMany(mapItemsList);
}

export async function clean(): Promise<Array<IMapItem>> {
  return await MapItemModel.deleteMany({});
}
