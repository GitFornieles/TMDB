import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaStar, FaRegStar, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

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
              onClick={removeFromFav}
            >
              {favIcon}
            </button>
          ) : (
            <button
              className="navButton cardBtn1noFav"
              id={resource.id}
              onClick={addToFav}
            >
              {noFavIcon}
            </button>
          )}
          {watched.find((element) => resource.id == element.recId) ? (
            <button
              className="navButton cardBtn2inW"
              id={resource.id}
              onClick={removeFromWatched}
            >
              {watchIcon}
            </button>
          ) : (
            <button
              className="navButton cardBtn2noW"
              id={resource.id}
              onClick={addToWatched}
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
