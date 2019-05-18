const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const Papa = require("papaparse");
const url = symbol =>
  `https://www.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol=${symbol}&segmentLink=3&symbolCount=2&series=EQ&dateRange=3month&fromDate=&toDate=&dataType=PRICEVOLUMEDELIVERABLE`;
const [, , symbol] = process.argv;
const downloadHtml = (symbol, onHtml) => {
  request(
    {
      url: url(symbol),
      headers: {
        "user-agent": "Mozilla 5.0"
      }
    },
    (err, res, body) => {
      onHtml(body);
    }
  );
};

const readQuotes = function(text) {
  fs.writeFileSync(`../data/${symbol}.html`, text);
  main();
};

downloadHtml(symbol, readQuotes);

const main = function() {
  const html = fs.readFileSync(`../data/${symbol}.html`, "utf8");
  const $ = cheerio.load(html);
  const quotes = [];
  const names = [];
  $("table tbody tr th").each(function() {
    names.push(
      $(this)
        .text()
        .trim()
    );
  });

  $("table tbody tr:has(td)").each(function() {
    const tr = this;
    const quote = {};
    $("td", tr).each(function(index) {
      const td = this;
      quote[names[index]] = $(td).text();
    });
    quotes.push(quote);
  });
  const text = Papa.unparse(quotes);
  console.log(text)
  fs.writeFileSync(`../data/${symbol}.txt`, text);
};
