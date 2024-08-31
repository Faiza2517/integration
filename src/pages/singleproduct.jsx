import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductDetail(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        if (product) {
            setLoading(true);
            setTimeout(() => {
                const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

                // Check if the product is already in the cart
                const existingProductIndex = cart.findIndex(item => item.id === product.id);

                if (existingProductIndex > -1) {
                    // If the product is already in the cart, increase its quantity
                    cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
                } else {
                    // If the product is not in the cart, add it with quantity 1
                    product.quantity = 1;
                    cart.push(product);
                }

                sessionStorage.setItem('cart', JSON.stringify(cart));
                setLoading(false);

                Swal.fire({
                    title: "Add to Cart!",
                    text: "Product added to cart!",
                    icon: "success"
                });
            }, 1000);
        }
    };

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="primary" className="mb-4" onClick={() => navigate('/Products')}>
                Back to Products
            </Button>
            {product && (
                <div className="card" style={{ maxWidth: '18rem' }}>
                    <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '200px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                        <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                        <Button variant="primary" onClick={addToCart} disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{' '}
                                    Adding...
                                </>
                            ) : (
                                'Add To Cart'
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProduct;
