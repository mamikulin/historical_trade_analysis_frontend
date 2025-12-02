import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <>
      <main>
        <div className="pageTitle">
          <h1>Добро пожаловать в <span style={{ color: 'var(--primary-color)' }}>АрхМаршрут</span></h1>
        </div>
        
        <div style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#333', marginBottom: '20px' }}>О проекте</h2>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#666', marginBottom: '15px' }}>
              АрхМаршрут - это платформа для анализа торговых связей по найденным артефактам. 
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#666', margin: 0 }}>
              Наша миссия - сделать археологическое наследие доступным для исследователей и 
              всех интересующихся историей древних цивилизаций.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
          <Link to="/catalog" className="btn red" style={{ width: '300px', display: 'inline-block' }}>
            <h2>Перейти к каталогу</h2>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;