const axios = require("axios");
const { Router } = require("express");
const express = require("express");
const routerTMDB = express.Router();
const apiROUTE = "https://api.themoviedb.org/3";
const apiKEY = "5adb87b04f941ec5f443f41cafdd94cd";

const request = require("superagent");
//Uso de Superagent para pedidos HTTP

// request
// .get('/search')
// .then(res => {
//    // res.body, res.headers, res.status
// })
// .catch(err => {
//    // err.message, err.response
// });

//var Promise = require("bluebird"); //Módulo para manejar conjuntos de promesas

//Promesa, devuelve array de objetos:
// {
//     "name": "rock star",
//     "id": 2570
// },

///////////////////////////////// BOCETOS PARA TRAER LOS ID DE CADA PALABRA CLAVE DE TMDB
// // // function keywordToId(keyword){
// // //     return new Promise (function(){
// // //         const url = `${apiROUTE}/search/keyword?api_key=${apiKEY}&query=${keyword}&page=1`; //La API devuelve un objeto que dentro tiene una propiedad text que tiene toda la rta de la DB
// // //         request
// // //           .get(url)
// // //           .then((response) => JSON.parse(response.text)) // el objeto está en string, hay que parsearlo.
// // //           .then((ids_array) => ids_array.results) //DENTRO, la propiedad "results" trae el array de objetos {id:keyword}
// // //           .then((array)=>array)
// // //         // .then((result) => console.log(result));
// // //       })
// // // }
// // // // La búsqueda funciona, el resultado es que para la palabra buscada, devuelve un array de objetos. Pero luego en la ruta de discover la promesa queda pendiente
// // // const keyToId = (keyword)=>{
// // //   const url = `${apiROUTE}/search/keyword?api_key=${apiKEY}&query=${keyword}&page=1`; //La API devuelve un objeto que dentro tiene una propiedad text que tiene toda la rta de la DB
// // //   request
// // //     .get(url)
// // //     .then((response) => JSON.parse(response.text)) // el objeto está en string, hay que parsearlo.
// // //     .then((ids_array) => ids_array.results) //DENTRO, la propiedad "results" trae el array de objetos {id:keyword}
// // //     .then((array)=>array)
// // //   // .then((result) => console.log(result));
// // // }

//Trae la lista de géneros
routerTMDB.get("/genres", (req, res, next) => {
  const url = `${apiROUTE}/genre/movie/list?api_key=${apiKEY}&language=en-US`;
  request
    .get(url)
    .then((genres) => res.status(200).send(JSON.parse(genres.text)))
    .catch((err) => console.log(err));
});

//Ruta de única película con todos los detalles
routerTMDB.get("/movie/:id", (req, res, next) => {
  const id = req.params.id;
  const url = `${apiROUTE}/movie/${id}?api_key=${apiKEY}`;
  axios
    .get(url)
    .then((result) => result.data)
    .then((movie) => {
      // console.log(url);
      // console.log(id);
      // console.log(movie);
      res.status(200).send(movie);
    })
    .catch((err) => console.log(err));
});
//Ruta de programa de TV con todos los detalles
routerTMDB.get("/tv/:id", (req, res, next) => {
  const id = req.params.id;
  const url = `${apiROUTE}/tv/${id}?api_key=${apiKEY}`;
  axios
    .get(url)
    .then((result) => result.data)
    .then((tv) => res.status(200).send(tv))
    .catch((err) => console.log(err));
});

//DISCOVER Movie
// req.body={
//     region:, --> &region=
//     adult:, --> &include_adult= true/false
//     releasedFrom:, --> &primary_release_date.gte=
//     releasedTo:, --> primary_release_date.lte=
//     year:, --> &year=
//     cast:, --> &with_cast=
//     genres:, --> &with_genres=
//     keywords:, -->&with_keywords=
// }
routerTMDB.post("/discover", (req, res, next) => {
  let region = req.body.region || "";
  let adult = req.body.adult || "";
  let releasedFrom = req.body.releasedFrom || "";
  let releasedTo = req.body.releasedTo || "";
  let year = req.body.year || "";
  let cast = ""; //AGREGAR FUNCIONALIDAD DE CAST
  let genres = ""; //AGREGAR FUNCIONALIDAD DE genres
  let keywords = ""; //AGREGAR FUNCIONALIDAD DE KEYWORDS

  //Paso previo a armar query
  region ? (region = `&region=${region}`) : (region = "");
  // adult ? adult =`&include_adult=true` : adult =`&include_adult=false` --> Este filtro queda hardocdeado en false
  adult = `&include_adult=false`;
  releasedFrom != ""
    ? (releasedFrom = `&primary_release_date.gte=${encodeURIComponent(
        releasedFrom
      )}`)
    : (releasedFrom = "");
  releasedTo != ""
    ? (releasedTo = `&primary_release_date.gte=${encodeURIComponent(
        releasedTo
      )}`)
    : (releasedTo = "");
  year != "" ? (year = `&year=${year}`) : (year = "");
  cast != "" ? (cast = `&with_cast=${encodeURIComponent(cast)}`) : (cast = "");
  genres != ""
    ? (genres = `&with_genres=${encodeURIComponent(genres)}`)
    : (genres = "");

  /////////////////todo lo de keywords comentado. Resuelto esto, se puede aplicar a genres y cast.
  // El problema es que cuando quiero aplicar la función de búsqueda keywordToId (que es en realidad una promesa)
  //no encuentro la manera de que el vector que "mapea" al arreglo de palabras clave, espere a la respuesta de la DB de TMDB

  //Las Keywords hay que pasarlas a sus id
  //Doc: https://developers.themoviedb.org/3/search/search-keywords

  //   if (keywords != "") {
  //     keywords = keywords.split(" ");
  //     // Promise.mapSeries(keywords, function(keyword){return keywordToId(keyword)}).then(
  //     //   (result) => console.log(result)

  //     // const id_array = async ()=> {return await keywords.map(keyword => keywordToId(keyword))}
  //     // console.log(id_array())
  //     // keywords = `&with_keywords=${encodeURIComponent(keywords)}`
  //   } else keywords = "";

  const query =
    region +
    adult +
    releasedFrom +
    releasedTo +
    year +
    cast +
    genres +
    keywords;

  const url = `${apiROUTE}/discover/movie?api_key=${apiKEY}&sort_by=popularity.desc&include_video=true&page=1${query}`;

  axios
    .get(url)
    .then((movies) => {
      return res.status(200).send(JSON.parse(movies.text));
    })
    .catch((err) => console.log(err));
});

routerTMDB.post("/movies/titles", (req, res, next) => {
  const title = req.body.title.split(" ").join("+"); //reemplazo los espacios por "+"
  const type = req.body.type;
  const url = `${apiROUTE}/search/${type}?api_key=${apiKEY}&query=${title}`;
  axios
    .get(url)
    .then((result) => result.data.results)
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err));
});

module.exports = routerTMDB;
