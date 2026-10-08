import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/products/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error(error);
                setError("Something went wrong while loading the product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="page-shell loading-state">
                <p>Loading product...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-shell">
                <Navbar />
                <main className="state-panel error-panel mt-10">
                    <p>{error}</p>

                    <button
                        onClick={() => navigate("/products")}
                        className="primary-button mt-4"
                    >
                        Back to Products
                    </button>
                </main>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="page-shell">
                <Navbar />
                <main className="state-panel mt-10">
                    <p>Product not found.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="page-shell">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-10 w-full">

            <button
                onClick={() => navigate("/products")}
                className="mb-8 text-sm text-gray-600 hover:text-black"
            >
                ← Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Product Image */}
                <div className="bg-white rounded-lg overflow-hidden border">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[500px] object-cover"
                    />
                </div>

                {/* Product Information */}
                <div className="flex flex-col justify-center">

                    <p className="text-sm text-gray-500 mb-2">
                        {product.category}
                    </p>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {product.name}
                    </h1>

                    <p className="text-3xl font-bold text-gray-900 mb-6">
                        ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        {product.description}
                    </p>

                    <div className="mb-8">
                        <p className="text-sm text-gray-500 mb-1">
                            Stock
                        </p>

                        <p className="font-semibold">
                            {product.stock > 0
                                ? `${product.stock} units available`
                                : "Out of stock"}
                        </p>
                    </div>

                    <button
                        disabled={product.stock === 0}
                        className="w-full md:w-auto primary-button px-8 py-3 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
            </main>
        </div>
    );
}

export default ProductDetails;