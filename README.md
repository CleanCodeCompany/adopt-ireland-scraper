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

## Adding a scraper
There are three parts to adding a new scraper, each encapsulated in its own file:
- `index.ts`
- `scraper.ts`
- `parser.ts`

### The Scraper
The scraper will have to run to the site using our scraping library and return all the required data.  Ideally this should be done in as little trips as possible.  The scraper should accept a cutoff date and only return data to the scraper base (`index.ts`) that was entered after that date.  

### The Parser
Parsing is likely to be tricky, different websites have different ways of representing breeds, ages, genders and all the other information we need.  The parser should make an attempt to normalize the information returned from the scraper.  There are helpers in the `lib/` folder to aid with this but it will be important to tailor them a bit to the individual use case.  

### Passing data back up
The goal of each individual parser is to take a date and be handed back a list of JSON objects representing the information that needs to be added to our data warehouse.  Inside the `index.ts` we should expose a function like this:

```javascript
// index.ts
const getAdoptable = (date: Date) => {
  // ... logic for scraping and parsing adoptable animals
};

const getInfo = () => {
  // ... retuns a data object about the site containing
  // the site url, locality and other relevent information
};

export { getAdoptable, getInfo };

```

We’ll also need to add the scraper import to the `src/scrapers/index.ts` file to ensure it is ran as part of the whole suite of scrapers.  

A validator will be run against all inputs passed back up.  The data structure we’re looking for is:

```javascript
{
  breed: Breed, // One of the enum values for breed
  age: int, // in weeks
  sex: Sex, // One fo the enum values for sed
  breedString: string, // The pre-parsed string for breed
  ageString: string, // The pre-parsed string for age
  sexString: string, // The pre-parsed string for sex
  certainty: float, // 0 - 1 the level of certainty that the given information is correct.
}
```

If the certainty is lower then 75% ( < 0.75 ) then the information will be added to the database but not displayed until a human has verified that the information is correct or has manually filled in the correct details.  We want to avoid this as much as possible but we also need to understand that there are going to be cases that this is unavoidable.  If a scraper regularly outputs low certainty scores then we may need to reevaluate the implementation.   

## Project Structure
```
src/
  - index.ts
  - scrapers/
    - index.ts
    - siteName
      - index.ts
      - scraper.ts
      - parser.ts
```
If you are implementing a new parser ideally you would create a subfolder under _scrapers_  with the name of the target site.   The `scraper.js` file should contain all the logic to fetch information from the target site while the `parser.js` file should contain the logic for parsing that data into a more correct format.  

## Contribution Guidelines
### Tests
A new PR for a scraper will not be accepted unless all tests and lint rules are 100% passing.  Ideally there should be a new test added for both the `scraper.ts` and `parser.ts` files.  The more the merrier.

### Certainty Scores
As was described briefly, since our system has to do a bit of deductive reasoning there’s a chance that it will get things wrong occasionally.  Ideally we want to minimize this and we expect new scrapers to have an average certainty of over 75%.  If for whatever reason this isn’t achievable, submit the PR and provide reasoning as to why you think this is not possible for the particular site (there very well may be sites that are too complex to automatically parse data from).  

## Git Strategy
The general strategy is to branch off `master`, do your work under a feature branch following the naming convention `<your name>/<name-of-target-site>`.  If you’re not adding a new scraper or modifying an existing one then the convention `<your name>/<brief description>` should be fine.  

Once your branch is done and tests / lint rules are passing then submit a PR.  One of the project maintainers will swing by to double check everything and merge it up.  If we have review feedback, we’ll mark as such and do our best to give some suggestions.  


The process should look something like
```shell
// Fork our repository on github / clone

// Create a new branch locally and check it out
git checkout -b cfitzsimons/dogs-trust

// ... make my changes

// Save those changes
git add .
git commit -m "I wrote a scraper!"

// Push them up to the repo
git push

```


## FAQ
### The data from the scraper can’t be properly parsed, what should I do?
Ensure your set the certainty variable to below 75% (.75 or lower) and it will not be displayed to a user until it is verified manually.