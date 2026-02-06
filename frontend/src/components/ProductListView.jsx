import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getStockStatus, isOutOfStock } from '../utils/stockUtils'

const ProductListView = ({product}) => {
  const navigate = useNavigate()
  const {addToCart} = useCart()
  const stockStatus = getStockStatus(product.stock)
  const isOutStock = isOutOfStock(product.stock)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className='space-y-4 mt-2 rounded-md'>
      <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
        <div className='relative'>
          <img 
            src={product.image} 
            alt={product.name} 
            className={`md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer transition-all ${
              isOutStock ? 'grayscale' : ''
            }`}
            onClick={()=>navigate(`/product/${product._id || product.id}`)}
          />
          {isOutStock && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/20 rounded-md'>
              <span className='text-white font-bold text-sm bg-black/50 px-3 py-1 rounded'>
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
        <div className='space-y-2'>
          <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-blue-500 md:w-full w-[220px]'>{product.name}</h1>
          <p className='font-semibold flex items-center md:text-lg text-sm'>$<span className='md:text-4xl text-3xl'>{product.price}</span> {discount > 0 ? `(${discount}% off)` : ''}</p>
          <div className={`text-xs font-semibold ${stockStatus.color}`}>
            {stockStatus.message}
          </div>
          <p className='text-sm'>FREE delivery <span className='font-semibold'>Fri, 18 Apr</span> <br />
          Or fastest delivery <span className='font-semibold'>Tomorrow, 17 Apr</span></p>
          <button 
            onClick={()=>addToCart(product)} 
            disabled={isOutStock}
            className={`text-white px-3 py-1 rounded-md font-semibold transition-all ${
              isOutStock 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isOutStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView
