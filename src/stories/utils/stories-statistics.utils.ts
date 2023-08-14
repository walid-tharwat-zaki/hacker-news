import { Item } from '../entities/item.entity';

export class StoriesStatisticsUtils {
  static getMostOccurringWordsInTitles(stories: Item[], count: number) {
    const titlesWords = stories.map((story) => story.title.split(' ')).flat();
    const wordsOccurrence = Object.entries(
      titlesWords.reduce((prev, curr) => {
        if (!prev[curr]) prev[curr] = 0;
        prev[curr]++;
        return prev;
      }, {}),
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
    return topWords.splice(0, 10).map((item) => item[0]);
  }
}
