const S = require("sequelize");
const db = require("../db");

class Fav extends S.Model {}

Fav.init(
  {
    recId: { type: S.STRING, allowNull: false },
    type:{type:S.STRING,allowNull:false}
  },
  { sequelize: db, modelName: "fav" }
);

module.exports=Fav