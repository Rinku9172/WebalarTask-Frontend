import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Task Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-button" to='/' role="button">SignIn</Link>
              <Link className="btn btn-button mx-1" to='/signup' role="button">SignUp</Link>
            </form> : <button className="btn btn-button mx-2" onClick={handleLogout}>Logout</button>
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
