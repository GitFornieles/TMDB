// Con esto las llamadas de axios siempre recieb y envían la cookie

import myAxios from "axios"

const axios = myAxios.create({
    withCredentials: true
 })

export default axios