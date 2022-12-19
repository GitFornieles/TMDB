import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Card = ({
  resource,
  addToFav,
  addToWatched,
  removeFromFav,
  removeFromWatched,
  type,
}) => {
  const user = useSelector((state) => state.user);
  const watched = useSelector((state) => state.watched);
  const favorites = useSelector((state) => state.favorites);
  const [isWatched, setIsWatched] = useState(false);
  const [isFav, setIsFav] = useState(false);

  // useEffect(() => {
  //   if (
  //     favorites.find((element) => {
  //       console.log("element.id: ",element.recId)
  //       console.log("resource.id: ",resource.id)
  //       console.log(Number(resource.id)== Number(element.recId))
  //       return Number(resource.id)== Number(element.recId);
  //     })
  //   )
  //     setIsFav(true);
  //   if (watched.find((element) => resource.id === element.recId))
  //     setIsWatched(true);
  // }, []);
  return (
    <div id={resource.id} className="cardClase">
      <Link to={`/${type}/${resource.id}`}>
        <h4>{resource.title || resource.original_name}</h4>
      </Link>
      {user.id ? (
        <>
          {favorites.find((element) => resource.id == element.recId) ? (
            <button id={resource.id} onClick={removeFromFav}>
              Rem Fav
            </button>
          ) : (
            <button id={resource.id} onClick={addToFav}>
              Add to Fav
            </button>
          )}
          {watched.find((element) => resource.id == element.recId) ? (
            <button id={resource.id} onClick={removeFromWatched}>
              Rem Watched
            </button>
          ) : (
            <button id={resource.id} onClick={addToWatched}>
              Add to Watched
            </button>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
