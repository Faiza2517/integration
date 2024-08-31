import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUserData } from "../services/api";
import {useNavigate} from "react-router-dom";

export const Checkout = () => {
    const  navigate = useNavigate();
    const [creditCardDetails, setCreditCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [paypalDetails, setPaypalDetails] = useState({
        email: '',
    });
    const [cartItems, setCartItems] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
            zipcode: '',
            country: '',
        },
        paymentMethod: 'creditCard',
    });
    const [error, setError] = useState(null);

    // Fetch user data and cart items
    useEffect(() => {
        const fetchUserDataAndCartItems = async () => {
            try {
                const userDataResponse = await fetchUserData();
                console.log('Fetched user data:', userDataResponse);
                if (userDataResponse && userDataResponse.user) {
                    setUserData(prevData => ({
                        ...prevData,
                        ...userDataResponse.user,
                    }));
                } else {
                    setError("Failed to load user data.");
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(`An error occurred: ${err.message}`);
            }

            const selectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || [];
            setCartItems(selectedItems);
        };

        fetchUserDataAndCartItems();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in userData) {
            setUserData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        } else if (name in userData.address) {
            setUserData(prevData => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [name]: value,
                },
            }));
        } else if (name in creditCardDetails) {
            setCreditCardDetails(prevData => ({
                ...prevData,
                [name]: value,
            }));
        } else if (name in paypalDetails) {
            setPaypalDetails(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handlePaymentMethodChange = (e) => {
        setUserData(prevData => ({
            ...prevData,
            paymentMethod: e.target.value,
        }));
    };

    const handleQuantityChange = (itemId, delta) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            );
            sessionStorage.setItem('selectedItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', userData);
        // Handle form submission here
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        sessionStorage.setItem('selectedItems', JSON.stringify(updatedCart));
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mb-4" onClick={() => navigate('/cart')}>Back to Cart</button>
            <div className="row">
                {/* First Column: Checkout Form */}
                <div className="col-lg-7">
                    <div className="card">
                        <div className="card-header">
                            <h2>Checkout</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={userData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={userData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="street" className="form-label">Address:</label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        className="form-control"
                                        value={userData.address.street}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="form-control"
                                        value={userData.address.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="zipcode" className="form-label">Postal Code:</label>
                                    <input
                                        type="text"
                                        id="zipcode"
                                        name="zipcode"
                                        className="form-control"
                                        value={userData.address.zipcode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country:</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className="form-control"
                                        value={userData.address.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Second Column: Review Your Cart */}
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-header">
                            <h2>Review Your Cart</h2>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {cartItems.length === 0 ? (
                                    <li className="list-group-item">Your cart is empty.</li>
                                ) : (
                                    cartItems.map(item => (
                                        <li key={item.id}
                                            className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        style={{width: '50px', height: '50px', marginRight: '10px'}}
                                                    />
                                                )}
                                                <div>
                                                    <strong>{item.name}</strong>
                                                    <p>{item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                >
                                                    +
                                                </button>
                                                <span
                                                    className="badge bg-primary rounded-pill ms-3">${(item.price * item.quantity).toFixed(2)}</span>
                                                <button
                                                    className="btn btn-outline-danger btn-sm ms-2"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    <FaTimes/>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                            <hr/>
                            <div className="d-flex justify-content-between container">
                                <p>Total:</p>
                                <p>${calculateTotal()}</p>
                            </div>
                            <hr/>
                            <div className="container">
                                <h3>Payment Method</h3>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="creditCard"
                                        value="creditCard"
                                        checked={userData.paymentMethod === 'creditCard'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="creditCard">
                                        Credit Card
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="paypal"
                                        value="paypal"
                                        checked={userData.paymentMethod === 'paypal'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="paypal">
                                        PayPal
                                    </label>
                                </div>

                                {userData.paymentMethod === 'creditCard' && (
                                    <div className="mt-2">
                                        <h4>Credit Card Details</h4>
                                        <div className="mb-3">
                                            <label htmlFor="cardNumber" className="form-label">Card Number:</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                className="form-control"
                                                value={creditCardDetails.cardNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
                                            <input
                                                type="text"
                                                id="expiryDate"
                                                name="expiryDate"
                                                className="form-control"
                                                value={creditCardDetails.expiryDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cvv" className="form-label">CVV:</label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                name="cvv"
                                                className="form-control"
                                                value={creditCardDetails.cvv}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                {userData.paymentMethod === 'paypal' && (
                                    <div className="mt-2">
                                        <h4>PayPal Details</h4>
                                        <div className="mb-3">
                                            <label htmlFor="paypalEmail" className="form-label">PayPal Email:</label>
                                            <input
                                                type="email"
                                                id="paypalEmail"
                                                name="email"
                                                className="form-control"
                                                value={paypalDetails.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="py-4">
                                    <button type="submit" className="btn btn-primary mt-4" onClick={handleSubmit}>
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
