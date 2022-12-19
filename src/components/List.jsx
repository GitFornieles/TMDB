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
  const user=useSelector(state=>state.user)
  movies = content.filter((element) => element.type === "movie");
  tv = content.filter((element) => element.type === "tv");
  const dispatch = useDispatch();

  //REFACTORIZAR
  //ESTAS FUNCIONES SE USAN EN GRID, DETAILEDVIEW Y LIST

  const removeFromFav = (input) => {
    axios
      .post(`http://localhost:8000/api/favs/remFav/${input.target.id}`,{userId:user.id})
      .then(() => dispatch(remFav(input.target.id)))
      .catch((err) => console.log(err));
  };
  const removeFromWatched = (input) => {
    axios
      .post(`http://localhost:8000/api/watched/remWatched/${input.target.id}`,{userId:user.id})
      .then(() => dispatch(remWatched(input.target.id)))
      .catch((err) => console.log(err));
  };

  //Devuelve vector de undefined
  // Promise.all(
  //   movies.map((movie) => {
  //     console.log(movie.recId);
  //     axios.get(
  //       `http://localhost:8000/api/tmdb/movie/${movie.recId}`
  //     ).then(result=>result);
  //   })
  // )
  //   .then((result) => {
  //     console.log(result);
  //     return result;
  //   })
  //   .catch((err) => console.log(err));

  // console.log("movies: ", movies);
  // console.log("tv: ", tv);

  //Funciona, pero al servidor le llegan pedidos repetidos y la info no llega al front
  //const movieDetailes=Promise.each(movies,(element) =>{axios.get(`http://localhost:8000/api/tmdb/movie/${element.recId}`).then((result) => result.data).catch(err=>err)})
  //console.log(movieDetailes)

  return (
    <div id="favlist" className="contentClase listClase">
      <h4>Movies</h4>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Popularity</th>
            <th>Year</th>
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
      <h4>TV Shows</h4>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Popularity</th>
            <th>Year</th>
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
