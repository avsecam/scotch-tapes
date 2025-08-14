import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../App'
import './ProductsList.css'

interface ProductsListProps {
  addToCart: (product: Product, quantity: number) => void
}

const ProductsList = ({ addToCart }: ProductsListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: "Magic Tape",
      price: 85.00,
      description: "Premium invisible tape that disappears on paper. Perfect for documents, photos, and crafts. Leaves no residue and won't yellow over time.",
      image: "https://www.karton.eu/media/image/product/147/lg/standard-pp-transparent-adhesive-tape.jpg.webp",
      category: "invisible"
    },
    {
      id: 2,
      name: "Heavy Duty Packing Tape",
      price: 120.00,
      description: "Strong adhesive packing tape for heavy boxes and packages. Weather-resistant and provides secure sealing for shipping and storage.",
      image: "https://www.hvinsulation.com/wp-content/uploads/2018/06/packaging-tape.jpg",
      category: "packing"
    },
    {
      id: 3,
      name: "Grip Tape",
      price: 95.00,
      description: "Versatile double-sided adhesive tape for mounting, crafting, and DIY projects. Strong bond with easy application.",
      image: "https://tse4.mm.bing.net/th/id/OIP.hXU60rxvYNExQpFxWDbWLgHaHa?pid=Api&P=0&h=180",
      category: "grip"
    },
    {
      id: 4,
      name: "Washi Tape",
      price: 150.00,
      description: "Heavy-duty duct tape for repairs, sealing, and temporary fixes. Water-resistant and extremely durable for various applications.",
      image: "https://storables.com/wp-content/uploads/2023/09/how-to-store-washi-tape-1695305483.jpg",
      category: "washi"
    },
    {
      id: 5,
      name: "Scotch Masking Tape",
      price: 65.00,
      description: "Low-tack masking tape for painting, labeling, and temporary adhesion. Easy to remove without damaging surfaces.",
      image: "https://vn.element14.com/productimages/large/en_GB/TL22405-40.jpg",
      category: "masking"
    },
    {
      id: 6,
      name: "Electrical Tape",
      price: 75.00,
      description: "Insulating electrical tape for wire connections and electrical repairs. Flame-retardant and weather-resistant.",
      image: "https://m.media-amazon.com/images/I/61PjxqOm8gL._SL1500_.jpg",
      category: "electrical"
    },
    {
      id: 7,
      name: "Duct Tape",
      price: 80.00,
      description: "Professional duct tape for clean paint lines and edge protection. Removes cleanly without leaving residue.",
      image: "https://www.karton.eu/media/image/product/54059/lg/duct-tape-type-518-silver-48-mm-x-50-m.jpg.webp",
      category: "duct"
    },
    {
      id: 8,
      name: "Double-Sided Tape",
      price: 110.00,
      description: "Heavy-duty double-sided tape for hanging pictures, mirrors, and decorations. Strong adhesive with easy application.",
      image: "https://artcentric.co.za/wp-content/uploads/2018/03/double-sided-tape.jpg",
      category: "double-sided"
    }
  ]

  const categories = ['all', 'invisible', 'packing', 'grip', 'washi', 'masking', 'electrical', 'duct', 'double-sided']
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  return (
    <div className="products-page">
      <div className="products-container">
                 <div className="products-header">
           <h1>Our Premium Tape Collection</h1>
           <p>Discover the finest selection of adhesive tapes for all your needs</p>
         </div>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
                             {category === 'all' ? 'All Products' : 
                category === 'invisible' ? 'Invisible' :
                category === 'packing' ? 'Packing' :
                category === 'grip' ? 'Grip' :
                category === 'washi' ? 'Washi' :
                category === 'masking' ? 'Masking' :
                category === 'electrical' ? 'Electrical' :
                category === 'duct' ? 'Duct' :
                category === 'double-sided' ? 'Double-Sided' : category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <Link to={`/product/${product.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                                     <span className="product-price">₱{product.price.toFixed(2)}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsList
