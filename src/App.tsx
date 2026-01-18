import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ArtifactDetail from './pages/ArtifactDetail';

function App() {
  return (
    <Router>
      <CartProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <Header />
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/artifact/:id" element={<ArtifactDetail />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;