import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card from "../commons/Card";
import { addFav, remFav } from "../store/favorites";
import { addWatched, remWatched } from "../store/watched";
import { useDispatch } from "react-redux";


const Grid = () => {
  const content = useSelector((state) => state.content);
  const watched = useSelector((state) => state.watched);
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // // library.add(faStar, faEye, faEyeSlash, faStarHalf, faPlusSquare);
  // class favIcon extends React.Component {
  //   render() {
  //     return <><FaStar />?</>
  //   }
  // }
    // const noFavIcon = <FontAwesomeIcon icon="star" />;
  // const noWatchIcon = <FontAwesomeIcon icon="eye-slash" />;
  // const watchIcon = <FontAwesomeIcon icon="eye" />;

  //REFACTORIZAR
  //ESTAS FUNCIONES SE USAN EN GRID, DETAILEDVIEW Y LIST
  const addToFav = (input) => {
    axios
      .post("http://localhost:8000/api/favs/addFav", {
        recId: input.target.id,
        nickname: user.nickname,
        type: content.type,
      })
      .then(() => {
        dispatch(
          addFav({ recId: input.target.id, type: content.type, id: "" })
        );
      })
      .catch((err) => console.log(err));
  };
  const addToWatched = (input) => {
    axios
      .post("http://localhost:8000/api/watched/addWatched", {
        recId: input.target.id,
        nickname: user.nickname,
        type: content.type,
      })
      .then(() => {
        dispatch(
          addWatched({ recId: input.target.id, type: content.type, id: "" })
        );
      })
      .catch((err) => console.log(err));
  };
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
    <div className="contentClase">
      {content.data.map((elemento) => {
        return (
          <Card
            key={elemento.id}
            resource={elemento}
            addToFav={addToFav}
            removeFromFav={removeFromFav}
            addToWatched={addToWatched}
            removeFromWatched={removeFromWatched}
            type={content.type}
            favorites={favorites}
            watched={watched}
            // favIcon={favIcon}
            // noFavIcon={noFavIcon}
            // noWatchIcon={noWatchIcon}
            // watchIcon={watchIcon}
          />
        );
      })}
    </div>
  );
};

export default Grid;
