import { Link, Outlet } from "react-router-dom";
import "../App.css";

function Profile() {
    const logout = () => {
      localStorage.removeItem("login");
      window.location.reload();
    };
  return (
    <div className="boxes">
      <div className="box">
      <nav className="nav-menu">
        <ul>
          <li>
            <h3>Admin</h3>
          </li>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li><Link to="/Dashboard/Student/Form">Students</Link></li>
          <li>
            <Link to="/Dashboard/Student/Table">StudentTable</Link>
          </li>
          <li>
            <Link to="/Dashboard/Product/Form">Product</Link>
          </li>
          <li>
            <Link to="/Dashboard/Product/Table">ProductTable</Link>
          </li>
          <li>
            <Link to="/Dashboard/User/Form">User</Link>
          </li>
          <li>
            <Link to="/Dashboard/User/Table">UserTable</Link>
          </li>
          <li>
            <Link to="/Login" onClick={() => logout()}>
              LogOut
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
}
export default Profile;