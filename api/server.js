// Configuración del server
const db = require("./db");
const express = require("express");
const app = express();
const routes = require("./routes");
const config = require("./db/config");
const cookies = require("cookie-parser"); // siempre agregar esto para poder trabajar con cookies
const cors=require("cors")

//Middlewares
app.use(express.json());
app.use(cookies());
app.use(cors()) // Esto permite que el server acepte pedidos HTTP desde otros dominios

//Routing
app.use("/api", routes);
app.get("/*", (req, res) => {
  res.send("Nada por acá");
});

//DB
//{ force: true }
db.sync().then(() => {
  console.log("DataBase Connected");
  app.listen(config.PORT, () => {
    console.log(`Server listening at port ${config.PORT}`);
  });
});
