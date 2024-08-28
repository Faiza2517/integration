// EditProfilePage.js
import React, { useEffect, useState } from 'react';
import { fetchUserData, updateUserData } from '../services/api';
import {useNavigate} from "react-router-dom";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        date_of_birth: '',
    });
    const [error, setError] = useState(null);


    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData();
                console.log('Fetched user data:', data);
                if (data && data.user) {
                    setUserData(data.user);
                } else {
                    setError("Failed to load user data.");
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setError(`An error occurred: ${err.message}`);
            }
        };

        getUserData();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevProfile => ({
            ...prevProfile,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            await updateUserData(userData, token);
            console.log("User data updated successfully");
           navigate('/profile');
        } catch (error) {
            setError('Failed to update user data.');
        }
    };

    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Edit Profile</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label
                                        htmlFor="name"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Full Name <span className="text-danger-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control radius-8"
                                        id="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        placeholder="Enter Full Name"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Email <span className="text-danger-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control radius-8"
                                        id="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label
                                        htmlFor="password"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control radius-8"
                                        id="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label
                                        htmlFor="date_of_birth"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control radius-8"
                                        id="date_of_birth"
                                        value={userData.date_of_birth}
                                        onChange={handleChange}
                                        placeholder="Enter Date of Birth"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                            <button
                                type="button"
                                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                {error && <p className="text-danger-600">{error}</p>}
            </div>
        </div>
    );
};

export default EditProfilePage;
