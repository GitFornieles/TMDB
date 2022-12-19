const User=require("./User")
const Fav=require("./Fav")
const Watched=require("./Watched")

Fav.belongsTo(User,{as:"user"})
Watched.belongsTo(User,{as:"user"})

User.hasMany(Fav)
User.hasMany(Watched)

module.exports={User,Fav,Watched}