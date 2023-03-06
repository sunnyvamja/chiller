import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../App.css"

function Students() {
    const blankObj = {_id : 0 , firstName : '' , lastName : '' , hobbies : [], gender : '',  city: '',age: ''}
    const [obj, setobj] = useState({...blankObj})
    const [array, setarray] = useState([])    
    const {id} = useParams();

    useEffect(() => {
        getStudentData()
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

    const getStudentData = () => {
        axios.get('https://student-api.mycodelibraries.com/api/student/get').then(res => {
            setarray([...res.data.data])
            // console.log(res)
            if(id){
                const editObj = res.data.data.find(x => x._id == id);
                setobj({...editObj});
            }
        })
    }

    const saveStudent = () => {
        let formData = new FormData();
        formData.append('firstName' , obj.firstName)
        formData.append('lastName' , obj.lastName)
        formData.append("hobbies", obj.hobbies);
        formData.append('gender' , obj.gender)
        formData.append('city' , obj.city)
        formData.append('age' , obj.age)
        // console.log(obj);
        if(obj._id == 0){
            axios.post('https://student-api.mycodelibraries.com/api/student/add' , formData).then((res) => {
                getStudentData();
                console.log(array);
        })
        }else{
            formData.append('id' , obj._id);
            axios.post('https://student-api.mycodelibraries.com/api/student/update' , formData).then((res) => {
                getStudentData();
                // console.log(res);
        })

        }
        setobj({...blankObj})
    }

  return (
    <>
        <div className='set'>
            <h1>Student</h1>
        <form action="" id='form'>
            <label htmlFor="">firstName:</label>
            <input type="text" className='inpt' name='firstName' value={obj.firstName} onChange={getValue} />

            <label htmlFor="">lastName:</label>
            <input type="text" className='inpt' name='lastName' value={obj.lastName} onChange={getValue} />

            <label htmlFor="" >hobbies:</label>
            <input type="checkbox" name="hobbies"  value='Singing' onChange={getValue} checked={obj?.hobbies?.includes('Singing')} />Singing &nbsp;
            <input type="checkbox" name="hobbies"  value='Shopping' onChange={getValue} checked={obj?.hobbies?.includes('Shopping')} />Shopping &nbsp;
            <input type="checkbox" name="hobbies"  value='Traveling' onChange={getValue} checked={obj?.hobbies?.includes('Traveling')} />Traveling <br />

            <label htmlFor="" >Gender:</label>
            <input type="radio" name='gender' value='Male' onChange={getValue} checked={obj?.gender?.includes('Male')}/>Male &nbsp;
            <input type="radio" name='gender' value='Female' onChange={getValue} checked={obj?.gender?.includes('Female')}/>Female <br />

            <label htmlFor="">city:</label>
            <input type="text" className='inpt' name='city' value={obj.city} onChange={getValue} />

            <label htmlFor="">Age:</label>
            <input type="number" className='inpts' name='age' value={obj.age} onChange={getValue} />

            <Link to="/Dashboard/Student/Table">
                <button type='button' className='btn_sub ' onClick={() => saveStudent()}>Submit</button>
            </Link>
        </form>
        </div>

    </>
  )
}

export default Students;