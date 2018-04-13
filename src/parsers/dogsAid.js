const breeds = require('../../breeds.json');
const { distance, find } = require('../lib/distance');

const types = {
  BREED: 'BREED',
  AGE: 'AGE',
  SEX: 'SEX',
  OTHER: 'OTHER',
};

const getType = (string) => {
  let type;
  if (string.match(/[bB]reed/)) {
    type = types.BREED;
  }
  if (string.match(/[Aa]ge/)) {
    type = types.AGE;
  }
  if (string.match(/[Ss]ex/)) {
    type = types.SEX;
  }
  if (!type) {
    type = types.OTHER;
  }
  return {
    type,
    data: string,
  };
}

const parseBreed = () => {
  const original = "husky";
  // console.log(find(breeds, data));
  const ranking = breeds.map((breed) => {
    return {
      distance: distance(breed, original),
      breed,
      original,
    };
  });
  ranking.sort((l, r) => l.distance - r.distance);
  console.log(ranking[0]);
};

const getTypes = (stringList) => {
  const test = stringList.map(getType);
  test.forEach(({type, data}) => {
    if (type === types.BREED) {
      parseBreed(data);
    }
  })
  // return stringList.map(getType);
};


module.exports = getTypes;