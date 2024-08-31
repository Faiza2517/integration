import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetail } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap'; // Import the Spinner component

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrderDetail(id);
                console.log('Fetched user data:', data);
                setOrder(data);
                setLoading(false); // Set loading to false when data is fetched
            } catch (err) {
                setError(err.message);
                setLoading(false); // Set loading to false on error
            }
        };

        fetchOrder();
    }, [id]);

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary mb-4" onClick={() => navigate('/Orders')}>Back to Orders</button>
            <h3>Order Detail</h3>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                order?.product ? (
                    <table className="table table-bordered" style={{ marginTop: '20px' }}>
                        <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th>Quantity Ordered</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><img src={order.product.image} alt={order.product.name} style={{ maxWidth: '150px' }} /></td>
                            <td>{order.product.name}</td>
                            <td>{order.product.description}</td>
                            <td>${order.product.price}</td>
                            <td>${order.product.price * order.quantity}</td>
                            <td>{order.quantity}</td>
                        </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No order details available.</p>
                )
            )}
        </div>
    );
};

export default OrderDetail;
