import { getOrderList } from "../services/api";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();
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

    const handleOrderClick = (id) => {
        navigate(`/orders/${id}`);
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h2>Order List</h2>
                <Link to="/OrderList" className="btn btn-primary mt-3">Add Order</Link>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className="table table-bordered mt-4">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Payment Method</th>
                </tr>
                </thead>
                <tbody>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <tr key={order.id}>
                            <td>
                                <Link to={`/orders/${order.id}`}>{order.id}</Link>
                            </td>
                            <td>{order.user_id}</td>
                            <td>{order.quantity}</td>
                            <td>{order.total_price}</td>
                            <td>{order.payment_method}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Loading...</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
