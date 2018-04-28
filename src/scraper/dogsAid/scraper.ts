// scraper.ts
import noodle from '../../../lib/noodle';

const baseURL = 'http://dogsaid.ie/adoptable-dogs';

const query = {
  url: baseURL,
  type: 'html',
  selector: '.masonry_brick_a',
  extract: 'href',
};

const getDog = (url: string): object => {
  const dogQuery = {
    url,
    type: 'html',
    map: {
      picture: {
        selector: '.attachment-post-thumbnail.size-post-thumbnail.wp-post-image',
        extract: 'src',
      },
      details: {
        selector: '.entry-content > p',
        extract: 'text',
      },
    },
  };
  return noodle.query(dogQuery);
};

const adpotableDogs = async () => {
  const allDogs = await noodle.query(query);
  const urls = allDogs.results[0].results;
  const promises: any = [];
  urls.forEach((url: string) => {
    promises.push(getDog(url));
  });
  const all = await Promise.all(promises);
  console.log(JSON.stringify(all, null, 2));
};

export default adpotableDogs;
