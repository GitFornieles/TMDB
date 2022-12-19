import { useSelector,useDispatch } from "react-redux";
import ItemList from "../commons/itemList";
import axios from "axios";
import { addFav } from "../store/favorites";

//import * as Promise from "bluebird";

const OthersList = () => {
  const user=useSelector(state=>state.user)
  const content = useSelector((state) => state.otherFavs);
  const movies = content.filter((element) => element.type === "movie");
  const tv = content.filter((element) => element.type === "tv");
  const dispatch=useDispatch()

  //REFACTORIZAR
  //ESTAS FUNCIONES SE USAN EN GRID, DETAILEDVIEW OTHERSLIST Y LIST

  const addToFav = (input,type) => {
    axios
      .post("http://localhost:8000/api/favs/addFav", {
        recId: input.target.id,
        nickname: user.nickname,
        type: type,
      })
      .then(() => {
        dispatch(
          addFav({ recId: input.target.id, type: content.type, id: "" })
        );
      })
      .catch((err) => console.log(err));
  };


  return (
    <div id="favlist" className="contentClase listClase">
      <h4>Movies</h4>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Popularity</th>
            <th>Release</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <span>No Movies Found</span>
          ) : (
            movies.map((movie) => <ItemList key={movie.recId} type={"movie"} id={movie.recId} favWatch={"other"} removeFromFav={addToFav} />)
          )}
        </tbody>
      </table>
      <h4>TV Shows</h4>
      <table>
        <thead>
          <tr>
            <th>Title</th>

            <th>Popularity</th>
            <th>Last Release</th>
          </tr>
        </thead>
        <tbody>
          {tv.length === 0 ? (
            <p>No TV Shows Found</p>
          ) : (
            tv.map((tv) => <ItemList key={tv.recId} type={"tv"} id={tv.recId} favWatch={"other"} removeFromFav={addToFav} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OthersList;
