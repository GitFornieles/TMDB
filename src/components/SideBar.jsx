import axios from "../utils/axiosInstance";
import useInput from "../hooks/useInput";
import { useEffect, useState } from "react";
import { setContent } from "../store/content";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const SideBar = () => {
  const options = ["Top10", "Top20", "Top50", "Generos"];
  const type = useInput();
  const genres = useInput();
  const keywords = useInput();
  const cast = useInput();
  const releasedAfter = useInput();
  const releasedBefore = useInput();
  const [availableGenres, setAvailableGenres] = useState([]);
  const content = useSelector((state) => state.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (type.value == "movie") {
      axios
        .get("http://localhost:8000/api/tmdb/movieGenres")
        .then((result) => {
          return setAvailableGenres(result.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:8000/api/tmdb/tvGenres")
        .then((result) => {
          return setAvailableGenres(result.data);
        })
        .catch((err) => console.log(err));
    }
  }, [type.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(type.value==="movie"){
      const searchData = {
        type: type.value,
        genres: genres.value,
        keywords: keywords.value,
        cast: cast.value,
        releasedAfter: releasedAfter.value,
        releasedBefore: releasedBefore.value,
      };
      const result = await axios.post(
        "http://localhost:8000/api/tmdb/movieDiscover",
        searchData
      );
      dispatch(setContent({ data: result.data, type: "movie" }));
      navigate("/search");
    } else {
      const searchData = {
        type: type.value,
        genres: genres.value,
        keywords: keywords.value,
        releasedAfter: releasedAfter.value,
        releasedBefore: releasedBefore.value,
      };
      const result = await axios.post(
        "http://localhost:8000/api/tmdb/tvDiscover",
        searchData
      );


     dispatch(setContent({ data: result.data, type: "tv" }));
     navigate("/search");
    }
  };

  return (
    <div className="sidebarClase">
      <h4>Advanced Search</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Tipo</label>
        <select name="type" id="type" {...type}>
          <option value="tv">TV Show</option>
          <option value="movie">Movie</option>
        </select>
        <label htmlFor="genres">Genres</label>
        <select name="genres" id="genres" {...genres}>
          {availableGenres?.map((element) => {
            return <option value={`${element.id}`}>{element.name}</option>;
          })}
        </select>
        <label htmlFor="keywords">Keywords</label>
        <input name="keywords" {...keywords}></input>
        {type.value === "movie" ? (
          <>
            <label htmlFor="cast">Cast</label>
            <input name="cast" {...cast}></input>
            <label htmlFor="releasedAfter">Released After</label>
            <input type="date" name="releasedAfter" {...releasedAfter}></input>
            <label htmlTo="releasedBefore">Released Before</label>
            <input
              type="date"
              name="releasedBefore"
              {...releasedBefore}
            ></input>
          </>
        ) : (
          <>
            <label htmlFor="releasedAfter">First Air Date After</label>
            <input type="date" name="releasedAfter" {...releasedAfter}></input>
            <label htmlTo="releasedBefore">First Air Date Before</label>
            <input
              type="date"
              name="releasedBefore"
              {...releasedBefore}
            ></input>
          </>
        )}

        <button type="submit" className="sideBarBtn">Search</button>
      </form>
    </div>
  );
};

export default SideBar;
