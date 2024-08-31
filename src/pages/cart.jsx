import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export const Cart = () => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Get cart items from session storage
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const formatPrice = (price) => {
        // Ensure price is a number
        const numericPrice = Number(price);
        return isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0).toFixed(2);
    };

    const handleCheckboxChange = (item, isChecked) => {
        if (isChecked) {
            setSelectedItems(prev => [...prev, item]);
        } else {
            setSelectedItems(prev => prev.filter(selectedItem => selectedItem.id !== item.id));
        }
    };

    const handleCheckout = () => {
        if (selectedItems.length > 0) {
            // Store selected items in session storage
            sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        } else {
            // Store full cart if nothing is selected
            sessionStorage.setItem('selectedItems', JSON.stringify(cart));
        }
        // Navigate to the checkout page
        navigate('/checkout');
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Select</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                    />
                                </td>
                                <td>
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
                                    ) : (
                                        <p>No image</p>
                                    )}
                                </td>
                                <td>{item.name}</td>
                                <td>${formatPrice(item.price)}</td>
                                <td>{item.quantity || 1}</td>
                                <td>${formatPrice(item.price * (item.quantity || 1))}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="5" className="text-right">Total:</td>
                            <td>${calculateTotal()}</td>
                        </tr>
                        </tfoot>
                    </table>
                    <button className="btn btn-primary" onClick={handleCheckout}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
};
