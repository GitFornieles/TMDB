import {store} from "../store/store"
import axios from "../utils/axiosInstance"
import { addWatched, remWatched } from "../store/watched";


export const addToWatched = (id, nickname, type) => {
    if(!id || !nickname || !type) return
    axios
      .post("http://localhost:8000/api/watched/addWatched", {
        recId: id,
        nickname: nickname,
        type: type,
      })
      .then(() => {
        store.dispatch(
          addWatched({ recId: id, type: type, id: "" })
        );
      })
      .catch((err) => console.log(err));
  };

  export const removeFromWatched = (recId,userId) => {
    if(!recId || !userId) return
    axios
      .post(`http://localhost:8000/api/watched/remWatched/${recId}`, {
        userId: userId,
      })
      .then(() => store.dispatch(remWatched(recId)))
      .catch((err) => console.log(err));
  };