import fs from "fs";
import path from "path";

interface Row {
  date: string;
  category: string;
  amout: number;
  currency: string;
  description: string;
  transactionDate: string;
}

const data: Row[] = require("./clean.json");

const categories = [...new Set(data.map((e) => e.category))];

const generateMatrice = () => {
  const output: any = {};

  const dates = [];
  for (let year = 2020; year <= 2022; year++) {
    for (let month = 1; month <= 12; month++) {
      dates.push(`${year}-${month}`);
    }
  }
  output.dates = dates;

  categories.forEach((category) => {
    output[category] = [];

    // loop month by month from 2020-01 to 2022-12
    for (let year = 2020; year <= 2022; year++) {
      for (let month = 1; month <= 12; month++) {
        const date = `${year}-${month}`;
        const amout = data
          .filter((e) => {
            const [year2, month2] = e.date.split("-");
            return date === `${year2}-${+month2}` && e.category === category;
          })
          .reduce((a, b) => a + b.amout, 0);

        output[category].push(amout.toFixed(2).replace(".", ",") || null);
      }
    }
  });

  return Object.keys(output)
    .map((e: string) => {
      // @ts-ignore
      return `${e};${output[e].join(";")}`;
    })
    .join("\n");
};

fs.writeFileSync(path.join(__dirname, "./output.csv"), generateMatrice());
