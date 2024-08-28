import React, { useState } from 'react';
import { updateUserData } from '../services/api'; // Adjust the path as needed

const EditProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth:'',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const updatedData = await updateUserData(profile);
            console.log("User data updated successfully:", updatedData);
            // Handle success, e.g., show a success message or redirect
        } catch (error) {
            setError('Failed to update user data.');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Edit Profile</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="name"
                                           className="form-label fw-semibold text-primary-light text-sm mb-8">Full
                                        Name <span className="text-danger-600">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control radius-8"
                                        id="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        placeholder="Enter Full Name"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="email"
                                           className="form-label fw-semibold text-primary-light text-sm mb-8">Email <span
                                        className="text-danger-600">*</span></label>
                                    <input
                                        type="email"
                                        className="form-control radius-8"
                                        id="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="pwd"
                                           className="form-label fw-semibold text-primary-light text-sm mb-8">Password</label>
                                    <input
                                        type="pwd"
                                        className="form-control radius-8"
                                        id="password"
                                        value={profile.number}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-20">
                                    <label htmlFor="dob"
                                           className="form-label fw-semibold text-primary-light text-sm mb-8">Date of Birth</label>
                                    <input
                                        type="dob"
                                        className="form-control radius-8"
                                        id="dob"
                                        value={profile.dateOfBirth}
                                        onChange={handleChange}
                                        placeholder="Enter date of Birth"
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <button
                                    type="button"
                                    className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                    onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
                {error && <p className="text-danger-600">{error}</p>}
            </div>
        </div>
    );
};

export default EditProfile;
