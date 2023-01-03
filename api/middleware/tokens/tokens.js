const jwt = require("jsonwebtoken");

const SECRET=process.env.JWT_SECRET

// Este módulo genera (y valida) el TOKEN desde el payload que pasan las rutas y SECRET que se define para el servidor.
    
function generateToken(payload){
 return jwt.sign(payload,SECRET,{expiresIn:"2h"}) //lo que devuelve es el token completo
}

function validateToken(token){
 return jwt.verify(token,SECRET) //devuelve el objeto payload del token "descodeado"
}


module.exports={generateToken,validateToken}