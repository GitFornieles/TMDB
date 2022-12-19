const express = require("express");
const router = express.Router();
const routerUsers=require("./users")
const routerFavs=require("./favs")
const routerWatched=require("./watched")
const routerTMDB=require("./tmdb")

router.use("/users",routerUsers)
router.use("/favs",routerFavs)
router.use("/watched",routerWatched)
router.use("/tmdb",routerTMDB)


module.exports=router

