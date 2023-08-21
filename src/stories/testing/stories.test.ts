import { ItemType } from '../constants/item.enum';
import { Item } from '../entities/item.entity';

const AUTHORS = [{ name: 'author1' }, { name: 'author2' }, { name: 'author3' }];

export const STORIES: Item[] = new Array(100).fill('').map((e, index) => ({
  title: new Array(101 - index)
    .fill('')
    .reduce((prev, e, currentIndex) => `${prev} keyword${currentIndex}`, ''),
  by: AUTHORS[index % AUTHORS.length].name,
  deleted: false,
  time: 1692593897 - 100 * index,
  type: ItemType.STORY,
}));
