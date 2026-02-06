import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getStockStatus, isOutOfStock } from '../utils/stockUtils';

const ProductCard = ({product}) => {
    const navigate = useNavigate()
    const {addToCart, cartItem} = useCart()
    const stockStatus = getStockStatus(product.stock)
    const isOutStock = isOutOfStock(product.stock)

    console.log(cartItem)
    
  return (
    <div className='border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all p-2 h-max'>
      {/* Image Container with Grayscale for Out of Stock */}
      <div className='relative cursor-pointer'>
        <img 
          src={product.image} 
          alt={product.name} 
          className={`bg-gray-100 aspect-square w-full object-cover rounded-lg transition-all ${
            isOutStock ? 'grayscale' : ''
          }`}
          onClick={()=>navigate(`/product/${product._id || product.id}`)}
        />
        {/* Out of Stock Overlay */}
        {isOutStock && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg'>
            <span className='text-white font-bold text-sm bg-black/50 px-3 py-1 rounded'>
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <h1 className='line-clamp-2 p-1 font-semibold mt-2'>{product.name}</h1>
      
      {/* Stock Status Badge */}
      <div className={`mx-1 mb-2 px-2 py-1 rounded text-xs font-semibold ${stockStatus.color}`}>
        {stockStatus.message}
      </div>
      
      {/* Price */}
      <p className='mx-1 mb-2 text-lg text-gray-800 font-bold'>${product.price}</p>
      
      {/* Add to Cart Button */}
      <button 
        onClick={()=>addToCart(product)} 
        disabled={isOutStock}
        className={`px-3 py-2 text-base rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold transition-all ${
          isOutStock
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
        }`}
      >
        <IoCartOutline className='w-5 h-5' /> 
        {isOutStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  )
}

export default ProductCard
