import { Router } from "express";
import { getAll } from "../Services/MapItemsService";
import { IMapItem } from "../Models/MapItemModel";
const router: Router = Router();

router.get("/", (req: any, res: any) => {
  getAll().then((mapItemsList: Array<IMapItem>) => {
    res.send(mapItemsList);
  });
});

export default router;
