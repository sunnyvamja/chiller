import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import "../App.css"

function User() {
    const blankObj = {_id : 0 , firstName : '' , lastName : '' , hobbies : [] , userImage :'', gender : '' , city :'', age:''}
    const [obj, setobj] = useState({...blankObj})
    const [array, setarray] = useState([])
    const { id } = useParams();

    useEffect(() => {
        getUserData()
    }, [])
    
    const getValue = (e) => {
        let hobbies = obj.hobbies ? obj.hobbies : [];
        if(e.target.name == 'hobbies'){
            if(e.target.checked){
                obj.hobbies = [...hobbies, e.target.value];
            }
            else{
                obj.hobbies = [...hobbies.filter((x) => x != e.target.value)];
            }
        }
        else if(e.target.name == 'userImage'){
            obj.userImage = e.target.files[0];
        }
        else{
            obj[e.target.name] = e.target.value
        }
        setobj({...obj})
    }

    const getUserData = () => {
        axios.get('https://student-api.mycodelibraries.com/api/user/get').then(res => {
          setarray([...res.data.data]);
          console.log(res)
          if (id) {
            const editObj = res.data.data.find((x) => x._id == id);
            setobj({ ...editObj });
          }
        })
    }
    const saveUser = () => {
        let formData = new FormData();
        formData.append('firstName' , obj.firstName)
        formData.append('lastName' , obj.lastName)
        formData.append("hobbies", obj.hobbies);
        formData.append('gender' , obj.gender)
        formData.append('city' , obj.city)
        formData.append('age' , obj.age)
        formData.append("userImage", obj.userImage);
        // console.log(obj);
        if(obj._id == 0){
            axios.post('https://student-api.mycodelibraries.com/api/user/add' , formData).then(res => {
            console.log(res);
            getUserData();
        })
        }else{
            formData.append('id' , obj._id);
            axios.post('https://student-api.mycodelibraries.com/api/user/update' , formData).then(res => {
            console.log(res);
            getUserData();
        })
        }
        setobj({...blankObj})
    }
    
  return (
    <>
        <div className="set">
            <h1>User Form</h1>
        <form action="" id='form'>
            <label htmlFor="">firstName:</label>
            <input type="text" className='inpt' name='firstName' value={obj.firstName} onChange={getValue} />

            <label htmlFor="">LastName:</label>
            <input type="text" className='inpt' name='lastName' value={obj.lastName} onChange={getValue} />

            <label htmlFor="" >hobbies:</label>
            <input type="checkbox" name="hobbies"  value='Singing' onChange={getValue} checked={obj?.hobbies?.includes('Singing')} />Singing &nbsp;
            <input type="checkbox" name="hobbies"  value='Shopping' onChange={getValue} checked={obj?.hobbies?.includes('Shopping')} />Shopping &nbsp;
            <input type="checkbox" name="hobbies"  value='Traveling' onChange={getValue} checked={obj?.hobbies?.includes('Traveling')} />Traveling <br />

            <label htmlFor="" >Gender:</label>
            <input type="radio" name='gender' value='Male' onChange={getValue} checked={obj?.gender?.includes('Male')}/>Male &nbsp;
            <input type="radio" name='gender' value='Female' onChange={getValue} checked={obj?.gender?.includes('Female')}/>Female <br />

            <label htmlFor="">City:</label>
            <input type="text" className='inpt' name='city' value={obj.city} onChange={getValue} />

            <label htmlFor="">Image:</label>
            <input type="file" className='inptsss' name='userImage' onChange={getValue} /><br />

            <label htmlFor="">Age:</label>
            <input type="number" className='inpts' name='age' value={obj.age} onChange={getValue} />

            <Link to="/Dashboard/User/Table">
                <button type='button' className='btn_sub ' onClick={() => saveUser()}>Submit</button>
            </Link>
        </form>
        </div>

    </>
  )
}

export default User

