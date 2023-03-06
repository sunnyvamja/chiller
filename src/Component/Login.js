import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {

  const navigate = useNavigate();

  const [obj, setObj] = useState({
    email: "",
    password: "",
  });
  const [array, setArray] = useState(JSON.parse(localStorage.getItem("user")) || [])

  const getValue = (e) => {
    obj[e.target.name] = e.target.value;
    setObj({ ...obj });
  };
  
  const login = () => {
    if(obj.email == '' || obj.password == ""){
      alert("email or password blank");
    }
    console.log(array)
    let logObj = array.find(x => x.email == obj.email);
        if (logObj) {
        if (logObj.password == obj.password) {
          localStorage.setItem("login", true);
          localStorage.setItem("logindata", JSON.stringify(logObj));
          window.location.reload();
        } else {
        alert("Password is wrong");
        }
      } else {
        alert("user is not found !");
      }
  };

  return (
    <>
        <div class="form-containers">
        <form id="forms">
          <h2>Login</h2>
          <input type="email" name="email" onChange={(e) => getValue(e)} value={obj.email} placeholder="email" required />
          <input type="password" name="password" onChange={(e) => getValue(e)} value={obj.password} placeholder="password" required />

          {/* <Link to="/Profile"> */}
            <button type="button" onClick={() => login()}> Login </button> 
          {/* </Link><br /> */}

          <Link to="/Register">
            <button type="button">Sign up for Microsoft</button>
          </Link><br />

        </form>
      </div>
    </>
  )
}

export default Login;