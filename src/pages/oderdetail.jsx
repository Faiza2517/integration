import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetail } from "../services/api"; // Update the service to fetch order details
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrderDetail(id);
                setOrder(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchOrder();
    }, [id]);

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary mb-4" onClick={() => navigate('/Orders')}>Back to Orders</button>
            {order?.product ? (
                <table className="table table-bordered" style={{ marginTop: '20px' }}>
                    <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>total_price</th>
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
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderDetail;
