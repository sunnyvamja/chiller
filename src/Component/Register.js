import React, {useState} from 'react'
import { Link, useNavigate} from "react-router-dom";
import '../App.css'

function Register() {

  const navigate = useNavigate();
  const [obj, setObj] = useState({
    fname: "",
    email: "",
    date: "",
    gender: "",
    password: ""
  });

  const [array, setArray] = useState([]);

const getValue = (e) =>{
    obj[e.target.name] = e.target.value;
    setObj({...obj})
}

const signUp = () =>{
  array.push(obj);
  setArray([...array])
    localStorage.setItem("user", JSON.stringify(array));
}
  return (
    <>
      <div class="form-container">
        <form id="form">
          <h2>Register</h2>
          <label htmlFor="">Full Name:</label>
          <input type="text" name="fname" onChange={(e) => getValue(e)} value={obj.fname}/>

          <label htmlFor="">Email:</label>
          <input type="email" name="email" onChange={(e) => getValue(e)} value={obj.email} required />

          <label htmlFor="">Date:</label>
          <input type="date" name="date" onChange={(e) => getValue(e)} value={obj.date}/><br />

          <label htmlFor="">Gender:</label>
          <input type="radio" value='Male' onChange={(e) => getValue(e)} checked={obj.gender?.includes('Male')} name="gender"/>Male 
          <input type="radio" value='Female' onChange={(e) => getValue(e)} name="gender" checked={obj.gender?.includes('Female')}/>Female <br />

          <label htmlFor="">Password:</label>
          <input type="password" onChange={(e) => getValue(e)} value={obj.password} name="password"/>

          <Link to='/Login'>
            <button type="button" onClick={() => signUp()} className="btn_sub">Sing up </button>
          </Link><br /><br />

          <Link to="/Login">Already have an account?</Link>
        </form>
      </div>
    </>
  )
}

export default Register;
