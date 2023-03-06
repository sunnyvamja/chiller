import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Profile from "./Component/Profile";
import Dashboard from "./Component/Dashboard";
import Students from "./Component/Students";
import StudentTable from "./Component/StudentTable";
import Product from "./Component/Product";
import ProductTable from "./Component/ProductTable";
import User from "./Component/User";
import UserTable from "./Component/UserTable";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    {/* Protected Routing */}
      {localStorage.getItem("login") != null ? <Profile /> : <></>}
      <Routes>
        {!localStorage.getItem("login") ? 
          <>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="*" element={<Navigate to="/Login" />}></Route>
          </>
          :
          <>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Dashboard">
              <Route path="Student">
                <Route path="Form" element={<Students />}></Route>
                <Route path="Form/:id" element={<Students />}></Route>
                <Route path='Table' element={<StudentTable />}></Route>
              </Route>

              <Route path="User">
                <Route path="Form" element={<User />}></Route>
                <Route path="Form/:id" element={<User />}></Route>
                <Route path='Table' element={<UserTable />}></Route>
              </Route>

              <Route path="Product">
                <Route path="Form" element={<Product/>}></Route>
                <Route path="Form/:id" element={<Product />}></Route>
                <Route path='Table' element={<ProductTable />}></Route>
              </Route>
            </Route>
            <Route to="/Dashboard" element={<Dashboard/>}></Route>
          </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;