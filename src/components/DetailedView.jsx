import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addWatched, remWatched } from "../store/watched";
import { addFav, remFav } from "../store/favorites";

const DetailedView = () => {
  const [resource, setResource] = useState({});
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const watched = useSelector((state) => state.watched);
  const dispatch = useDispatch();
  let path = useLocation().pathname;
  //de la url saco el tipo y el id
  path = path.split("/");
  const id = path[path.length - 1];
  const type = path[path.length - 2];

  useEffect(() => {
    const url = `http://localhost:8000/api/tmdb/${type}/${id}`;
    axios.get(url).then((result) => {
      console.log(result.data);
      setResource(result.data);
    });
  }, []);

  //REFACTORIZAR
  //ESTAS FUNCIONES SE USAN EN GRID, DETAILEDVIEW Y LIST
  const addToFav = (input) => {
    axios
      .post("http://localhost:8000/api/favs/addFav", {
        recId: input.target.id,
        nickname: user.nickname,
        type: type,
      })
      .then(() => {
        dispatch(addFav({ recId: input.target.id, type: type, id: "" }));
      })
      .catch((err) => console.log(err));
  };
  const addToWatched = (input) => {
    axios
      .post("http://localhost:8000/api/watched/addWatched", {
        recId: input.target.id,
        nickname: user.nickname,
        type: type,
      })
      .then(() => {
        dispatch(addWatched({ recId: input.target.id, type: type, id: "" }));
      })
      .catch((err) => console.log(err));
  };
  const removeFromFav = (input) => {
    axios
      .post(`http://localhost:8000/api/favs/remFav/${input.target.id}`, {
        userId: user.id,
      })
      .then(() => dispatch(remFav(input.target.id)))
      .catch((err) => console.log(err));
  };
  const removeFromWatched = (input) => {
    axios
      .post(`http://localhost:8000/api/watched/remWatched/${input.target.id}`, {
        userId: user.id,
      })
      .then(() => dispatch(remWatched(input.target.id)))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {type === "movie" ? (
        <div className="contentClase singleMovie">
          <h1>{resource.title}</h1>
          <p>{resource.overview}</p>
          {user.id ? (
            <>
              {favorites.find((element) => id === element.recId) ? (
                <button id={resource.id} onClick={removeFromFav}>Rem Fav</button>
              ) : (
                <button id={resource.id} onClick={addToFav}>Add to Fav</button>
              )}
              {watched.find((element) => id === element.recId) ? (
                <button id={resource.id} onClick={removeFromWatched}>Rem Watched</button>
              ) : (
                <button id={resource.id} onClick={addToWatched}>Add to Watched</button>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="contentClase singleMovie">
          <h1>{resource.original_name}</h1>
          <p>{resource.overview || "No Content"}</p>
          {user.id ? (
            <>
              {favorites.find((element) => id === element.recId) ? (
                <button id={resource.id} onClick={removeFromFav}>Rem Fav</button>
              ) : (
                <button id={resource.id} onClick={addToFav}>Add to Fav</button>
              )}
              {watched.find((element) => id === element.recId) ? (
                <button id={resource.id} onClick={removeFromWatched}>Rem Watched</button>
              ) : (
                <button id={resource.id} onClick={addToWatched}>Add to Watched</button>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default DetailedView;
