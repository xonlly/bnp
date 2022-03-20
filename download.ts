import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { Transactions } from "./data.type";

async function download(offset = 0) {
  const response = await fetch(
    `https://api.monbusinessassistant.com/v1/bank_entries/search?include=attachments&sort=-date&posted_date=gte:2020-01-01%20AND%20lte:2023-12-31&offset=${offset}&limit=100`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Basic ${process.env.BEARER}`,
      },
    }
  );
  const json: Transactions = await response.json();

  fs.writeFileSync(
    path.join(__dirname, "data", `data-${offset}.json`),
    JSON.stringify(json)
  );

  if (json.has_next_page === "true") {
    await download(offset + 100);
  }
}

download();
