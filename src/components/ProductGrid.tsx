import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Default product data (with specified towels already removed)
const defaultProducts = [
  {
    id: '1',
    name: 'Ultra Soft Bath Towel',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Bath',
    isNew: true
  },
  {
    id: '2',
    name: 'Premium Hand Towel Set',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1583845112203-29329902332e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Hand',
    isBestseller: true
  },
  {
    id: '3',
    name: 'Luxury Face Towel',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Face',
  },
  {
    id: '4',
    name: 'Organic Cotton Beach Towel',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1602446256091-ec9408672d87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Beach',
    isNew: true
  },
  {
    id: '5',
    name: 'Microfiber Gym Towel',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Sport',
    isBestseller: true
  }
];

const ProductGrid = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Load products from localStorage and ensure removed towels are not present
  useEffect(() => {
    const savedProducts = localStorage.getItem('towelProducts');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      // Check if removed towels are present in localStorage
      const removedTowelNames = ['Bamboo Bath Sheet', 'Waffle Weave Hand Towel', 'Kids Hooded Towel'];
      const hasRemovedTowels = parsedProducts.some((product: any) =>
        removedTowelNames.includes(product.name)
      );
      
      if (hasRemovedTowels) {
        // If removed towels are found, reset localStorage with defaultProducts
        localStorage.setItem('towelProducts', JSON.stringify(defaultProducts));
        setProducts(defaultProducts);
      } else {
        // Otherwise, use the saved products
        setProducts(parsedProducts);
      }
    } else {
      // If no products found in localStorage, save the default products
      localStorage.setItem('towelProducts', JSON.stringify(defaultProducts));
    }
  }, []);
  
  // Filter products when category changes or products change
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Generate categories from products
  const dynamicCategories = ['All', ...new Set(products.map(product => product.category))];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Collection</h2>
          <p className="text-towel-gray max-w-2xl mx-auto">
            Explore our range of premium towels designed for luxury, comfort, and durability. 
            Each piece is crafted with attention to detail and the finest materials.
          </p>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {dynamicCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-towel-dark text-white' 
                  : 'bg-towel-beige text-towel-dark hover:bg-towel-accent/50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
