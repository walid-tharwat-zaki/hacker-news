import { Item } from '../entities/item.entity';

export class StoriesStatisticsUtils {
  static skipWords = [
    '–',
    '-',
    '_',
    'the',
    'The',
    'from',
    'From',
    'after',
    'After',
    'a',
    'A',
    'for',
    'to',
    'in',
    'and',
    'with',
    'by',
    'or',
    'of',
    'than',
    'that',
    'That',
    'is',
    'Is',
    'on',
    'at',
  ];

  static getMostOccurringWordsInTitles(stories: Item[], count: number) {
    const titlesWords = stories
      .filter((story) => !story.deleted)
      .map(
        (story) => story.title?.split(' ').filter((keyword) => keyword) ?? [],
      )
      .flat();
    const wordsOccurrence = Object.entries(
      titlesWords.reduce(
        (prev, curr) => {
          if (!prev[curr]) prev[curr] = 0;
          prev[curr]++;
          return prev;
        },
        StoriesStatisticsUtils.skipWords.reduce(
          (obj, cur) => ({ ...obj, [cur]: -1 * titlesWords.length }),
          {},
        ),
      ),
    );
    const topWords = [wordsOccurrence[0]];
    for (let word of wordsOccurrence) {
      let index = 0;
      for (; index < topWords.length && index < count + 1; index++) {
        if (word[1] > topWords[index][1]) break;
      }
      if (index < count) {
        topWords[index] = word;
      }
    }
    return topWords
      .filter((word) => (word[1] as number) > 0)
      .splice(0, 10)
      .map((item) => item[0]);
  }
}
