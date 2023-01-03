import { useState } from "react";
import HorizontalGrid from "./HorizontalGrid";
import useInput from "../hooks/useInput";
import { useEffect } from "react";
import axios from "../utils/axiosInstance";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [trending, setTrending] = useState([]);
  const [trendingType, setTrendingType] = useState("all");
  const [trendingTime, setTrendingTime] = useState("day");

  useEffect(() => {
    const getInfo = async () => {
      const getMovies = await axios
        .get("http://localhost:8000/api/tmdb/popularMovies")
        .then((result) => {
          console.log(result.data.results);
          return result.data})
        .catch((err) => console.log(err));
      setMovies(getMovies.results);
      const getTv = await axios
        .get("http://localhost:8000/api/tmdb/popularTV")
        .then((result) => result.data)
        .catch((err) => console.log(err));
      setTv(getTv.results);
      const getTrending = await axios
        .get(
          `http://localhost:8000/api/tmdb/trending/${trendingType}/${trendingTime}`
        )
        .then((result) => result.data)
        .catch((err) => console.log(err));
      setTrending(getTrending.results);
    };
    getInfo();
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      const getTrending = await axios
        .get(
          `http://localhost:8000/api/tmdb/trending/${trendingType}/${trendingTime}`
        )
        .then((result) => result.data)
        .catch((err) => console.log(err));
      setTrending(getTrending.results);
    };
    getInfo();
  }, [trendingTime, trendingType]);

  const handleChangeType = (e) => {
    setTrendingType(e.target.value);
  };

  const handleChangeTime = (e) => {
    setTrendingTime(e.target.value);
  };

  return (
    <div className="Home">
      <nav>
        <h1>The Ultimate Entertainment Master DataBase</h1>
      </nav>
      <div className="categorieDiv">
        <h2>Popular Movies</h2>
        <div className="homeGrid">
          <HorizontalGrid content={movies} type={"movie"} />
        </div>
      </div>
      <div className="categorieDiv">
        <h2>Popular TV Shows</h2>
        <div className="homeGrid">
          <HorizontalGrid content={tv} type={"tv"} />
        </div>
      </div>
      <div>
        <div className="trendingDiv">
          <h2>Now Trending!</h2>
          <form>
            <label htmlFor="trendingType">What?</label>
            <select
              name="trendingType"
              id="trendingType"
              onChange={handleChangeType}
            >
              <option value="all">All</option>
              <option value="movie">Movie</option>
              <option value="tv">TV Show</option>
            </select>
            <label htmlFor="trendingTime">In last...</label>
            <select
              name="trendingTime"
              id="trendingTime"
              onChange={handleChangeTime}
            >
              <option value="day">24hs</option>
              <option value="week">7 days</option>
            </select>
          </form>
        </div>
        <div className="homeGrid">
          <HorizontalGrid content={trending} type={"any"}/>
        </div>
      </div>
    </div>
  );
};

export default Home;