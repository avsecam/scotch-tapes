import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  cartCount: number
}

const Header = ({ cartCount }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-container">
                 <Link to="/" className="logo">
           <h1>Tape Store</h1>
         </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/checkout" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
