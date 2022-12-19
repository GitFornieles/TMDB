const S = require("sequelize");
const db = require("../db");

class Watched extends S.Model {}

Watched.init(
  {
    recId: { type: S.STRING, allowNull: false },
    type:{type:S.STRING,allowNull:false}
  },
  { sequelize: db, modelName: "watched" }
);

module.exports=Watched