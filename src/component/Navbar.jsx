import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const Navbar = () => {
    const {user, logout} = useContext(AuthContext)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary">Faiza Rasheed</button>
                                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                                        <li><Link className="dropdown-item" to="/Orders">Orders</Link></li>
                                        <li><Link className="dropdown-item" to="/Products">Products</Link></li>
                                        <li><Link className="dropdown-item" to="/Profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="#" onClick={logout}>Logout</Link></li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Login">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}