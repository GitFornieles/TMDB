import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaStar, FaRegStar, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { addToFav,removeFromFav } from "../hooks/useFavs";
import{addToWatched,removeFromWatched} from "../hooks/useWatched"

const Card = ({resource,type}) => {
  const watched = useSelector((state) => state.watched);
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const favIcon = <FaStar id={resource.id} onClick={removeFromFav} />;
  const noFavIcon = <FaRegStar id={resource.id} onClick={removeFromFav} />;
  const noWatchIcon = <FaRegEyeSlash id={resource.id} onClick={addToWatched} />;
  const watchIcon = <FaRegEye id={resource.id} onClick={addToWatched} />;

  return (
    <div id={resource.id} className="cardClase">
      <Link to={`/${type}/${resource.id}`}>
        {resource.poster_path != null ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${resource.poster_path}`}
            alt={`${resource.title ? resource.title : resource.name}`}
            srcset=""
          />
        ) : (
          <h3>{resource.title ? resource.title : resource.name}</h3>
        )}
      </Link>
      {/* <Link to={`/${type}/${resource.id}`}>
        <h4>{resource.title || resource.original_name}</h4>
      </Link> */}
      {user.name ? (
        <>
          {favorites.find((element) => resource.id == element.recId) ? (
            <button
              className="navButton cardBtn1inFav"
              id={resource.id}
              onClick={(e)=>removeFromFav(e.target.id,user.id)}
            >
              {favIcon}
            </button>
          ) : (
            <button
              className="navButton cardBtn1noFav"
              id={resource.id}
              onClick={(e)=>{addToFav(e.target.id,user.nickname,type)}}
            >
              {noFavIcon}
            </button>
          )}
          {watched.find((element) => resource.id == element.recId) ? (
            <button
              className="navButton cardBtn2inW"
              id={resource.id}
              onClick={(e)=>removeFromWatched(e.target.id,user.id)}
            >
              {watchIcon}
            </button>
          ) : (
            <button
              className="navButton cardBtn2noW"
              id={resource.id}
              onClick={(e)=>addToWatched(e.target.id,user.nickname,type)}
            >
              {noWatchIcon}
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
