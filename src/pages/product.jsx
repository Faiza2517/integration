import { getProductList } from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductList();
                console.log(data);
                setProducts(data);
                setLoading(false);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError("Unauthorized access. Please log in.");
                } else {
                    setError(err.message);
                }
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (id) => {
        navigate(`/Product/${id}`);
    };


    return (
        <div>
            <h2>Product List</h2>
            {loading ? (
                <div className="d-flex justify-content-center mt-4">
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <table className="table table-striped table-bordered mt-4">
                        <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Stock</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id} onClick={() => handleProductClick(product.id)}>
                                <td>{product.name}</td>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: '60px', height: '60px' }}
                                    />
                                </td>
                                <td>${product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Products;
