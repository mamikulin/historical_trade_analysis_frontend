import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.svg';

const Header = () => {
  return (
    <header>
      <div className="headerContent">
        <div className="logo">
          <img src={logo} alt="АрхМаршрут" /> 
          <div className="name">
            <Link to="/"><h1>АрхМаршрут</h1></Link>
          </div>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/catalog" className="nav-link">Каталог</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;