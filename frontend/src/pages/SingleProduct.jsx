import React from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../context/DataContext'

const SingleProduct = () => {
  const { id } = useParams()
  const { data } = getData()
  // Find the product by id (convert id to number if needed)
  const product = data?.find(item => String(item.id) === String(id))

  if (!product) {
    return <div className="text-center mt-10 text-red-500">Product not found.</div>
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <img src={product.image} alt={product.title} className="w-64 h-64 object-cover mx-auto mb-6" />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="mb-2">{product.description}</p>
      <div className="mb-2">Brand: <span className="font-semibold">{product.brand}</span></div>
      <div className="mb-2">Category: <span className="font-semibold">{product.category}</span></div>
      <div className="text-xl font-bold text-blue-500">${product.price}</div>
    </div>
  )
}

export default SingleProduct
