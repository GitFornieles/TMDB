const S = require("sequelize");
const db = require("../db");
const bc = require("bcrypt");

class Users extends S.Model {
  //LLAMADA EN EL HOOK
  createHash(string, salt) {
    //Esta función crea el hash que se almacena en el campo "password" del usuario en la base de datos. 
    //Parámetros: password ingresado por usuario y "salt" que se genera de forma aleatoria.
    return bc.hash(string, salt);
  }
  validatePassword(password) {
    //función para validar el password ingresado en el login
    return bc.hash(password, this.salt).then((hash) => hash === this.password);
  }
}

Users.init(
  {
    nickname: {
        type:S.STRING,
        allowNull:false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
    },
    name:{
        type: S.STRING,
        allowNull: false,
      },
    lastname:{
        type: S.STRING,
        allowNull: false,
      },
    age:{
        type: S.INTEGER,
        allowNull: false,
      },
    adult:{
        type: S.VIRTUAL,
        get() {
            if(this.age>=18) return true 
            else return false
        }
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

Users.addHook("beforeCreate", (User) => {
  User.salt = bc.genSaltSync();
  return User
    .createHash(User.password, User.salt)
    .then((result) => {
      User.password = result;
    })
    .catch((err) => console.log(err));
});

module.exports = Users;

//TODOS LOS MÉTODOS CREADOS ACÁ SON UNA PROMESA (MODIFICAN LA DB) POR ENDE PARA QUE LAS OPERACIONES ASÍNCRONAS SE VEAN REFLEJADAS LAS SENTENCIAS TIENEN QUE ESTAR EN EL RETURN
//VER QUE LOS CAMBIOS SINCRÓNICOS SÍ SE GUARDAN (EJEMPLO EL SALT), PERO EL HASH (QUE ES UNA PROMESA) NO SE GUARDA SI NO ESTÁ EN EL RETURN
