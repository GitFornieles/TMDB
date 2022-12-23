import useInput from "../hooks/useInput";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/user";

const NewUserForm = () => {
  const name = useInput();
  const lastname = useInput();
  const nickname = useInput();
  const email = useInput();
  const password = useInput();
  const age = useInput();
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate()
  const dispatch = useDispatch();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: name.value,
      lastname: lastname.value,
      nickname: nickname.value,
      email: email.value,
      password: password.value,
      age: age.value,
    };
    axios
      .post("http://localhost:8000/api/users/new", { ...newUser })
      .then((result) => {
        if (!result.data.response) {
          console.log(result.data)
          setStatus(false);
          dispatch(userLogin({
            id:result.data.dataValues.id,
            name: name.value,
            lastname: lastname.value,
            nickname: nickname.value,
            email: email.value,
            age: age.value,
          }));
        } else {
          setStatus(true);
          setError(result.data.response);
        }
      }).then(()=>{navigate("/")})
      .catch((err) => console.log(err));
  };

  return (
    <div className="contentClase NewUserForm">
      <form onSubmit={handleOnSubmit}>
        <h3>New User</h3>
        <input type="text" placeholder="NickName" {...nickname} />
        <input type="text" placeholder="Name" {...name} />
        <input type="text" placeholder="Lastname" {...lastname} />
        <input type="email" placeholder="email" {...email} />
        <input type="password" placeholder="Password" {...password} />
        <input type="number" placeholder="Age" {...age} />
        <button type="submit">Register</button>
      </form>
      {status ? <h4>{error}</h4> : ""}
    </div>
  );
};

export default NewUserForm;
