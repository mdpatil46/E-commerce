import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cards() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

 
  const fetchProducts = async (query = '') => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching the products:', error);
    }
  };

 
  useEffect(() => {
    fetchProducts(); 
  }, []);

  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    
    fetchProducts(value);
  };

 
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-purple-900 bg-gradient-to-b from-purple-400 via-gray-700 to-gray-400 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <h2 className="text-4xl font-bold mb-8 text-white text-start font-serif">Latest Products</h2>
        
      
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className="mb-4 px-4 py-2 rounded-lg border border-gray-300"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    {product.title}
                  </h5>
                  <p className="text-gray-700 mb-4">
                    {product.description.substring(0, 50)}...
                  </p>
                  <div className="text-lg font-semibold text-gray-900">
                    ${product.price}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">No products available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;
