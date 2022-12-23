import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserItem from "../commons/userItem";
import axios from "axios";
import { setOtherFav } from "../store/otherFavorites";
import { useDispatch } from "react-redux";

const OtherUsers = () => {
  const user = useSelector((state) => state.user);
  const content = useSelector((state) => state.content);
  const [others, setOthers] = useState([]);
  const dispatch=useDispatch()
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/users/others", {
        nickname: user.nickname,
      })
      .then((result) => setOthers(result.data));
  }, []);
  const handleClick = (e) => {
    const userId = e.target.id;
    axios
      .post(`http://localhost:8000/api/favs/otherFavs`, { userId: userId })
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
