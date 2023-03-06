import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

function StudentTable() {
    const blankObj = {_id : 0 , firstName : '' , lastName : '' , hobbies : [], gender : '',  city: '',age: ''}
    const [obj, setobj] = useState({...blankObj});
    const [array, setarray] = useState([]);

    useEffect(() => {
        getStudentData()
    }, []);

    const getStudentData = () => {
    axios.get('https://student-api.mycodelibraries.com/api/student/get').then(res => {
      // console.log(res);
        setarray([...res.data.data])
        })
    }

    const deleteStudent = (x) => {
      axios.delete(`https://student-api.mycodelibraries.com/api/student/delete?id=${x}`).then((res) => {
          getStudentData();
        });
    };

  return (
    <>
      <div className="set">
      <Link to="/Dashboard">
        <button type='button' id='back'>Back to Dashboard</button>
      </Link>
        <h1>Student Table</h1>
        <table className="table mt-5">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
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
                <td>{x.firstName}</td>
                <td>{x.lastName}</td>
                <td>{x.hobbies}</td>
                <td>{x.gender}</td>
                <td>{x.city}</td>
                <td>{x.age}</td>
                <td>
                  <Link to={`/Dashboard/Student/Form/${x._id}`}><button className="btn btn-warning py-1">Edit</button></Link>
                  <button className="btn btn-danger py-1 ms-2" onClick={() => deleteStudent(x._id)}>Delete</button>
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

export default StudentTable

