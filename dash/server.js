import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const SHEET_ID = "1iTebXd2hA7tqZp6QBEmyQe7DZDZZbmAB9c0irp-YMaI";

const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

app.get("/", async (req, res) => {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const rows = json.table.rows.map(r =>
      r.c.map(c => (c ? c.v : ""))
    );

    res.render("index", { rows });
  } catch (error) {
    res.send("Erro ao carregar planilha: " + error);
  }
});

app.listen(PORT, () => console.log(`Dashboard online: http://localhost:${PORT}`));
