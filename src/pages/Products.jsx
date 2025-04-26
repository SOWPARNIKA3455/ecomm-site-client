import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './products.css';

const API = import.meta.env.VITE_API_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // To track loading state
  const [error, setError] = useState(null);      // To track errors

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("You need to log in to view the products.");
      setLoading(false);
      return;
    }

    axios.get(`${API}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    console.log('Add to Cart:', product);
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-page">
      <h1 className="product-heading">Our Products</h1>
      <div className="product-container">
        {products.map(p => (
          <div key={p._id} className="product-card">
            <img className="product-img" src={p.imageUrl} alt={p.name} />
            <div className="product-details">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <strong>${p.price}</strong>
              <button onClick={() => handleAddToCart(p)} className="add-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
