import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { FaStar,FaStackpath } from 'react-icons/fa';

const Card = ({
  resource,
  addToFav,
  addToWatched,
  removeFromFav,
  removeFromWatched,
  watched,
  favorites,
  // favIcon,
  // noFavIcon,
  // noWatchIcon,
  // watchIcon,
  type,
}) => {
  const user = useSelector((state) => state.user);
  // const watched = useSelector((state) => state.watched);
  // const favorites = useSelector((state) => state.favorites);
  // const [isWatched, setIsWatched] = useState(false);
  // const [isFav, setIsFav] = useState(false);
  // library.add(faStar,faEye,faEyeSlash,faStarHalf,faPlusSquare)
  // const favIcon=<FontAwesomeIcon icon="plus-square" />
  // const noFavIcon=<FontAwesomeIcon icon="star" />
  // const noWatchIcon=<FontAwesomeIcon icon="eye-slash" />
  // const watchIcon=<FontAwesomeIcon icon="eye" />


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
      <img src={`https://image.tmdb.org/t/p/w342${resource.poster_path}`} alt="poster" srcset="" />
      {/* <Link to={`/${type}/${resource.id}`}>
        <h4>{resource.title || resource.original_name}</h4>
      </Link> */}
      {user.name ? (
        <>
          {favorites.find((element) => resource.id == element.recId) ? (
            <button className="navButton cardBtn1inFav" id={resource.id} onClick={removeFromFav}>
              💓
            </button>
          ) : (
            <button className="navButton cardBtn1noFav" id={resource.id} onClick={addToFav}>
              💔
            </button>
          )}
          {watched.find((element) => resource.id == element.recId) ? (
            <button className="navButton cardBtn2inW" id={resource.id} onClick={removeFromWatched}>
              👁
            </button>
          ) : (
            <button className="navButton cardBtn2noW" id={resource.id} onClick={addToWatched}>
              ❌
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
