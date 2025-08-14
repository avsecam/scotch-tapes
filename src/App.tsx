import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductsList from './pages/ProductsList'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'

export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevCart, { product, quantity }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <Router>
      <div className="App">
        <Header cartCount={getCartCount()} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductsList addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  getCartTotal={getCartTotal}
                  setCart={setCart}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
