const express = require("express");
const routerUsers = express.Router();
const { User, Fav, Watched } = require("../models");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const tokens = require("../middleware/tokens/tokens");
const { Op } = require("sequelize");

//ACCIONES DE ESTE ROUTER:
// - Crear Usuario
// - Login, con creación de token/cookie
// - Logout
// - Obtener universo de usuarios que no contiene al usuario propio

//Ruta de prueba de conexión
routerUsers.get("/", (req, res, next) => {
  res.send("LLegaste a Users");
});


//Devuelve todos los usuarios menos el logueado
routerUsers.post("/others", (req, res, next) => {
  User.findAll({attributes:['id','nickname']},{ where: { nickname: { [Op.not]: req.body.nickname } } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

//RUTA DE LOGIN
//Req.body=
// {
//     nickname:
//     password:
// }
routerUsers.post("/login", (req, res, next) => {
  const { nickname, password } = req.body;
  User.findOne({ where: { nickname } }).then((foundUser) => {
    if (!foundUser) res.status(203).send("User Not Found");
    else
      foundUser.validatePassword(password).then((validated) => {
        if (!validated) return res.status(203).send("Invalid Password");
        else {
          let payload = {
            id:foundUser.id,
            email: foundUser.email,
            nickname: foundUser.nickname,
            name: foundUser.name,
            lastname: foundUser.lastname,
            adult: foundUser.adult,
          };
          let token = tokens.generateToken(payload);
          res.cookie("token", token);
          res.status(200).send(payload);
        }
      });
  });
});

//Ruta de creación de nuevo usuario
// Req.body={
//     "nickname":"",
//     "name":"",
//     "lastname":"",
//     "email":"",
//     "age":0,
//     "password":""
// }
//   /api/users/new
routerUsers.post("/new", (req, res, next) => {
  //1. Busco si el mail está registradp existe. Si es así, devuelvo un 208 y msg
  //2. Si el mail no está registrado, busco el nickname
  //3. Si no existen en la DB mail ni nickname, creo usuario y lo mando al FRONT
  User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result)
        res.status(208).send({ response: "Email already registered" });
      else
        User.findOne({ where: { nickname: req.body.nickname } }).then(
          (result) => {
            if (result)
              res.status(208).send({ response: "Nickname is already in use" });
            else {
              newUser = {
                nickname: req.body.nickname,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                age: req.body.age,
                password: req.body.password,
              };
              User.create(newUser).then((result) =>
                res.status(201).send({ ...result })
              );
            }
          }
        );
    })
    .catch((err) => console.log(err));
});

routerUsers.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

module.exports = routerUsers;
