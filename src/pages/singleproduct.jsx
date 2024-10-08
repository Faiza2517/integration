import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // State for managing quantity
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

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const addToCart = () => {
        if (product) {
            setLoading(true);
            setTimeout(() => {
                const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

                const existingProductIndex = cart.findIndex(item => item.id === product.id);

                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity += quantity;
                } else {
                    product.quantity = quantity;
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
            <h3>Product Detail</h3>
            {product && (
                <div className="card" style={{ maxWidth: '18rem' }}>
                    <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '200px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                        <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                        <InputGroup className="mb-3">
                            <Button variant="outline-secondary" onClick={() => handleQuantityChange('decrease')}>-</Button>
                            <FormControl value={quantity} readOnly />
                            <Button variant="outline-secondary" onClick={() => handleQuantityChange('increase')}>+</Button>
                        </InputGroup>
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
