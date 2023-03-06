import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function UserTable() {
  const blankObj = {
    _id: 0,
    firstName: "",
    lastName: "",
    hobbies: [],
    gender: "",
    city: "",
    age: "",
  };
  const [obj, setobj] = useState({ ...blankObj });
  const [array, setarray] = useState([]);

    useEffect(() => {
        getUserData()
    }, []);

    const getUserData = () => {
    axios.get('https://student-api.mycodelibraries.com/api/user/get').then(res => {
        setarray([...res.data.data])
        // console.log(array);
        })
    }

    const deleteUser = (x) => {
    axios.delete(`https://student-api.mycodelibraries.com/api/user/delete?id=${x}`).then((res) => {
        getUserData();
        // console.log(res)
      });
    };

    const editUser = (x) =>{
    axios.update("https://student-api.mycodelibraries.com/api/student/update").then((res) =>{
      getUserData();
    });
    }

  return (
    <>
      <div className="set">
        <Link to="/Dashboard">
          <button type='button' id='back'>Back to Dashboard</button>
        </Link>
        <h1>User Table</h1>
        <table className="table mt-5">
        <thead>
          <tr>
            <th>Id</th>
            <th>Profile</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Hobbies</th>
            <th>Gender</th>
            <th>City</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {array.map((x, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td><img src={x.image} width='50px' alt="" /></td>
                <td>{x.firstName}</td>
                <td>{x.lastName}</td>
                <td>{x.hobbies}</td>
                <td>{x.gender}</td>
                <td>{x.city}</td>
                <td>{x.age}</td>
                <td>
                  <Link to={`/Dashboard/User/Form/${x._id}`}><button className="btn btn-warning py-1">Edit</button></Link>
                  <button className="btn btn-danger py-1 ms-2" onClick={() => deleteUser(x._id)} >Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default UserTable;
