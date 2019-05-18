const fs = require("fs");
const data = require("../data/data.json");
const vegaFile = require("../data/vega.json");

const parsePrice = function(price) {
  return +price.split(",").join("");
};

const requiredValues = data => {
  const values = [];
  data.forEach((price, index) => {
    const openPrice = parsePrice(price["Open Price"]);
    values.push({ x: index, y: openPrice, c: 0 });
  });
  return values;
};

vegaFile.data[0].values = requiredValues(data);

fs.writeFileSync("../data/updatedVegaData.json", JSON.stringify( vegaFile));
