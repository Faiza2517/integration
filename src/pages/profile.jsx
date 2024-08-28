import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../services/api';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
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

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    return (
        <div className="container" style={{ width: '50%', marginTop: '100px' }}>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h2 className="mt-3">Profile</h2>
                        <Link to="/EditProfilePage" className="btn btn-primary mt-3">Edit Profile</Link>
                    </div>
                    <div className="card-body py-4">
                        <h3 className="card-title text-center">Welcome, {userData.name}</h3>
                        <p className="card-text text-center">Email: {userData.email}</p>
                        <p className="card-text text-center">Date of Birth: {userData.date_of_birth}</p>
                    </div>
                </div>
        </div>
    );
};

export default ProfilePage;
