import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import readline from "readline";
import TrieSearch from "trie-search";
import path from "path";
import { splitByW } from "string-split-by-whitespace";
import isEmpty from "lodash.isempty";
import sortBy from "lodash.sortby";
import isNaN from "lodash.isnan";

const app = express();
const port = 8080;

const queries = new TrieSearch();

const NUM_RESULTS = 10;
async function processLineByLine() {
  const fileStream = fs.createReadStream(path.resolve(`queries.txt`));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let index = 0;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const [AnonID, Query, QueryTime, ItemRank, ClickURL] = splitByW(line);
    if (!isNaN(parseInt(AnonID)))
      queries.map(Query, {
        AnonID,
        Query,
        QueryTime,
        ItemRank,
        ClickURL,
        identifier: index++,
      });
  }
}

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/search/:prefix", (req, res) => {
  if (isEmpty(queries)) res.error("Not yet ready. Please try again later");
  const prefix = req.params.prefix;
  if (!prefix) res.error("Please specify a prefix");
  const results = queries.search(req.params.prefix).slice(0, NUM_RESULTS);
  res.json(sortBy(results, ["ItemRank", "QueryTime"]));
});

app.listen(port, () => {
  processLineByLine().then((res) => {
    console.log(`listening on port ${port}`);
  });
});
