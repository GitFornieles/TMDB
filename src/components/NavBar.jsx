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
    dispatch(setOtherFav([]))
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
        return result.data})
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
      <img src="" alt="TUEMDB" />
      {user.nickname ? (
        <nav>
          <Link to="tuki/favorites">
            <button className="btn nav-btn" onClick={handleFavorites}>
              Favorites
            </button>
          </Link>
          <Link to="tuki/watched">
            <button className="btn nav-btn" onClick={handleWatched}>
              Watched
            </button>
          </Link>
          <Link to="tuki/others">
            <button className="btn nav-btn">Inspiration</button>
          </Link>
        </nav>
      ) : (
        ""
      )}
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" onChange={changeHandler} />
        <select name="type" id="selectType" onChange={handleType}>
          <option value={"movie"}>Movie</option>
          <option value={"tv"}>TV Show</option>
        </select>
        <button type="submit" className="btn">
          Search
        </button>
      </form>
      {!user.nickname ? (
        <div>
          <Link to="/users/new">
            <button className="btn">Register</button>
          </Link>
          <Link to="/login/">
            <button className="btn">Log In</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/tuki">
            <button className="btn">{user.nickname}</button>
          </Link>
          <Link to="/">
            <button className="btn" onClick={handleLogOut}>
              Log Out
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
