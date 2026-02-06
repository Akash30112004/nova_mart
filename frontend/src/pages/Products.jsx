import React, { useEffect, useState, useMemo } from 'react';
import Container from '../components/common/Container';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/common/Button';
import { X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const { products, loading } = useProducts();

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Get price range from products
  const maxPrice = products.length > 0
    ? Math.max(...products.map(p => p.price || 0))
    : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  // Filter products
  useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, products]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className='bg-white min-h-screen'>
      {/* Header Section */}
      <section className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8'>
        <Container>
          <h1 className='text-4xl font-bold'>All Products</h1>
          <p className='text-blue-100 mt-2'>Browse our complete collection of electronics</p>
        </Container>
      </section>

      <Container className='py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar Filters */}
          <div className='lg:col-span-1'>
            <div className='space-y-6'>
              {/* Filter Header */}
              <div className='flex justify-between items-center lg:block'>
                <h3 className='text-xl font-bold text-gray-900'>Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className='lg:hidden text-gray-500'
                >
                  {showFilters ? <X size={24} /> : '☰'}
                </button>
              </div>

              {showFilters && (
                <>
                  {/* Search Filter */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-3'>
                      Search Products
                    </label>
                    <input
                      type='text'
                      placeholder='Search...'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-3'>
                      Category
                    </label>
                    <div className='space-y-2'>
                      {categories.map(category => (
                        <label key={category} className='flex items-center gap-3 cursor-pointer'>
                          <input
                            type='radio'
                            name='category'
                            value={category}
                            checked={selectedCategory === category}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className='w-4 h-4 text-blue-600 cursor-pointer'
                          />
                          <span className='text-gray-700'>{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-3'>
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <input
                      type='range'
                      min='0'
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600'
                    />
                  </div>

                  {/* Reset Button */}
                  <Button
                    onClick={handleReset}
                    variant='secondary'
                    className='w-full'
                  >
                    Reset Filters
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className='lg:col-span-3'>
            {/* Results Header */}
            <div className='mb-6 flex justify-between items-center'>
              <p className='text-gray-600'>
                Showing <span className='font-semibold'>{filteredProducts.length}</span> products
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='lg:hidden px-4 py-2 bg-blue-600 text-white rounded-lg'
              >
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>

            {/* Products Grid */}
            {loading ? (
              <ProductGrid products={[]} isLoading={loading} />
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} isLoading={false} />
            ) : (
              <div className='flex flex-col items-center justify-center py-16'>
                <div className='text-center space-y-4'>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    No products found
                  </h3>
                  <p className='text-gray-600'>
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    onClick={handleReset}
                    variant='primary'
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Products;

