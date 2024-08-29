import React, { useState } from 'react';
import { addOrder } from '../services/api';
import {useNavigate} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const OrderList = () => {
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({
        product_id: '',
        quantity: '',
        payment_method: '', // Added payment_method to state
    });
    const [loading, setLoading] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await addOrder(orderData);
            console.log('Order added successfully:', result);
            navigate('/Orders');
        } catch (error) {
            setLoading(false);
            console.error('Error adding order:', error);
        }
    };

    return (
        <div className="container" style={{ width: '50%', marginTop: '100px' }}>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Add Order</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="product_id" className="form-label text-start d-block">product_id</label>
                        <input type="text"
                               className='form-control'
                               placeholder="Enter the product_id"
                               name="product_id"
                               value={orderData.product_id}
                               onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label text-start d-block">quantity</label>
                        <input type="number"
                               className='form-control'
                               placeholder="Enter the quantity"
                               name="quantity"
                               value={orderData.quantity}
                               onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="payment_method" className="form-label text-start d-block">payment_method</label>
                        <input type="text"
                               className='form-control'
                               placeholder="Enter the payment_method"
                               name="payment_method"
                               value={orderData.payment_method}
                               onChange={handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status"
                                         aria-hidden="true"/>
                                {' '}Add Order...
                            </>
                        ) : (
                            "Add Oder"
                        )}
                    </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default OrderList;
