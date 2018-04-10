const noodle = require('noodlejs');

//masonry_brick_a
//entry-date
const getOverviewLinks = () => {
  return noodle.query({  
    url: 'http://dogsaid.ie/adoptable-dogs',
    type: 'html',
    selector: '.masonry_brick_a',
    extract: 'href'
  })
  .then(({ results: [{results}] }) => {
    return results;
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
    }
  })
};

const getDogsAidData = async (stopTime = null) => {
  const [t, e, s, l, link] = await getOverviewLinks();
  const dog = await getDog(link);
  console.log('Doggo', JSON.stringify(dog, null, 2));
};

module.exports = getDogsAidData;