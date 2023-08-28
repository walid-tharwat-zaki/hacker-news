import { ItemType } from '../constants/item.enum';

export class Item {
  id: number;
  title: string;
  time: number;
  type: ItemType;
  by: string;
  deleted: boolean;
}
