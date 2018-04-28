# Adopt Ireland Scraper
## Getting started
The project should be relatively straight forward to get up and running with.  As of writing this guide we support the following technologies:
- NodeJS v8.10.0
- NPM v6.0.0

Once both of those dependencies are installed you can just run

`npm install`

to get the project up and running.  The dev environment can be started by running `npm start`.  That will kickoff `nodemon` which will watch for any changes and automatically reload the project.  If there are any problems it will crash and wait for changes before restarting.  

## Testing
**NOT IMPLEMENTED**

## Project Structure
The general idea is to write a collection of self-contained scrapers.  We want each scraper to pass back a list of parsed data in a specific form.  Each scraper should have it’s own subdirectory containing the scraping and the parsing logic.  Any parsing logic that can be shared should reside in the `lib` folder.  The project root will pass a cutoff dat to the scraper which should return any new entities (entities in this case referring to adoptable dogs)  that exist after the cutoff date.  

## Saving
We will pass the parsed set of dogs to the JSON api sitting at `adopt-irelands.ie/api/v1`.  The ability to not connect directly to a database here should leave allow us to deploy the scraper as a microservice in the future.  **NOT IMPLEMENTED**
#side-projects/adopt-ireland/scraper
