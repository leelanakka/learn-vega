const PORT = process.env.PORT || 9000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

const htmlData = function() {
  return fs.readFileSync("./data/some.html", "utf8");
};
const vegaData = () => {
  return fs.readFileSync("./data/updatedVegaData.json", "utf8");
};

const renderVegaPage = function(req, res) {
  console.log(vegaData())
  res.send(JSON.parse(vegaData()));
};

const handle = function(req, res) {
  res.send(htmlData());
};

const signup = function(req, res) {
  const text = req.body;
  res.send(text);
};

app.use(bodyParser.text());
app.use(bodyParser.json());

app.post("/transfer", handle);
app.post("/signup", signup);
app.get("/vegaPage", renderVegaPage);
app.use(handle);

app.listen(PORT, () => console.log("listening on ", PORT));
