import { Request, Response } from 'express';
import ItemService from '../service/itemService';

class ItemController {
  static async getItem(req: Request, res: Response) {
    const itemId = req.params.id;
    try {
      const item = await ItemService.getItem(itemId);
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default ItemController;
