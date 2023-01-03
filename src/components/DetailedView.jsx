import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addWatched, remWatched } from "../store/watched";
import { addFav, remFav } from "../store/favorites";
import GridWord from "../commons/gridWord";
import { addToFav,removeFromFav } from "../hooks/useFavs";
import{addToWatched,removeFromWatched} from "../hooks/useWatched"

const DetailedView = () => {
  const [resource, setResource] = useState({});
  const [keywords,setKeywords]=useState([])
  const [cast,setCast]=useState([])
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const watched = useSelector((state) => state.watched);
  const dispatch = useDispatch();
  let path = useLocation().pathname;
  //de la url saco el tipo y el id
  path = path.split("/");
  const id = path[path.length - 1];
  const type = path[path.length - 2];

  useEffect(() => {
    const url = `http://localhost:8000/api/tmdb/${type}/${id}`;
    const info = async () => {
      const data = await axios.get(url).then((result) => result.data);
      setResource(data);
      const urlkey = `http://localhost:8000/api/tmdb/movieKeywords`;
      const keywords = await axios.post(urlkey, { id: data.id });
      setKeywords(keywords.data)
      const urlcast = `http://localhost:8000/api/tmdb/movieCast`;
      const cast = await axios.post(urlcast, { id: data.id });
      setCast(cast.data)
    };
    info();
  }, []);

  const poster = `https://image.tmdb.org/t/p/w780${resource.poster_path}`;

  return (
    <div className="contentClase singleMovie">
      <img src={poster} alt="" />
      {type === "movie" ? (
        <div className="resourceDetail">
          <div className="detailResourceTitle">
            <div>
            <h1>{resource.title}</h1>
            <h5>{resource.tagline}</h5>
            </div>
            {user.id ? (
              <div className="detailResourceTitleBtns">
                {favorites.find((element) => id === element.recId) ? (
                  <button id={resource.id} onClick={(e)=>removeFromFav(e.target.id,user.id)} className="navButton">
                    Remove from Favorites
                  </button>
                ) : (
                  <button id={resource.id} onClick={(e)=>{addToFav(e.target.id,user.nickname,type)}} className="navButton">
                    Add to Favorites
                  </button>
                )}
                {watched.find((element) => id === element.recId) ? (
                  <button id={resource.id} onClick={(e)=>removeFromWatched(e.target.id,user.id)} className="navButton">
                    Remove from Watchedlist
                  </button>
                ) : (
                  <button id={resource.id} onClick={(e)=>addToWatched(e.target.id,user.nickname,type)} className="navButton">
                    Add to Watchedlist
                  </button>
                )}
              </div>
            ) : (
              <div className="detailResourceTitleBtns">
                <h3>Log in to save your Favorites</h3>
              </div>
            )}
          </div>
          <div className="detailResourceOverview">
            <h3>Overview</h3>
            <p>{resource.overview}</p>
          </div>
          <div className="detailResourceInfo">
            <h4>Some Data</h4>
            <div>
              <ul>
                <li>Release Date: {resource.release_date}</li>
                <li>Original Title: {resource.original_title}</li>
                <li>Homepage: <a href={resource.homepage}>Visit</a></li>
              </ul>
              <ul>
                <li>Revenue: {resource.revenue}</li>
                <li>Popularity: {resource.popularity}</li>
                <li>Vote Average: {resource.vote_average}</li>
              </ul>
            </div>
          </div>
          <div className="detailResourceMiscInfo">
            <div className="detailResourceBottom">
              <h4>CAST</h4>
              <div>
              {cast.map(element=>{
                  return <GridWord element={element}/>
                })}
              </div>
            </div>
            <div className="detailResourceBottom">
              <h4>TAGS</h4>
              <div>
                {keywords.map(element=>{
                  return <GridWord element={element}/>
                })}
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="resourceDetail">
          <div className="detailResourceTitle">
            <div>
            <h1>{resource.original_name}</h1>
            <h5>{resource.tagline}</h5>
            </div>
            {user.id ? (
              <div className="detailResourceTitleBtns">
                {favorites.find((element) => id === element.recId) ? (
                  <button id={resource.id} onClick={removeFromFav} className="navButton">
                    Remove from Favorites
                  </button>
                ) : (
                  <button id={resource.id} onClick={addToFav} className="navButton">
                    Add to Favorites
                  </button>
                )}
                {watched.find((element) => id === element.recId) ? (
                  <button id={resource.id} onClick={removeFromWatched} className="navButton">
                    Remove from Watchedlist
                  </button>
                ) : (
                  <button id={resource.id} onClick={addToWatched} className="navButton">
                    Add to Watchedlist
                  </button>
                )}
              </div>
            ) : (
              <div className="detailResourceTitleBtns">
                <h3>Log in to save your Favorites</h3>
              </div>
            )}
          </div>
          <div className="detailResourceOverview">
            <h3>Overview</h3>
            <p>{resource.overview}</p>
          </div>
          <div className="detailResourceInfo">
            <h4>Some Data</h4>
            <div>
              <ul>
                {/* <li>Last Release: {resource.last_episode_to_air.air_date}</li> */}
                <li>Episodes: {resource.number_of_episodes}</li>
                <li>Seasons: {resource.number_of_seasons}</li>
                <li>HomePage: <a href={resource.homepage}>Visit</a></li>
              </ul>
              <ul>
                <li>Status: {resource.status}</li>
                <li>Popularity: {resource.popularity}</li>
                <li>Vote Average: {resource.vote_average}</li>
              </ul>
            </div>
          </div>
          <div className="detailResourceMiscInfo">
            <div className="detailResourceBottom">
              <h4>CAST</h4>
              <div>
              {cast.map(element=>{
                  return <GridWord element={element}/>
                })}
              </div>
            </div>
            <div className="detailResourceBottom">
              <h4>TAGS</h4>
              <div>
                {keywords.map(element=>{
                  return <GridWord element={element}/>
                })}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedView;
