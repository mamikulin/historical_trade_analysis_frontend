import { Link } from 'react-router-dom';
import cartIcon from '../assets/cart.svg';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

interface CartProps {
  analysisID?: number;
  count?: number;
}

const Cart = ({ analysisID, count }: CartProps) => {
  const { cart, fetchOnClick } = useCart();
  
  const usedCount = count ?? cart.entries_count;
  const usedAnalysisID = analysisID ?? cart.request_id;
  const isActive = usedCount > 0;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await fetchOnClick();
      if (usedAnalysisID > 0) {
        window.location.href = `/analysis/${usedAnalysisID}`;
      }
    } catch (err) {
      console.error('Failed to refresh cart:', err);
    }
  };

  return (
    <div className={`cart${!isActive ? ' inactive' : ''}`}>
      {isActive ? (
        <>
          <div className="analysedCount">{usedCount}</div>
          <Link to={`/analysis/${usedAnalysisID}`} onClick={handleClick}>
            <img src={cartIcon} alt="cart" />
          </Link>
        </>
      ) : (
        <a href="#" onClick={handleClick}>
          <img src={cartIcon} alt="cart" />
        </a>
      )}
    </div>
  );
};

export default Cart;
