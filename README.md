# Adopt Ireland Scraper
## Getting started
### System dependencies
You’ll first need to download npm and node.  The method of doing so will depend on your platform but the best starting place is usually [here for npam](https://www.npmjs.com/get-npm) and [here for nodeJS](https://nodejs.org/en/download/).  The project has a dependency on **node v8.10.0** and **npm v6.0.0**.  You can change the installed version of nodeJS using either `n` or `nvm`.  

### Starting the project
The quickest way to get up and running is to preform the following commands

```shell
# Pull the project
git clone https://github.com/CleanCodeCompany/adopt-ireland-scraper.git

# Install depdendencies
cd adopt-ireland-scraper
npm install
```

At this point the project should be up and ready to go.  You can run the entire test suite using `npm test`.  If that all passes you know that the project is setup correctly and ready for your contribution.  

## Testing
We use `mocha` as our test runner and follow a fairly simple pattern.  

`./test/scraper/dogsAid/index.test.ts`
```javascript
import { expect } from 'chai';
import 'mocha';
import { helloWorld } from '../../../src/scraper/dogsAid/index';

describe('scraper -> dogsAid -> index', () => {
  it('should export hello world string', () => {
    expect(helloWorld()).to.equal('hello world');
  });
});

```

The `describe` should detail what we’re trying to test and then the `it` should describe the purpose of the individual test.  

## Project Structure
The general idea is to write a collection of self-contained scrapers.  We want each scraper to pass back a list of parsed data in a specific form.  Each scraper should have it’s own subdirectory containing the scraping and the parsing logic.  Any parsing logic that can be shared should reside in the `lib` folder.  The project root will pass a cutoff dat to the scraper which should return any new entities (entities in this case referring to adoptable dogs)  that exist after the cutoff date.  

## Saving
We will pass the parsed set of dogs to the JSON api sitting at `adopt-irelands.ie/api/v1`.  The ability to not connect directly to a database here should leave allow us to deploy the scraper as a microservice in the future.  **NOT IMPLEMENTED**
#side-projects/adopt-ireland/scraper
