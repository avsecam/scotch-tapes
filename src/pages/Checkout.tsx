import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { CartItem } from '../App'
import './Checkout.css'

interface CheckoutProps {
  cart: CartItem[]
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  getCartTotal: () => number
  setCart: (cart: CartItem[]) => void
}

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

const Checkout = ({ cart, removeFromCart, updateQuantity, setCart }: CheckoutProps) => {
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId)
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08 // 8% tax
  }

     const calculateShipping = () => {
     return calculateSubtotal() > 500 ? 0 : 50 // Free shipping over ₱500
   }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setOrderComplete(true)
    setCart([]) // Clear cart after successful order
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to continue shopping.</p>
            <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="order-complete">
            <div className="success-icon">✓</div>
            <h2>Order Complete!</h2>
            <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
            <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <Link to="/" className="continue-shopping-link">← Continue Shopping</Link>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Shipping Address</h3>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Information</h3>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="order-summary-section">
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.product.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.product.name}</h4>
                                             <p className="cart-item-price">₱{item.product.price.toFixed(2)}</p>
                      <div className="cart-item-quantity">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className='quantity-btn'
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className='quantity-btn'
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-total">
                                             <span>₱{(item.product.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="remove-item-btn"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                                 <div className="total-row">
                   <span>Subtotal:</span>
                   <span>₱{calculateSubtotal().toFixed(2)}</span>
                 </div>
                 <div className="total-row">
                   <span>Tax (8%):</span>
                   <span>₱{calculateTax().toFixed(2)}</span>
                 </div>
                 <div className="total-row">
                   <span>Shipping:</span>
                   <span>{calculateShipping() === 0 ? 'Free' : `₱${calculateShipping().toFixed(2)}`}</span>
                 </div>
                 <div className="total-row total">
                   <span>Total:</span>
                   <span>₱{calculateTotal().toFixed(2)}</span>
                 </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                className="place-order-btn"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
