import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from "../context/AuthContext";
import { registerUser } from '../services/api'; // Make sure this function handles the API call

export const SignUp = () => {
    const { register } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setFormError({ ...formError, [e.target.name]: '' }); // Reset specific field error on input change
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newFormError = {};

        // Validate form fields
        if (!userData.name) {
            newFormError.name = "Name is required.";
            hasError = true;
        }
        if (!userData.email) {
            newFormError.email = "Email is required.";
            hasError = true;
        }
        if (!userData.password) {
            newFormError.password = "Password is required.";
            hasError = true;
        }

        setFormError(newFormError);

        if (hasError) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await registerUser(userData);

            if (response && response.token) {
                register(response.token);
                setSuccessMessage("Signup successful!");
            } else if (response.error) {
                setError("Registration failed. Please try again.");
            } else {
                setError("Email already exists. Please try a different email.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>Sign Up</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label text-start d-block">Name:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formError.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={userData.name}
                                        onChange={handleChange}
                                    />
                                    {formError.name && <div className="invalid-feedback">{formError.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-start d-block">Email:</label>
                                    <input
                                        type="email"
                                        className={`form-control ${formError.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                    {formError.email && <div className="invalid-feedback">{formError.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-start d-block">Password:</label>
                                    <input
                                        type="password"
                                        className={`form-control ${formError.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={userData.password}
                                        onChange={handleChange}
                                    />
                                    {formError.password && <div className="invalid-feedback">{formError.password}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dateOfBirth" className="form-label text-start d-block">Date of Birth:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        value={userData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                </div>
                                {error && <div className="alert alert-danger mb-3">{error}</div>}
                                {successMessage && <div className="alert alert-success mb-3">{successMessage}</div>}
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            {' '}Registering...
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                            </form>
                            <div className="mt-3">
                                <span className="text-decoration-none d-inline-block mb-3">Already have an account? </span>
                                <Link to="/Login" className="text-decoration-none">Log In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
