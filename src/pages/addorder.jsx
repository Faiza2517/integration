import React, { useState } from 'react';
import { addOrder } from '../services/api'; // Adjust the path as needed

const OrderList = () => {
    const [orderData, setOrderData] = useState({
        product_id: '',
        quantity: '',
        total_price: '',
        user_id: '',
        // other fields as required
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addOrder(orderData);
            console.log('Order added successfully:', result);
            // Handle success (e.g., clear form, show message)
        } catch (error) {
            console.error('Error adding order:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="product_id" value={orderData.product_id} onChange={handleInputChange} placeholder="Product ID" required />
            <input type="number" name="quantity" value={orderData.quantity} onChange={handleInputChange} placeholder="Quantity" required />
            <input type="text" name="total_price" value={orderData.total_price} onChange={handleInputChange} placeholder="Total Price" required />
            <input type="text" name="user_id" value={orderData.user_id} onChange={handleInputChange} placeholder="User ID" required />
            {/* Add other input fields as needed */}
            <button type="submit">Add Order</button>
        </form>
    );
};

export default OrderList;
