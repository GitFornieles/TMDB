import useInput from "../hooks/useInput";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/user";
import Swal from "sweetalert2";

const NewUserForm = () => {
  const name = useInput();
  const lastname = useInput();
  const nickname = useInput();
  const email = useInput();
  const password = useInput();
  const age = useInput();
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit =async (event) => {
    event.preventDefault();
    const newUser = {
      name: name.value,
      lastname: lastname.value,
      nickname: nickname.value,
      email: email.value,
      password: password.value,
      age: age.value,
    };

    const createdUser= await axios.post("http://localhost:8000/api/users/new", { ...newUser })
    if (createdUser.status===201){
      Swal.fire({
        icon: "success",
        title: "Congrats!",
        text: `User successfully created`,
      })
      navigate("/login")
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${createdUser.data.response}`,
      }) 
    }
  };

  return (
    <div className="contentClase NewUserForm">
      <form onSubmit={handleOnSubmit}>
        <h3>Register</h3>
        <input type="text" placeholder="NickName" {...nickname} />
        <input type="text" placeholder="Name" {...name} />
        <input type="text" placeholder="Lastname" {...lastname} />
        <input type="email" placeholder="email" {...email} />
        <input type="password" placeholder="Password" {...password} />
        <input type="number" placeholder="Age" {...age} />
        <button type="submit" className="navButton">
          Register
        </button>
      </form>
      {status ? <h4>{error}</h4> : ""}
    </div>
  );
};

export default NewUserForm;
