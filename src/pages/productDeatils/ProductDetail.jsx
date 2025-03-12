import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       
        <div className="col-span-1">
          <img
            className="w-full h-auto rounded-lg"
            src={product.images[0]}
            alt={product.title}
          />
          <div className="flex gap-2 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                className="w-16 h-16 object-cover rounded-md"
                src={image}
                alt={`${product.title} - ${index}`}
              />
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>

          <div className="flex items-center mt-4">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            <span className="ml-4 text-sm text-gray-500">
              {product.discountPercentage}% off
            </span>
          </div>

          <p className="mt-4 text-gray-600">
            <strong>Stock:</strong> {product.stock} left
          </p>

          <p className="mt-2 text-gray-600">
            <strong>Brand:</strong> {product.brand}
          </p>

          <p className="mt-2 text-gray-600">
            <strong>SKU:</strong> {product.sku}
          </p>

          <div className="mt-4">
            <strong className="block text-gray-700">Dimensions:</strong>
            <p className="text-sm text-gray-600">
              {`Width: ${product.dimensions.width} cm, Height: ${product.dimensions.height} cm, Depth: ${product.dimensions.depth} cm`}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-gray-600">
              <strong>Warranty Information:</strong> {product.warrantyInformation}
            </p>
            <p className="text-gray-600">
              <strong>Shipping Information:</strong> {product.shippingInformation}
            </p>
            <p className="text-gray-600">
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
            <p className="text-gray-600">
              <strong>Availability Status:</strong> {product.availabilityStatus}
            </p>
          </div>

          <div className="mt-6">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="mt-4 space-y-4">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700"
            >
              <p className="text-gray-700 dark:text-gray-200">
                <strong>{review.reviewerName}:</strong> {review.comment}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {review.rating}/5</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
