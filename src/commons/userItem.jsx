import { Link } from "react-router-dom";

const userItem = ({id, nickname, handleClick}) => {
  return (
    <tr>
      <td>{nickname}</td>
      <td id={id}><Link id={id} onClick={handleClick} to={`/tuki/others/favorites/${id}`}> View</Link></td>
    </tr>
  );
};

export default userItem;
