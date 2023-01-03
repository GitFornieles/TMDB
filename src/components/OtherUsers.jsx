import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserItem from "../commons/userItem";
import axios from "../utils/axiosInstance";
import { setOtherFav } from "../store/otherFavorites";
import { useDispatch } from "react-redux";

const OtherUsers = () => {
  const user = useSelector((state) => state.user);
  const [others, setOthers] = useState([]);
  const dispatch=useDispatch()
  useEffect(() => {
    axios
      .post("/users/others", {
        nickname: user.nickname,
      })
      .then((result) => setOthers(result.data));
  }, []);
  const handleClick = (e) => {
    const userId = e.target.id;
    axios
      .post(`/favs/otherFavs`, { userId: userId })
      .then((result) => {
        dispatch(setOtherFav(result.data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="contentClase listClase">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>View Favs</th>
          </tr>
        </thead>
        <tbody>
          {others.map((elemento) => (
            <UserItem
              key={elemento.id}
              id={elemento.id}
              nickname={elemento.nickname}
              handleClick={handleClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OtherUsers;
