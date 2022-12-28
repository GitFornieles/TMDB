import useInput from "../hooks/useInput";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../store/user";
import { useNavigate } from "react-router";
import { setFav } from "../store/favorites";
import { setWatched } from "../store/watched";
import Swal from "sweetalert2";

const LogInForm = () => {
  const nickname = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleOnSubmit = async (event) => {
    //El Login setea los estados de user, favorites y watched
    event.preventDefault();
    const logInfo = {
      nickname: nickname.value,
      password: password.value,
    };

    const loggedUser = await axios.post(
      "http://localhost:8000/api/users/login",
      logInfo
    ).catch((err,result)=>{
      setStatus(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      })
      return result
    })
    console.log(loggedUser);
    if (loggedUser.status===200) {
      console.log("entré");
      dispatch(userLogin(loggedUser.data));
      const favs = await axios.post("http://localhost:8000/api/favs/myFavs", {
        ...loggedUser.data,
      });
      dispatch(setFav(favs.data));
      const watched = await axios.post(
        "http://localhost:8000/api/watched/myWatched",
        { ...loggedUser.data }
      );
      dispatch(setWatched(watched.data));
      Swal.fire({
        icon: "success",
        title: "Logged In!",
      });
      navigate("/");
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${loggedUser.data}`,
      })
    }
  };

  return (
    <div className="contentClase NewUserForm">
      {!user.name ? (
        <form onSubmit={handleOnSubmit}>
          <h3>Log In</h3>
          <input type="text" placeholder="NickName" {...nickname} />
          <input type="password" placeholder="Password" {...password} />
          <button type="submit" className="navButton">
            LogIn
          </button>
        </form>
      ) : (
        <h1>Welcome!</h1>
      )}
      {status ? <h4>{error}</h4> : ""}
    </div>
  );
};

export default LogInForm;
