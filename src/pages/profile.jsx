import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../services/api';
import {useNavigate} from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
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

    const handleEdit=()=>{
        navigate('/EditProfile')
    }
    return (
        <div className="container" style={{width:'50%',marginTop:'100px'}}>
            {userData ? (

                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h2>Profile</h2>
                        <button className='btn' onClick={handleEdit} >Edit</button>
                    </div>
                    <div className="card-body py-4">
                        <h3 className="card-title text-center">Welcome, {userData.name}</h3>
                        <p className="card-text text-center">Email: {userData.email}</p>
                        <p className="card-text text-center">Date of Birth: {userData.date_of_birth}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
