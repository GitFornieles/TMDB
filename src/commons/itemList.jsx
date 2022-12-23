import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ItemList = ({
  type,
  id,
  watched,
  removeFromFav,
  removeFromWatched,
  favWatch,
}) => {
  //solución temporal.
  const favorites = useSelector((state) => state.favorites);
  const [resource, setResource] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/tmdb/${type}/${id}`)
      .then((result) => setResource(result.data));
  }, []);
  return (
    <>
      {resource.id ? (
        <tr className="recItem" id={resource.id}>
          <td className="colName">
            <Link to={`/${type}/${resource.id}`}>
              {resource.title || resource.original_name}
            </Link>
          </td>
          <td className="colPop">{resource.popularity}</td>
          <td className="colYear">
            {resource.release_date || resource.last_air_date}
          </td>
          {favWatch === "other" &&
          !favorites.find((element) => element.recId === resource.id) ? (
            // se llama removeFromFav porque es como quedó definida la prop al ser enviada; pero en el caso de que llame a "componente itemList" desde la lista de favoritos de otro, en esta prop viene addToFav
            <td className="colBtn">
              <button id={resource.id} onClick={(e) => removeFromFav(e, type)} className="navButton">
                Add to Favs
              </button>
            </td>
          ) : (
            ""
          )}
          {favWatch === "favorites" ? (
            <td className="colBtn">
              <button id={resource.id} onClick={removeFromFav} className="navButton">
                Remove
              </button>
            </td>
          ) : (
            ""
          )}
          {favWatch === "watched" ? (
            <td className="colBtn">
              <button id={resource.id} onClick={removeFromWatched} className="navButton">
                Remove
              </button>
            </td>
          ) : (
            ""
          )}
        </tr>
      ) : (
        <></>
      )}
    </>
  );
};

export default ItemList;
