import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { artifactService } from '../services/artifactService';
import type { Artifact } from '../types/artifact';
import defaultImg from '../assets/default.png';
import { API_CONFIG } from '../config';
import './Catalog.css';


const Catalog = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return defaultImg;
    
    // In dev mode with proxy, convert localhost URLs to relative paths
    if (import.meta.env.DEV) {
      const absolutePattern = /^https?:\/\/localhost:\d+\//;
      if (absolutePattern.test(url)) {
        const relativeUrl = url.replace(absolutePattern, '/');
        console.log('[Catalog] Converting image URL:', url, '->', relativeUrl);
        return relativeUrl;
      }
    }
    
    // In production, replace localhost with actual image server
    const localhostPattern = /^https?:\/\/localhost:\d+/;
    if (localhostPattern.test(url)) {
      const fixedUrl = url.replace(localhostPattern, API_CONFIG.IMAGE_SERVER);
      console.log('[Catalog] Fixing image URL:', url, '->', fixedUrl);
      return fixedUrl;
    }
    
    return url;
  };

  const loadArtifacts = async () => {
    setLoading(true);
    try {
      const data = await artifactService.getAll({
        query: searchQuery || undefined,
        is_active: true
      });
      setArtifacts(data);
    } catch (error) {
      console.error('Error loading artifacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      loadArtifacts();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadArtifacts();
  };

  const handleAddToAnalysis = async (artifactId: number) => {
    try {
      await artifactService.addToAnalysis(artifactId, 1);
    } catch (error) {
      console.error('Error adding to analysis:', error);
    }
  };

  return (
    <>
      <div className="searchSection">
        <div className="searchContent">
          <form onSubmit={handleSearch} style={{ flex: 1 }}>
            <div className="searchbar">
              <input
                type="text"
                name="query"
                placeholder="Поиск по каталогу"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">Искать</button>
            </div>
          </form>
        </div>
      </div>

      <main>
        <div className="pageTitle">
          <h1>Найдено артефактов: <span style={{ color: 'var(--primary-color)' }}>{artifacts.length}</span></h1>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Загрузка...</p>
          </div>
        ) : (
          <div className="commodiesList">
            {artifacts.length === 0 ? (
              <p>Артефакты не найдены.</p>
            ) : (
              artifacts.map((artifact) => (
                <div key={artifact.id} className="artifact">
                  <div className="image">
                    <img
                      src={getImageUrl(artifact.image_url)}
                      alt={artifact.name}
                      onError={(e) => { e.currentTarget.src = defaultImg; }}
                    />
                  </div>
                  <div className="info">
                    <div className="name">
                      <h1>{artifact.name}</h1>
                    </div>
                    
                  </div>
                  <div className="actions">
                    <Link to={`/artifact/${artifact.id}`}>
                      <button className="btn yellow">
                        <h2>Подробнее</h2>
                      </button>
                    </Link>
                    <button
                      className="btn red"
                      onClick={() => handleAddToAnalysis(artifact.id)}
                    >
                      <h2>В анализ</h2>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Catalog;