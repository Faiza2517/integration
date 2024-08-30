import { getOrderList } from "../services/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <div className="d-flex justify-content-center my-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <table className="table table-striped table-bordered mt-4">
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Address</th>
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
                                    <Link className="text-decoration-none text-black" to={`/orders/${order.id}`}>{order.id}</Link>
                                </td>
                                <td>{order.address}</td>
                                <td>{order.user_id}</td>
                                <td>{order.quantity}</td>
                                <td>{order.total_price}</td>
                                <td>{order.payment_method}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Orders;
