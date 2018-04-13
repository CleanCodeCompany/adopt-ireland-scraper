const dogsAid = require('../../src/getters/dogsAid');
// const parser = requrie('.')

describe('getters -> dogsAid', () => {
  it('should get valid data', async () => {
    await dogsAid();
  });
});
