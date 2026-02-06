import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ClerkProvider } from '@clerk/clerk-react'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <CartProvider>
    {/* Removed ClerkProvider */}
    <App />
    <ScrollToTop color='white' smooth style={{backgroundColor:'#2563eb', display:'flex', alignItems:'center', justifyContent:'center'}}/>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </CartProvider>
  // </StrictMode>,
)
