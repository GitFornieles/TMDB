import useInput from "../hooks/useInput";
import axios from "../utils/axiosInstance";
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
      "/users/login",
      logInfo
    ).catch((err,result)=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      })
      return result
    })
    if (loggedUser.status===200) {
      console.log("entré");
      dispatch(userLogin(loggedUser.data));
      const favs = await axios.post("/favs/myFavs", {
        ...loggedUser.data,
      });
      dispatch(setFav(favs.data));
      const watched = await axios.post(
        "/watched/myWatched",
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
    </div>
  );
};

export default LogInForm;
