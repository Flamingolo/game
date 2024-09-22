import { Request, Response } from 'express';
import ItemService from '../service/itemService';

class ItemController {
  constructor(private itemService: ItemService) {}

  async getItem(req: Request, res: Response) {
    const itemId = req.params.id;
    try {
      const item = await this.itemService.getItem(itemId);
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

const itemController = new ItemController(new ItemService());
export default itemController;
