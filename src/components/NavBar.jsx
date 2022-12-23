import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../store/user";
import { setContent } from "../store/content";
import { setFav } from "../store/favorites";
import { setWatched } from "../store/watched";
import { setOtherFav } from "../store/otherFavorites";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const [type, setType] = useState("movie");
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(userLogout());
    dispatch(setFav([]));
    dispatch(setWatched([]));
    dispatch(setContent({ type: "", data: [] }));
    dispatch(setOtherFav([]));
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    e.target.value = "";
    axios
      // .post("http://localhost:8000/api/tmdb/discover", {"keywords":query}) // Para cuando se pueda buscar por keywords
      .post("http://localhost:8000/api/tmdb/movies/titles", {
        title: query,
        type: type,
      })
      .then((result) => result.data)
      .then((result) => dispatch(setContent({ data: result, type: type })))
      .then(() => navigate("/search"))
      .catch((err) => console.log(err));
  };

  const handleFavorites = () => {
    axios
      .post("http://localhost:8000/api/favs/myFavs", { ...user })
      .then((result) => {
        return result.data;
      })
      .then((result) => dispatch(setFav(result)))
      .catch((err) => console.log(err));
  };

  const handleWatched = () => {
    axios
      .post("http://localhost:8000/api/watched/myWatched", { ...user })
      .then((result) => result.data)
      .then((result) => dispatch(setWatched(result)))
      .catch((err) => console.log(err));
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  return (
    <header id="header">
      <Link to="/home">
        <h4>TUEMDB</h4>
      </Link>

      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" onChange={changeHandler} />
        <button type="submit" className="navButton searchbtn">
          Search
        </button>
        <select name="type" id="selectType" onChange={handleType}>
          <option value={"movie"}>Movie</option>
          <option value={"tv"}>TV Show</option>
        </select>
      </form>
      {user.nickname ? (
        <nav>
          <Link to="tuki/favorites">
            <button className="navButton" onClick={handleFavorites}>
              Favorites
            </button>
          </Link>
          <Link to="tuki/watched">
            <button className="navButton" onClick={handleWatched}>
              Watched
            </button>
          </Link>
          <Link to="tuki/others">
            <button className="navButton">Inspiration</button>
          </Link>
        </nav>
      ) : (
        ""
      )}
      {!user.nickname ? (
        <div id="usrBtns">
          <Link to="/users/new">
            <button type="button" className="navButton">Register</button>
          </Link>
          <Link to="/login/">
            <button type="button" className="navButton">Log In</button>
          </Link>
        </div>
      ) : (
        <div id="usrBtns">
          <Link to="/tuki" >
            <button type="button" className="navButton">{user.nickname}</button>
          </Link>
          <Link to="/">
            <button type="button" className="navButton" onClick={handleLogOut}>
              Log Out
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
