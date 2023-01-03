import myAxios from "axios"
myAxios.defaults.baseURL="http://localhost:8000/api"

const axios = myAxios.create({ //Los pedidos envían las cookies del sitio
    withCredentials: true,
    baseURL:"http://localhost:8000/api"
 })

export default axios