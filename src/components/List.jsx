import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import ItemList from "../commons/itemList";
import axios from "axios";
import { remFav } from "../store/favorites";
import { remWatched } from "../store/watched";

//import * as Promise from "bluebird";

const List = () => {
  const path = useLocation().pathname;
  let favWatch = path.split("/");
  let movies = [];
  let tv = [];
  let content = [];
  favWatch = favWatch[favWatch.length - 1];
  content = useSelector((state) => state[favWatch]);
  const user = useSelector((state) => state.user);
  movies = content.filter((element) => element.type === "movie");
  tv = content.filter((element) => element.type === "tv");
  const dispatch = useDispatch();

  //REFACTORIZAR
  //ESTAS FUNCIONES SE USAN EN GRID, DETAILEDVIEW Y LIST

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
    <div id="favlist" className="contentClase listClase">
      <h2>Movies</h2>
      <table>
        <thead>
          <tr>
            <th className="colName">Title</th>
            <th className="colPop">Popularity</th>
            <th className="colYear">Year</th>
            <th className="colBtn">Remove</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <span>No {favWatch} Movies Found</span>
          ) : (
            movies.map((movie) => (
              <ItemList
                key={movie.recId}
                type={"movie"}
                id={movie.recId}
                favWatch={favWatch}
                removeFromFav={removeFromFav}
                removeFromWatched={removeFromWatched}
              />
            ))
          )}
        </tbody>
      </table>
      <h2>TV Shows</h2>
      <table>
        <thead>
          <tr>
            <th className="colName">Title</th>
            <th className="colPop">Popularity</th>
            <th className="colYear">Year</th>
            <th className="colBtn">Remove</th>
          </tr>
        </thead>
        <tbody>
          {tv.length === 0 ? (
            <p>No {favWatch} TV Shows Found</p>
          ) : (
            tv.map((tv) => (
              <ItemList
                key={tv.recId}
                type={"tv"}
                id={tv.recId}
                favWatch={favWatch}
                removeFromFav={removeFromFav}
                removeFromWatched={removeFromWatched}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
