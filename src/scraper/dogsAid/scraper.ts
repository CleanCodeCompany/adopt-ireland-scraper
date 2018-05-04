// scraper.ts
import testData from "../../../testdata.json";

enum LineType {
  Breed = "Breed",
  Gender = "Gender",
  Age = "Age",
  Unknown = "Unknown",
}

const isGender = (line: string): boolean =>
  line.startsWith("sex") || line.startsWith("gender");

const isAge = (line: string): boolean =>
  line.startsWith("age");

const isBreed = (line: string): boolean =>
  line.startsWith("breed");

const getLineType = (line: string): LineType => {
  const lowercaseLine = line.toString().toLocaleLowerCase();
  if (isGender(lowercaseLine)) {
    return LineType.Gender;
  }
  if (isAge(lowercaseLine)) {
    return LineType.Age;
  }
  if (isBreed(lowercaseLine)) {
    return LineType.Breed;
  }
  return LineType.Unknown;
};

const extract = (dirtyList: any[]): any =>
  dirtyList
    .map(({ results }) => results[0].results);
    // .map((data) => data);

const getLineTypes = (details: any) => {
  const test = details.map((thingy: string) => {
    // console.log('Line:', thingy);
    const lineType = getLineType(thingy);
    // console.log(lineType);
    return {
      line: thingy,
      lineType,
    };
  });
  return test;
};
const scrapedDogs = extract(testData);
scrapedDogs.forEach((dog: any) => {
  const dogLines = getLineTypes(dog.details);
  const dogPic = dog.picture;
  console.log({
    details: dogLines.filter((line: any) => line.lineType !== LineType.Unknown),
    picture: dogPic,
  });
});
// console.log(getLineTypes(allData.map((data: any) => data.details)));

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
