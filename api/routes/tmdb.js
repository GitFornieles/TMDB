const axios = require("axios");
const { Router } = require("express");
const express = require("express");
const routerTMDB = express.Router();
const apiROUTE = "https://api.themoviedb.org/3";
const apiKEY = "5adb87b04f941ec5f443f41cafdd94cd";
//Sale de hacer un get a la ruta https://api.themoviedb.org/3/configuration?api_key=5adb87b04f941ec5f443f41cafdd94cd
const apiConfig = {
  images: {
    base_url: "http://image.tmdb.org/t/p/",
    secure_base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    profile_sizes: ["w45", "w185", "h632", "original"],
    still_sizes: ["w92", "w185", "w300", "original"],
  },
  change_keys: [
    "adult",
    "air_date",
    "also_known_as",
    "alternative_titles",
    "biography",
    "birthday",
    "budget",
    "cast",
    "certifications",
    "character_names",
    "created_by",
    "crew",
    "deathday",
    "episode",
    "episode_number",
    "episode_run_time",
    "freebase_id",
    "freebase_mid",
    "general",
    "genres",
    "guest_stars",
    "homepage",
    "images",
    "imdb_id",
    "languages",
    "name",
    "network",
    "origin_country",
    "original_name",
    "original_title",
    "overview",
    "parts",
    "place_of_birth",
    "plot_keywords",
    "production_code",
    "production_companies",
    "production_countries",
    "releases",
    "revenue",
    "runtime",
    "season",
    "season_number",
    "season_regular",
    "spoken_languages",
    "status",
    "tagline",
    "title",
    "translations",
    "tvdb_id",
    "tvrage_id",
    "type",
    "video",
    "videos",
  ],
};

// De acá sacamos tamaños para el poster-> w342 y w720 (info que necesitamos en la generación de la ruta para obtener la imagen)

//Trae la lista de géneros de películas
routerTMDB.get("/movieGenres", (req, res, next) => {
  const url = `${apiROUTE}/genre/movie/list?api_key=${apiKEY}&language=en-US`;
  axios
    .get(url)
    .then((result) => {
      let genres = result.data.genres;
      genres.unshift("");
      res.status(200).send(genres);
    })
    .catch((err) => console.log(err));
});

//Trae la lista de géneros de Series
routerTMDB.get("/tvGenres", (req, res, next) => {
  const url = `${apiROUTE}/genre/tv/list?api_key=${apiKEY}&language=en-US`;
  axios
    .get(url)
    .then((result) => {
      let genres = result.data.genres;
      genres.unshift("");
      res.status(200).send(genres);
    })
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
routerTMDB.post("/movieDiscover", async (req, res, next) => {
  //res.send(req.body)
  //La herramienta "discover" de la API de TMDB, para el caso de keywords, cast y genres funciona buscando los ID de esos elementos (ej, Jim carrey es el ID 203)
  //Entonces, para cada uno de esos elementos, tengo que armar la cadena de IDs que busco (si cast="Jim Carrey, Tom Jones", lo que busco es with_cast=203,506)

  let releasedAfter = req.body.releasedAfter || "";
  let releasedBefore = req.body.releasedBefore || "";
  let cast = req.body.cast || "";
  let genres = req.body.genres || ""; //Ya viene el ID del género
  let keywords = req.body.keywords || ""; //AGREGAR FUNCIONALIDAD DE KEYWORDS

  //Paso previo a armar query
  //Este filtro queda hardcodeado en false

  adult = `&include_adult=false`;
  // releasedAfter y releasedBefore ya vienen bien desde el FRONT

  //CAST -> llega un string se actores separador por coma. Lo paso a array, y tengo que buscar el id de cada actor. luego ese vector de IDs lo unifico en string separado por comas; y esto va a la URL
  if (cast != "") {
    const url = `${apiROUTE}/search/person/?api_key=${apiKEY}`;
    cast = cast.split(",");
    cast = cast.map((element) => encodeURIComponent(element.trim()));
    let castPromises = cast.map(
      async (element) =>
        await axios.get(
          `${url}&language=en-US&query=${element}&page=1&include_adult=false`
        )
    );
    cast = await Promise.all(castPromises);
    cast = cast.map((element) => element.data.results[0].id);
    cast = `&with_cast=${encodeURIComponent(cast.join(","))}`;
  } else cast = "";
  //GENRES
  if (genres != "") {
    genres = `&with_genres=${genres}`;
  } else cast = "";
  //KEYWORDS -> TMDB tiene una DB de keywords (varias son frases). Ej, si busco "alien" va a buscar "alien","alien covenant","alien planet",etc. Pero para usar en discover, necesito todo eso en IDs
  if (keywords != "") {
    console.log("key if");
    const url = `${apiROUTE}/search/keyword?api_key=${apiKEY}`;
    keywords = await axios.get(
      `${url}&query=${encodeURIComponent(keywords)}&page=1`
    );
    keywords = keywords.data.results.map((element) => element.id);
    keywords = keywords.join(",");
    keywords = `&with_keywords=${encodeURIComponent(keywords)}`;
  } else keywords = "";
  //FECHAS
  if (releasedAfter != "") {
    //releasedAfter=releasedAfter.replace(/-/g,"%2F")
    releasedAfter = `&release_date.gte=${releasedAfter}`;
  } else releasedAfter = "";
  if (releasedBefore != "") {
    //releasedBefore=releasedBefore.replace(/-/g,"%2F")
    releasedBefore = `&release_date.lte=${releasedBefore}`;
  } else releasedBefore = "";

  const url = `${apiROUTE}/discover/movie?api_key=${apiKEY}&sort_by=popularity.desc${adult}&include_video=false&page=1${releasedAfter}${releasedBefore}${cast}${genres}${keywords}`;

  axios
    .get(url)
    .then((movies) => {
      console.log(movies.data.results);
      return res.status(200).send(movies.data.results);
    })
    .catch((err) => console.log(err));
});

//DISCOVER TV
routerTMDB.post("/tvDiscover", async (req, res, next) => {
  //res.send(req.body)
  //La herramienta "discover" de la API de TMDB, para el caso de keywords, cast y genres funciona buscando los ID de esos elementos (ej, Jim carrey es el ID 203)
  //Entonces, para cada uno de esos elementos, tengo que armar la cadena de IDs que busco (si cast="Jim Carrey, Tom Jones", lo que busco es with_cast=203,506)

  let releasedAfter = req.body.releasedAfter || "";
  let releasedBefore = req.body.releasedBefore || "";
  let genres = req.body.genres || ""; //Ya viene el ID del género
  let keywords = req.body.keywords || ""; //AGREGAR FUNCIONALIDAD DE KEYWORDS

  //Paso previo a armar query

  //GENRES
  if (genres != "") {
    genres = `&with_genres=${genres}`;
  } else cast = "";
  //KEYWORDS -> TMDB tiene una DB de keywords (varias son frases). Ej, si busco "alien" va a buscar "alien","alien covenant","alien planet",etc. Pero para usar en discover, necesito todo eso en IDs
  if (keywords != "") {
    console.log("key if");
    const url = `${apiROUTE}/search/keyword?api_key=${apiKEY}`;
    keywords = await axios.get(
      `${url}&query=${encodeURIComponent(keywords)}&page=1`
    );
    keywords = keywords.data.results.map((element) => element.id);
    keywords = keywords.join(",");
    keywords = `&with_keywords=${encodeURIComponent(keywords)}`;
  } else keywords = "";
  //FECHAS
  if (releasedAfter != "") {
    //releasedAfter=releasedAfter.replace(/-/g,"%2F")
    releasedAfter = `&first_air_date.gte=${releasedAfter}`;
  } else releasedAfter = "";
  if (releasedBefore != "") {
    //releasedBefore=releasedBefore.replace(/-/g,"%2F")
    releasedBefore = `&first_air_date.lte=${releasedBefore}`;
  } else releasedBefore = "";

  const url = `${apiROUTE}/discover/tv?api_key=${apiKEY}&sort_by=popularity.desc${releasedAfter}${releasedBefore}${genres}${keywords}&include_null_first_air_dates=false`;

  axios
    .get(url)
    .then((movies) => {
      console.log(movies.data.results);
      return res.status(200).send(movies.data.results);
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

routerTMDB.post("/movieKeywords",async (req,res,next)=>{
  const id=req.body.id
  const url = `${apiROUTE}/movie/${id}/keywords?api_key=${apiKEY}`;
  const keywords=await axios.get(url).then(result=>result.data)
  res.status(200).send(keywords.keywords)
})

routerTMDB.post("/movieCast",async (req,res,next)=>{
  const id=req.body.id
  const url = `${apiROUTE}/movie/${id}/credits?api_key=${apiKEY}`;
  const cast=await axios.get(url).then(result=>result.data)
  res.status(200).send(cast.cast)
})

routerTMDB.get("/popularMovies",async(req,res,next)=>{
  const movies=await axios.get(`${apiROUTE}/movie/popular?api_key=${apiKEY}`).then(result=>result.data).catch(err=>console.log(err))
  res.status(200).send(movies)
})

routerTMDB.get("/popularTV",async(req,res,next)=>{
  const tv=await axios.get(`${apiROUTE}/tv/popular?api_key=${apiKEY}`).then(result=>result.data).catch(err=>console.log(err))
  res.status(200).send(tv)
})

routerTMDB.get("/trending/:type/:time",async (req,res,next)=>{
  const type=req.params.type
  const time=req.params.time
  console.log(type)
  console.log(time)
  const content=await axios.get(`${apiROUTE}/trending/${type}/${time}?api_key=${apiKEY}`).then(result=>result.data).catch(err=>console.log(err))
  res.status(200).send(content)
})

module.exports = routerTMDB;
