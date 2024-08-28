import {getOrderList} from "../services/api";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrderList();
                setOrders(data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError("Unauthorized access. Please log in.");
                } else {
                    setError(err.message);
                }
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between">
            <h2>Order List</h2>
            <Link to="/OrderList" className="btn btn-primary mt-3">Add Order</Link>
            </div>
                <>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <ul className='list-group mt-4'>
                        {orders.map((order) => (
                            <li key={order.id} className='list-group-item'>
                                <h4>{order.quantity}</h4>
                                <h4>{order.paymentMethod}</h4>
                            </li>
                        ))}
                    </ul>
                </>
        </div>
    );
};

export default Orders;
