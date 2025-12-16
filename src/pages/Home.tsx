import './Home.css';
import Carousel from 'react-bootstrap/Carousel';

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
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <Carousel interval={5000} indicators={true} controls={true}>
            <Carousel.Item>
              <div style={{ 
                padding: '60px 40px', 
                minHeight: '400px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0e5 100%)'
              }}>
                <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#333', marginBottom: '20px', textAlign: 'center' }}>
                  О проекте АрхМаршрут
                </h2>
                <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#666', marginBottom: '15px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                  АрхМаршрут - это инновационная платформа для анализа торговых связей по найденным археологическим артефактам.
                </p>
                <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#666', textAlign: 'center', maxWidth: '700px', margin: '20px auto 0' }}>
                  Наша миссия - сделать археологическое наследие доступным для исследователей и 
                  всех интересующихся историей древних цивилизаций и торговых путей.
                </p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div style={{ 
                padding: '60px 40px', 
                minHeight: '400px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0e5 100%)'
              }}>
                <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#333', marginBottom: '25px', textAlign: 'center' }}>
                  Как пользоваться сервисом
                </h2>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '10px' }}>
                      1. Поиск артефактов
                    </h3>
                    <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#666' }}>
                      Перейдите в каталог и используйте строку поиска для нахождения интересующих артефактов. 
                    </p>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '10px' }}>
                      2. Просмотр деталей
                    </h3>
                    <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#666' }}>
                      Кликните на артефакт, чтобы увидеть подробную информацию: изображения, описание, 
                      центр производства и место обнаружения.
                    </p>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '10px' }}>
                      3. Анализ импортных находок в памятнике
                    </h3>
                    <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#666' }}>
                      Добавляйте артефакты в завявку на анализ.
                    </p>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </main>
    </>
  );
};

export default Home;