import { useSelector } from "react-redux";
import ItemList from "../commons/itemList";

const OthersList = () => {
  const content = useSelector((state) => state.otherFavs);
  const movies = content.filter((element) => element.type === "movie");
  const tv = content.filter((element) => element.type === "tv");

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
            movies.map((movie) => <ItemList key={movie.recId} type={"movie"} id={movie.recId} favWatch={"other"}/>)
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
            tv.map((tv) => <ItemList key={tv.recId} type={"tv"} id={tv.recId} favWatch={"other"}/>)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OthersList;
