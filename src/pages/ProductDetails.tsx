import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import type { Product } from '../App'
import './ProductDetails.css'

interface ProductDetailsProps {
  addToCart: (product: Product, quantity: number) => void
}

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const navigation = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)

  // Sample product data (same as ProductsList)
  const products: Product[] = [
    {
      id: 1,
      name: "3M Scotch Magic Tape",
      price: 85.00,
      description: "Premium invisible tape that disappears on paper. Perfect for documents, photos, and crafts. Leaves no residue and won't yellow over time. This exceptional adhesive tape is designed with advanced technology that makes it virtually invisible when applied to paper, making it ideal for professional presentations, photo mounting, and delicate craft projects where appearance matters.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop",
      category: "invisible"
    },
    {
      id: 2,
      name: "Scotch Heavy Duty Packing Tape",
      price: 120.00,
      description: "Strong adhesive packing tape for heavy boxes and packages. Weather-resistant and provides secure sealing for shipping and storage. This heavy-duty tape is engineered with reinforced backing and aggressive adhesive that can withstand extreme temperatures, moisture, and rough handling during transit, making it the perfect choice for e-commerce businesses and frequent movers.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop",
      category: "packing"
    },
    {
      id: 3,
      name: "Scotch Double-Sided Tape",
      price: 95.00,
      description: "Versatile double-sided adhesive tape for mounting, crafting, and DIY projects. Strong bond with easy application. This innovative tape features adhesive on both sides, allowing for clean mounting of posters, signs, and decorative items without visible tape or hardware, making it perfect for home decor and professional installations.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop",
      category: "double-sided"
    },
    {
      id: 4,
      name: "Scotch Duct Tape",
      price: 150.00,
      description: "Heavy-duty duct tape for repairs, sealing, and temporary fixes. Water-resistant and extremely durable for various applications. This industrial-strength tape is made with reinforced fabric backing and aggressive adhesive that can bond to almost any surface, making it essential for emergency repairs, construction projects, and outdoor applications.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop",
      category: "duct"
    },
    {
      id: 5,
      name: "Scotch Masking Tape",
      price: 65.00,
      description: "Low-tack masking tape for painting, labeling, and temporary adhesion. Easy to remove without damaging surfaces. This gentle adhesive tape is specifically designed for temporary applications where clean removal is essential, making it perfect for painting projects, temporary labeling, and delicate surface protection.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop",
      category: "masking"
    },
    {
      id: 6,
      name: "Scotch Electrical Tape",
      price: 75.00,
      description: "Insulating electrical tape for wire connections and electrical repairs. Flame-retardant and weather-resistant. This specialized tape is engineered with electrical insulating properties and flame-retardant materials, making it essential for electrical work, automotive repairs, and any application requiring electrical insulation and protection.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop",
      category: "electrical"
    },
    {
      id: 7,
      name: "Scotch Painter's Tape",
      price: 80.00,
      description: "Professional painter's tape for clean paint lines and edge protection. Removes cleanly without leaving residue. This precision-engineered tape features advanced adhesive technology that provides clean paint lines while ensuring easy removal without damaging underlying surfaces, making it the choice of professional painters and DIY enthusiasts.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop",
      category: "painting"
    },
    {
      id: 8,
      name: "Scotch Mounting Tape",
      price: 110.00,
      description: "Heavy-duty mounting tape for hanging pictures, mirrors, and decorations. Strong adhesive with easy application. This specialized mounting tape is designed with industrial-strength adhesive that can securely hold heavy items like mirrors, picture frames, and decorative objects without the need for nails or screws, making it perfect for damage-free mounting.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop",
      category: "mounting"
    }
  ]

  const product = products.find(p => p.id === parseInt(id || '0'))

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="product-details-container">
          <div className="not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/" className="back-to-products">Back to Products</Link>
          </div>
        </div>
      </div>
    )
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    navigation('/')
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-details-content">
          <div className="product-image-section">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
          </div>

          <div className="product-info-section">
            <div className="product-header">
              <h1>{product.name}</h1>
              <span className="product-category">
                {product.category === 'invisible' ? 'Invisible' :
                  product.category === 'packing' ? 'Packing' :
                    product.category === 'double-sided' ? 'Double-Sided' :
                      product.category === 'duct' ? 'Duct' :
                        product.category === 'masking' ? 'Masking' :
                          product.category === 'electrical' ? 'Electrical' :
                            product.category === 'painting' ? 'Painting' :
                              product.category === 'mounting' ? 'Mounting' : product.category}
              </span>
            </div>

            <div className="product-price-section">
              <span className="product-price">₱{product.price.toFixed(2)}</span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="total-price">
                <span>Total: ₱{(product.price * quantity).toFixed(2)}</span>
              </div>

              <button
                className="add-to-cart-btn-large"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>Premium quality adhesive tape</li>
                <li>Strong and reliable bonding</li>
                <li>Easy to use and apply</li>
                <li>Perfect for various applications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
