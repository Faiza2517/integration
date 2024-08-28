import { getProductList } from "../services/api";
import { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductList();
                setProducts(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError("Unauthorized access. Please log in.");
                } else {
                    setError(err.message);
                }
                setLoading(false); // Set loading to false even if there is an error
            }
        };

        fetchProducts();
    }, []);

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
                    <ul className='list-group mt-4'>
                        {products.map((product) => (
                            <li key={product.id} className='list-group-item'>{product.name}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Products;
