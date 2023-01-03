import { useEffect } from "react";
import { useState } from "react";
import axios from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeFromFav, addToFav } from "../hooks/useFavs";
import { removeFromWatched } from "../hooks/useWatched";

const ItemList = ({ type, id, favWatch }) => {
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const [resource, setResource] = useState({});
  const [inFav, setInFav] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const data = await axios
        .get(`/tmdb/${type}/${id}`)
        .then((result) => result.data)
        .catch((err) => console.log(err));
      setResource(data);
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].recId == id) return setInFav(true);
      }
    };
    getInfo();
  }, []);


  const thisAddToFav = async (e)=>{
    addToFav(e.target.id, user.id, type)
    setInFav(true)
  }

  const thisRemoveFromFav = async (e)=>{
    removeFromFav(e.target.id, user.id)
    setInFav(false)
  }
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
          {favWatch === "other" ? (
            !inFav ? (
              <td className="colBtn">
                <button
                  id={resource.id}
                  onClick={(e) => thisAddToFav(e)}
                  className="navButton"
                >
                  Add to Favs
                </button>
              </td>
            ) : (
              <td className="colBtn">
                <button
                  id={resource.id}
                  onClick={(e) => thisRemoveFromFav(e)}
                  className="navButton"
                >
                  Remove
                </button>
              </td>
            )
          ) : (
            ""
          )}
          {favWatch === "favorites" ? (
            <td className="colBtn">
              <button
                id={resource.id}
                onClick={(e) => removeFromFav(e.target.id, user.id)}
                className="navButton"
              >
                Remove
              </button>
            </td>
          ) : (
            ""
          )}
          {favWatch === "watched" ? (
            <td className="colBtn">
              <button
                id={resource.id}
                onClick={(e) => removeFromWatched(e.target.id, user.id)}
                className="navButton"
              >
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
