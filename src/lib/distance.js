const levenshtein = require('fast-levenshtein');

const normalize = (target) => {
  const newTarget = target.toUpperCase();
  return newTarget.replace(/[^a-zA-Z]/g, '');
};


const distance = (source, target) => {
  const trueSource = normalize(source);
  const trueTarget = normalize(target);
  return levenshtein.get(trueSource, trueTarget);
};

module.exports = {
  distance,
};