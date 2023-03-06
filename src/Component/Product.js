import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import "../App.css"

function Product() {
    const blankObj = {_id : 0 , category : '' , productName : '' , price : [] , clothSize : '' , inStock :'',description: '' }
    const [obj, setobj] = useState({...blankObj})
    const [array, setarray] = useState([])
    const {id} = useParams();

    useEffect(() => {
        getUserData()
    }, [])
    
    const getValue = (e) => {
       
        obj[e.target.name] = e.target.value
        setobj({...obj})
    }

    const getUserData = () => {
        axios.get('https://student-api.mycodelibraries.com/api/product/get').then(res => {
            setarray([...res.data.data])
            console.log(res)

            if(id){
                const editObj = res.data.data.find(x => x._id == id);
                setobj({...editObj});
            }
        })
    }
    const saveUser = () => {
        let formData = new FormData();
        formData.append("category", obj.category);
        formData.append("productName", obj.productName);
        formData.append("price", obj.price);
        formData.append("clothSize", obj.clothSize);
        formData.append("inStock", obj.inStock);
        formData.append("description", obj.description);
        console.log(obj);
        if(obj._id == 0){
            axios.post('https://student-api.mycodelibraries.com/api/product/add' , formData).then(res => {
            console.log(res);
            getUserData();
        })
        }else{
            formData.append('id' , obj._id);
            axios.post('https://student-api.mycodelibraries.com/api/product/update' , formData).then(res => {
            console.log(res);
            getUserData();
        })
        }
        setobj({...blankObj})
    }

  return (
    <>
        <div className="set">
            <h1>Product Form</h1>
        <form action="" id='form'>
            <label htmlFor="">category:</label>
            <input type="text" className='inpt' name='category' value={obj.category} onChange={getValue} />

            <label htmlFor="">productName:</label>
            <input type="text" className='inptss' name='productName' value={obj.productName} onChange={getValue} />

            <label htmlFor="">Price:</label>
            <input type="number" className='inpt' name='price' value={obj.price} onChange={getValue} />

            <label htmlFor="">clothSize:</label>
            <input type="number" className='inpt' name='clothSize' value={obj.clothSize} onChange={getValue} />

            <label htmlFor="">inStock:</label>
            <input type="number" className='inpt' name='inStock' value={obj.inStock} onChange={getValue} />

            <label htmlFor="">description:</label>
            <input type="number" className='inpt' name='description' value={obj.description} onChange={getValue} />

            <Link to="/Dashboard/Product/Table">
                <button type='button' className='btn_sub ' onClick={() => saveUser()}>Submit</button>
            </Link>
        </form>
        </div>

    </>
  )
}

export default Product;