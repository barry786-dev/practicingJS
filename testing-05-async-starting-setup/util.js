const { fetchData } = require('./http');

const loadTitle = () => {
  return fetchData().then((extractedData) => {
    const title = extractedData.title;
    const transformedTitle = title.toUpperCase();
    return transformedTitle;
  });
};

/* const printTitle = async () => {
  let returnedTitle;
  const response = await loadTitle();
  returnedTitle = response;
  //console.log(returnedTitle);
  return returnedTitle;
}; */
const printTitle = () => {
  return loadTitle().then((title) => {
    console.log(title);
    return title;
  });
};

exports.printTitle = printTitle;
exports.loadTitle = loadTitle;
