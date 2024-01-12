const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    icon: path.join(__dirname, "assets/icons/icon.png"),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("./src/index.html");
  win.setMenu(null);
  win.once("ready-to-show", () => {
    win.show();
  });
};

app.whenReady().then(() => {
  createWindow();
});


const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const appExpress = express();
const port = 3000;

appExpress.use(bodyParser.urlencoded({ extended: true }));
appExpress.use(bodyParser.json());

//Conectando o banco de dados sqlite
const db = new sqlite3.Database("database.db");

db.run(
  `CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf INTEGER, adv TEXT, fase TEXT, desc TEXT)`
);

//CRUD

//Listar clientes

appExpress.get("/customers", (req, res) => {
  db.all("SELECT * FROM customers", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      customers: rows,
    });
  });
});

//Adicionar novo cliente
appExpress.post("/customers", (req, res) => {
  const { nome, cpf, adv, fase, desc } = req.body;
  db.run(
    "INSERT INTO customers (nome, cpf, adv, fase, desc) VALUES (?,?,?,?,?)",
    [nome, cpf, adv, fase, desc],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

//Deletar usuário

appExpress.delete("/customers/:id", (req, res) => {
  const customerID = req.params.id;
  db.run("DELETE FROM customers WHERE id =?", [customerID], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Usuário deletado com sucesso" });
  });
});

//CRUD

db.run(
  `CREATE TABLE IF NOT EXISTS meetings(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, hora TEXT, data TEXT )`
);

//Listar reuniões

appExpress.get("/meetings", (req, res) => {
  db.all("SELECT * FROM meetings", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      meetings: rows,
    });
  });
});

//Adicionar nova reunião
appExpress.post("/meetings", (req, res) => {
  const { nome, hora, data } = req.body;
  db.run(
    "INSERT INTO meetings (nome, hora, data) VALUES (?,?,?)",
    [nome, hora, data],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

//Deletar reunião

appExpress.delete("/meetings/:id", (req, res) => {
  const meetingsID = req.params.id;
  db.run("DELETE FROM meetings WHERE id =?", [meetingsID], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Reunião deletada com sucesso" });
  });
});

//Iniciando servidor
appExpress.listen(port, () => {
  console.log(`Servidor rodando em  http://localhost:${port}`);
});
