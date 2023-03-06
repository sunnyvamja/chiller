import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductTable() {
  const blankObj = {
    _id: 0,
    category: "",
    productName: "",
    price: [],
    clothSize: "",
    inStock: "",
    description: "",
  };
  const [obj, setobj] = useState({ ...blankObj });
  const [array, setarray] = useState([]);

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    axios
      .get("https://student-api.mycodelibraries.com/api/product/get")
      .then((res) => {
        setarray([...res.data.data]);
        // console.log(array);
      });
  };

  const deleteProduct = (x) => {
    axios
      .delete(
        `https://student-api.mycodelibraries.com/api/product/delete?id=${x}`
      )
      .then((res) => {
        getProductData();
      });
  };

  const editProduct = (x) => {
    axios
      .update("https://student-api.mycodelibraries.com/api/student/update")
      .then((res) => {
        getProductData();
      });
  };

  return (
    <>
      <div className="set">
        <Link to="/Dashboard">
          <button type="button" id="back">
            Back to Dashboard
          </button>
        </Link>
        <h1>Product Table</h1>
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>category</th>
              <th>productName</th>
              <th>price</th>
              <th>clothSize</th>
              <th>inStock</th>
              <th>description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {array.map((x, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{x.category}</td>
                  <td>{x.productName}</td>
                  <td>{x.price}</td>
                  <td>{x.clothSize}</td>
                  <td>{x.inStock}</td>
                  <td>{x.description}</td>
                  <td>
                    <Link to={`/Dashboard/Product/Form/${x._id}`}>
                      <button className="btn btn-warning py-1">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger py-1 ms-2"
                      onClick={() => deleteProduct(x._id)}
                    >
                      Delete
                    </button>
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

export default ProductTable;
