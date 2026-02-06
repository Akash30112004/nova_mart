import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize products from API on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (params = {}) => {
    try {
      setLoading(true);
      const response = await api.get('/api/products', { params });
      setProducts(response.data.data || response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await api.post('/api/products', newProduct);
      const createdProduct = response.data.data || response.data;
      setProducts((prev) => [...prev, createdProduct]);
      return { success: true, product: createdProduct };
    } catch (err) {
      console.error('Error adding product:', err);
      const message = err?.response?.data?.message || 'Failed to add product';
      setError(message);
      return { success: false, error: message };
    }
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      const response = await api.put(`/api/products/${productId}`, updatedData);
      const updatedProduct = response.data.data || response.data;
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId || product.id === productId
            ? updatedProduct
            : product
        )
      );
      return { success: true };
    } catch (err) {
      console.error('Error updating product:', err);
      const message = err?.response?.data?.message || 'Failed to update product';
      setError(message);
      return { success: false, error: message };
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/api/products/${productId}`);
      setProducts((prev) =>
        prev.filter(
          (product) => product._id !== productId && product.id !== productId
        )
      );
      return { success: true };
    } catch (err) {
      console.error('Error deleting product:', err);
      const message = err?.response?.data?.message || 'Failed to delete product';
      setError(message);
      return { success: false, error: message };
    }
  };

  const getProductById = async (productId) => {
    const existing = products.find(
      (product) => product._id === productId || product.id === productId
    );
    if (existing) return existing;

    const response = await api.get(`/api/products/${productId}`);
    return response.data.data || response.data;
  };

  const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const searchProducts = (query) => {
    if (!query.trim()) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery) ||
        product.category?.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
        searchProducts,
        loadProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
