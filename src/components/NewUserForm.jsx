import useInput from "../hooks/useInput";
import axios from "../utils/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const NewUserForm = () => {
  const name = useInput();
  const lastname = useInput();
  const nickname = useInput();
  const email = useInput();
  const password = useInput();
  const age = useInput();
  const [status, setStatus] = useState(false);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const validation = () => {
    const nickname = document.getElementById("nickname").value;
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;

    let toFix = [];
    // RegExp to use
    const alphabetic = /([\p{Alphabetic}])/gu;
    const alphanumeric = /^[a-zA-Z]+[a-zA-Z0-9\s]+[a-zA-Z]$/g;
    const regExMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
    const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (nickname === "" || nickname === null)
      toFix.push("Nickname can't be empty");
    else if (!alphanumeric.test(nickname))
      toFix.push("Nickname must contain only letters and numbers");

    if (name === "" || name === null) toFix.push("Name can't be empty");
    else if (!alphabetic.test(name))
      toFix.push("Name must contain only letters and numbers");

    if (lastname === "" || lastname === null)
      toFix.push("Last Name can't be empty");
    else if (!alphabetic.test(lastname))
      toFix.push("Last Name must contain only letters and numbers");

    if (email === "" || email === null) toFix.push("Email can't be empty");
    else if (!regExMail.test(email)) toFix.push("Email must be valid");

    if (!regPassword.test(password)){
      toFix.push(`Password must be at least 8 characters`)
      toFix.push(`Password must contain at least 1 uppercase letter`)
      toFix.push(`Password must contain at least 1 lowercase letter`)
      toFix.push(`Password must contain at least 1 number`)
      toFix.push(`Password can contain special characters`)};

    if (Number(age)<1) toFix.push(`Age must be greater than 1`);
    if (Number(age)>110) toFix.push(`Age must be lower than 110`);

    return toFix;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      name: name.value,
      lastname: lastname.value,
      nickname: nickname.value,
      email: email.value,
      password: password.value,
      age: age.value,
    };

    const toFix = validation();
    if (toFix.length > 0) {
      
      setError(toFix)
      setStatus(true)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Please check your info`,
      });
    } else {
      setStatus(false)
      const createdUser = await axios.post(
        "/users/new",
        { ...newUser }
      );
      if (createdUser.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Congrats!",
          text: `User successfully created`,
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${createdUser.data.response}`,
        });
      }
    }
  };

  return (
    <div className="contentClase NewUserForm">
      <form onSubmit={handleOnSubmit}>
        <h3>Register</h3>
        <input type="text" id="nickname" placeholder="NickName" {...nickname} />
        <input type="text" id="name" placeholder="Name" {...name} />
        <input type="text" id="lastname" placeholder="Lastname" {...lastname} />
        <input type="text" id="email" placeholder="email" {...email} />
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...password}
        />
        <input
          type="number"
          id="age"
          placeholder="Age"
          {...age}
        />
        <button type="submit">Register</button>
      </form>
      <ul>
      {status ? error.map((element)=><li>{element}</li>) : ""}
      </ul>
    </div>
  );
};

export default NewUserForm;
