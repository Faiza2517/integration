import React, { useContext, useState } from 'react';
import { LoginUser } from "../services/api";
import { Spinner } from 'react-bootstrap';
import { AuthContext } from "../context/AuthContext";


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading , setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation to check if the fields are empty
        if (!email || !password) {
            setError('Email and password are required.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(''); // Clear any previous errors
        const userData = { email, password };

        try {
            const response = await LoginUser(userData);
            if (response && response.token) {
                login(response.token);
            } else if (response.error) {
                setError(response.error);
            } else {
                console.log("User Login:", response);
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError('Failed to login. Please check your credentials.');
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
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-start d-block">Email:</label>
                                    <input type="email"
                                           className={`form-control ${error ? 'is-invalid' : ''}`}
                                           id="email"
                                           placeholder="Enter email"
                                           name="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pwd" className="form-label text-start d-block">Password:</label>
                                    <input type="password"
                                           className={`form-control ${error ? 'is-invalid' : ''}`}
                                           id="pwd"
                                           placeholder="Enter password"
                                           name="password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status"
                                                     aria-hidden="true"/>
                                            {' '}Signing In...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
