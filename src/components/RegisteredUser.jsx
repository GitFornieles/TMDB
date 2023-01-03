import { useSelector } from "react-redux";


const RegisteredUser = () => {
const user=useSelector(state=>state.user)

  return (
    <div className="contentClase RegisteredUser">
      <form>
        <h3>Welcome {user.nickname}</h3>
        <p>This is your submitted info:</p>
        <p>Name: {user.name}</p>
        <p>Lastname: {user.lastname}</p>
        <p>E-mail: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Password: Good Try!</p>
      </form>
    </div>
  );
};

export default RegisteredUser;
