import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([])
    const [loading, setLoading] = useState(false)

    const normalizeCartItems = (items = []) => {
        return items.map((item) => ({
            ...item,
            id: item.product?._id || item.product || item.id,
        }));
    };

    const loadCart = async () => {
        const token = localStorage.getItem('novamart_token');
        if (!token) {
            setCartItem([]);
            return;
        }

        try {
            setLoading(true);
            const response = await api.get('/api/cart');
            const items = response.data?.data?.items || [];
            setCartItem(normalizeCartItems(items));
        } catch (error) {
            console.error('Failed to load cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
        const handleAuthChange = () => loadCart();
        window.addEventListener('authChanged', handleAuthChange);
        return () => window.removeEventListener('authChanged', handleAuthChange);
    }, []);

    /**
     * Add product to cart
     */
    const addToCart = async (product, quantity = 1) => {
        const productId = product._id || product.id;
        if (!productId) {
            toast.error('Invalid product');
            return false;
        }

        try {
            const response = await api.post('/api/cart', {
                productId,
                quantity,
            });
            const items = response.data?.data?.items || [];
            setCartItem(normalizeCartItems(items));
            toast.success('Product added to cart!');
            return true;
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to add to cart';
            toast.error(message);
            return false;
        }
    }

    /**
     * Update cart item quantity
     */
    const updateCartItem = async (productId, quantity) => {
        try {
            const response = await api.put(`/api/cart/item/${productId}`, {
                quantity,
            });
            const items = response.data?.data?.items || [];
            setCartItem(normalizeCartItems(items));
            return true;
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to update cart';
            toast.error(message);
            return false;
        }
    }

    /**
     * Delete item from cart
     */
    const deleteItem = async (productId) => {
        try {
            const response = await api.delete(`/api/cart/item/${productId}`);
            const items = response.data?.data?.items || [];
            setCartItem(normalizeCartItems(items));
            toast.success('Product removed from cart!');
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to remove item';
            toast.error(message);
        }
    }

    /**
     * Clear entire cart
     */
    const clearCart = async () => {
        try {
            await api.delete('/api/cart');
            setCartItem([]);
            toast.success('Cart cleared!');
        } catch (error) {
            const message = error?.response?.data?.message || 'Failed to clear cart';
            toast.error(message);
        }
    }

    return <CartContext.Provider value={{ 
        cartItem, 
        addToCart, 
        updateCartItem,
        deleteItem,
        clearCart,
        loadCart,
        loading
    }}>
        {children}
    </CartContext.Provider>
}

export const useCart = () => useContext(CartContext)