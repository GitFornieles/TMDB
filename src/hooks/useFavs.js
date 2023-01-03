
import {store} from "../store/store"
import axios from "../utils/axiosInstance"
import { addFav, remFav } from "../store/favorites";

export const addToFav = async (id, nickname, type) => {
  if(!id || !nickname || !type) return
  await axios
    .post("http://localhost:8000/api/favs/addFav", {
      recId: id,
      nickname: nickname,
      type: type,
    })
    .catch((err) => console.log(err));
  store.dispatch(addFav({ recId: id, type: type, id: "" }));
};

export const removeFromFav = (recId,userId) => {
  if(!recId || !userId) return
  axios
      .post(`http://localhost:8000/api/favs/remFav/${recId}`, {
        userId: userId,
      })
      .then(() => store.dispatch(remFav(recId)))
      .catch((err) => console.log(err));
  };

