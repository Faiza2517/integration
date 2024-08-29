import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getProductDetail } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
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

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary mb-4" onClick={() => navigate('/Products')}>Back to Products</button>
            {product && (
                <div className="card" style={{maxWidth: '18rem'}}>
                    <img src={product.image} className="card-img-top" alt={product.name} style={{height:'200px',width:'200px'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                        <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                        <button className="btn btn-primary mb-4">Add To Cart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProduct;
