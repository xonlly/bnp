import { Transactions } from "./data.type";
import path from "path";
import fs from "fs";

const concatAndCleanData = () => {
  fs.readdir(path.join(__dirname, "data"), (err, files) => {
    const soldes: any = {};
    const cleanData: any = [];
    // lecture de chaque fichier json data-100
    files.forEach((file) => {
      const data: Transactions = JSON.parse(
        fs.readFileSync(path.join(__dirname, "data", file), "utf8")
      );

      data.results.forEach((e) => {
        const transaction_date = e.transaction_date;
        const [year, month] = transaction_date.split("-");
        const key = `${year}-${month}`;

        cleanData.push({
          date: e.transaction_date,
          category: e.reconciled_documents[0]?.budget_category?.name || "?",
          amout: e.amount,
          currency: e.currency_iso_code,
          description: e.description,
          transactionDate: e.transaction_date,
        });

        soldes[key] = (soldes[key] || 0) + e.amount;
      });
    });

    const filePath = path.join(__dirname, "clean.json");
    fs.writeFileSync(filePath, JSON.stringify(cleanData));

    console.log(
      soldes,
      // @ts-ignore
      Object.values(soldes).reduce((a, b) => a + b, 0)
    );
  });
};

concatAndCleanData();
