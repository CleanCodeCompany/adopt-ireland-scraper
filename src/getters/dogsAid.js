const noodle = require('../lib/noodle');
const parser = require('../parsers/dogsAid');
//masonry_brick_a
//entry-date

const parse = ({ results: [{results}] }) => results;

const getOverviewLinks = () => {
  return noodle.query({  
    url: 'http://dogsaid.ie/adoptable-dogs',
    type: 'html',
    selector: '.masonry_brick_a',
    extract: 'href'
  })
  .then((result) => {
    return parse(result);
  });
};

const getDog = (url) => {
  return noodle.query({
    url,
    type: 'html',
    map: {
      image: {
        selector: '.attachment-post-thumbnail',
        extract: 'src',
      },
      strings: {
        selector: '.entry-content p',
      }
    }
  }).then(parse);
};

const getDogsAidData = async (stopTime = null) => {
  const [link] = await getOverviewLinks();
  const dog = await getDog(link);
  console.log(dog.strings);
  console.log('Doggo', JSON.stringify(parser(dog.strings), null, 2));
  noodle.stopCache();
};

module.exports = getDogsAidData;