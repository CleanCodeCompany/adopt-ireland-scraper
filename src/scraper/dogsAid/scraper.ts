// scraper.ts
import testData from '../../../testdata.json';

enum DataType {
  Breed,
  Sex,
  Age,
};

const isGender = (line: string): boolean => {
  if (line.startsWith('sex')) {
    return true;
  }
  if (line.startsWith('gender')) {
    return true;
  }
  return false;
};

const getLineType = (line: string) => {
  const lowercaseLine = line.toLocaleLowerCase();
  if (isGender(lowercaseLine)) {
    return lowercaseLine;
  }
  return `Couldnt find: + ${line}`;
};

// const clean = (data) => {
//   const cleanData = {};
// };

const extract = (dirtyList: Array<any>): any =>
  dirtyList
    .map(({ results }) => results[0].results)
    .map(data => data.details.map((line: string) => getLineType(line)));

console.log(extract(testData));
// import noodle from '../../../lib/noodle';

// const baseURL = 'http://dogsaid.ie/adoptable-dogs';

// const query = {
//   url: baseURL,
//   type: 'html',
//   selector: '.masonry_brick_a',
//   extract: 'href',
// };

// const getDog = (url: string): object => {
//   const dogQuery = {
//     url,
//     type: 'html',
//     map: {
//       picture: {
//         selector: '.attachment-post-thumbnail.size-post-thumbnail.wp-post-image',
//         extract: 'src',
//       },
//       details: {
//         selector: '.entry-content > p',
//         extract: 'text',
//       },
//     },
//   };
//   return noodle.query(dogQuery);
// };

const adpotableDogs = async () => {
  // const allDogs = await noodle.query(query);
  // const urls = allDogs.results[0].results;
  // const promises: any = [];
  // urls.forEach((url: string) => {
  //   promises.push(getDog(url));
  // });
  // const all = await Promise.all(promises);
  // console.log(JSON.stringify(all, null, 2));
};

export default adpotableDogs;
