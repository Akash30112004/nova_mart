import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { Home, ShoppingBag, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex items-center">
      <Container className="py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-9xl font-bold text-blue-600">404</div>
          
          <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
          
          <p className="text-lg text-gray-600">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home size={20} />
              Go Home
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/products')}
              className="flex items-center gap-2"
            >
              <ShoppingBag size={20} />
              Browse Products
            </Button>
          </div>

          <div className="pt-8 border-t border-gray-200 mt-12">
            <p className="text-gray-500 mb-4">Looking for something specific?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/about')}
                className="text-blue-600 hover:underline"
              >
                About Us
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-blue-600 hover:underline"
              >
                Contact
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="text-blue-600 hover:underline"
              >
                Cart
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
