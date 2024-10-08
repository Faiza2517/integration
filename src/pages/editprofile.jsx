import React, { useEffect, useState } from 'react';
import { fetchUserData, updateUserData } from '../services/api';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        date_of_birth: '',
        country: 'pakistan',
        city: '',
        street: '',
        zipcode: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true when the form is submitted
        try {
            const token = localStorage.getItem('token');
            await updateUserData(userData, token);
            console.log("User data updated successfully");
            navigate('/profile');
        } catch (error) {
            setError('Failed to update user data.');
        } finally {
            setLoading(false); // Reset loading state after submission
        }
    };

    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Edit Profile</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
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
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label
                                        htmlFor="country"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control radius-8"
                                        id="country"
                                        value={userData.country}
                                        onChange={handleChange}
                                        placeholder="Enter Country"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label
                                        htmlFor="city"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control radius-8"
                                        id="city"
                                        value={userData.city}
                                        onChange={handleChange}
                                        placeholder="Enter City"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label
                                        htmlFor="street"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Street
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control radius-8"
                                        id="street"
                                        value={userData.street}
                                        onChange={handleChange}
                                        placeholder="Enter Street"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label
                                        htmlFor="zipcode"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Zipcode
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control radius-8"
                                        id="zipcode"
                                        value={userData.zipcode}
                                        onChange={handleChange}
                                        placeholder="Enter Zipcode"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        {' '}Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
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
