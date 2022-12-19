const express = require("express");
const routerWatched = express.Router();
const { User, Fav, Watched } = require("../models");

const auth = require("../middleware/auth");

//Este Router permite
//  - Obtener lista de favoritos de un tipo (tv/movie)
//  - Agregar elemento a lista de favoritos
//  - Eliminar elemento de lista de favoritos

//Ruta que recupera la info de la DB
//RECORDAR mandar en TODAS LAS RUTAS en el req.body info del usuario
// req.body={
//     info_gral_de_busqueda,
//     user:{nickname:user_nickname}
// }

//agregar auth
routerWatched.post("/myWatched", (req, res, next) => {
  User.findOne({ where: { nickname: req.body.nickname } }).then((foundUser) => {
    Watched.findAll({
      where: { userId: foundUser.dataValues.id }
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  });
});

// Busca el Usuario propio en la DB
// Toma el ID de ese usuario
// Crea la nueva entrada en Favs, y le asigna el ID del usuario al campo userId
//agregar auth
//ej:
// {
//     "type":"movie",
//     "recId":"0001",
//     "nickname":"Primero"
// }

routerWatched.post("/addWatched", (req, res, next) => {
  User.findOne({ where: { nickname: req.body.nickname } })
    .then((foundUser) => {
      let newWatched = {
        type: req.body.type,
        recId: req.body.recId,
      };
      Watched.create(newWatched)
        .then((result) => result.setUser(foundUser)) //Recordar que en models, definimos Fav.belongsTo(User,{as:"user"})
        .then((result) => res.send(result));
    })
    .catch((err) => console.log(err));
});

routerWatched.post("/remWatched/:id", (req, res, next) => {
  Watched.destroy({ where: { recId: req.params.id,userId:req.body.userId } }).then(() => {
    res.status(202).send();
  });
});

module.exports = routerWatched;
