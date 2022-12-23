import useInput from "../hooks/useInput";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../store/user";
import { useNavigate } from "react-router";
import { setFav } from "../store/favorites";
import { setWatched } from "../store/watched";

const LogInForm = () => {
  const nickname = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleOnSubmit = (event) => {
    //El Login setea los estados de user, favorites y watched
    event.preventDefault();
    const logInfo = {
      nickname: nickname.value,
      password: password.value,
    };
    axios
      .post("http://localhost:8000/api/users/login", logInfo)
      .then((result) => {
        dispatch(userLogin(result.data));
        let temp_usr_data = result.data;
        return temp_usr_data;
      })
      .then((usr_data) => {
        axios
          .post("http://localhost:8000/api/favs/myFavs", { ...usr_data })
          .then((result) => {
            dispatch(setFav(result.data));
          })
          .then(() => {
            axios
              .post("http://localhost:8000/api/watched/myWatched", {
                ...usr_data,
              })
              .then((result) => {
                dispatch(setWatched(result.data));
              })
              .then(() => {
                navigate("/");
              });
          });
      })
      .catch((err) => {
        setStatus(true);
        setError(err.response.data);
      });
  };

  return (
    <div className="contentClase NewUserForm">
      {!user.name ? (
        <form onSubmit={handleOnSubmit}>
          <h3>Log In</h3>
          <input type="text" placeholder="NickName" {...nickname} />
          <input type="password" placeholder="Password" {...password} />
          <button type="submit">LogIn</button>
        </form>
      ) : (
        <h1>Welcome!</h1>
      )}
      {status ? <h4>{error}</h4> : ""}
    </div>
  );
};

export default LogInForm;
