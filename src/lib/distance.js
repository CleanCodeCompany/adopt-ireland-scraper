const levenshtein = require('fast-levenshtein');
const ld = require("levenshtein-distance");

const normalize = (target) => {
  let newTarget = target.toUpperCase();
  return newTarget.replace(/[^a-zA-Z]/g, '');
};

const find = (sources, target) => {
  const normalSources = sources.map(normalize);
  const normalTarget = normalize(target);
  const leven = new ld(sources);
  leven.find(target, (res) => {
    console.log('Found?', res);
  });
};

const distance = (source, target) => {
  const trueSource = normalize(source);
  const trueTarget = normalize(target);
  return levenshtein.get(trueSource, trueTarget);
};

module.exports = {
  distance,
  find, 
};