const express = require("express");
const routerFavs = express.Router();
const { User, Fav, Watched } = require("../models");

const auth = require("../middleware/auth");
const token = require("../middleware/tokens/tokens");

//Este Router permite
//  - Obtener lista de favoritos de un tipo (tv/movie)
//  - Agregar elemento a lista de favoritos
//  - Eliminar elemento de lista de favoritos

//Ruta que recupera la info de la DB
//RECORDAR mandar en TODAS LAS RUTAS en el req.body la info del usuario
// req.body={
//     info_gral_de_busqueda,
//     user:{nickname:user_nickname}
// }

//RECORDAR: se tiene que enviar el tipo (TV o MOVIE)

//agregar auth
//TRAE TODAS LAS FAVORITAS DE UN USUARIO

routerFavs.post("/myFavs", (req, res, next) => {
  User.findOne({ where: { nickname: req.body.nickname } }).then((foundUser) => {
    Fav.findAll({
      where: { userId: foundUser.dataValues.id },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  });
});

//Ruta para encontrar favoritos de otro usuario, según su userId
routerFavs.post("/otherFavs", (req, res, next) => {
  Fav.findAll({ where: { userId: req.body.userId } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

// Busca el Usuario propio en la DB
// Toma el ID de ese usuario
// Crea la nueva entrada en Favs, y le asigna el ID del usuario al campo userId
//agregar auth

// {
//     "type":"movie",
//     "recId":"0001",
//     "nickname":"Primero"
// }
//agregar auth

routerFavs.post("/addFav", (req, res, next) => {
  User.findOne({ where: { nickname: req.body.nickname } })
    .then((foundUser) => {
      const newFav = {
        type: req.body.type,
        recId: req.body.recId,
      };
      Fav.create(newFav)
        .then((result) => result.setUser(foundUser)) //Recordar que en models, definimos Fav.belongsTo(User,{as:"user"})
        .then((result) => res.send(result));
    })
    .catch((err) => console.log(err));
});

//agregar auth
routerFavs.post("/remFav/:id", (req, res, next) => {
  Fav.destroy({ where: { recId: req.params.id,userId:req.body.userId } }).then(() => {
    res.status(202).send();
  });
});

module.exports = routerFavs;
