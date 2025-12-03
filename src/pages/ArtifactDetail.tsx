import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { artifactService } from '../services/artifactService';
import type { Artifact } from '../types/artifact';
import defaultImg from '../assets/default.png';
import { API_CONFIG } from '../config';
import './ArtifactDetail.css';

const ArtifactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return defaultImg;
    
    // In dev mode with proxy, convert localhost URLs to relative paths
    if (import.meta.env.DEV) {
      const absolutePattern = /^https?:\/\/localhost:\d+\//;
      if (absolutePattern.test(url)) {
        const relativeUrl = url.replace(absolutePattern, '/');
        console.log('[ArtifactDetail] Converting image URL:', url, '->', relativeUrl);
        return relativeUrl;
      }
    }
    
    // In production, replace localhost with actual image server
    const localhostPattern = /^https?:\/\/localhost:\d+/;
    if (localhostPattern.test(url)) {
      const fixedUrl = url.replace(localhostPattern, API_CONFIG.IMAGE_SERVER);
      console.log('[ArtifactDetail] Fixing image URL:', url, '->', fixedUrl);
      return fixedUrl;
    }
    
    return url;
  };

  useEffect(() => {
    const loadArtifact = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const data = await artifactService.getById(Number(id));
        setArtifact(data);
      } catch (error) {
        console.error('Error loading artifact:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArtifact();
  }, [id, navigate]);

  if (loading) {
    return (
      <main style={{ textAlign: 'center', padding: '50px' }}>
        <p>Загрузка...</p>
      </main>
    );
  }

  if (!artifact) {
    return (
      <main style={{ textAlign: 'center', padding: '50px' }}>
        <p>Артефакт не найден</p>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="pageTitle">
          <h1>{artifact.name}</h1>
          {/* <div className="filterTag">
            Центр: {artifact.production_center}
          </div> */}
        </div>

        <div className="artifact-detail-overview" style={{
          display: 'flex',
          gap: '24px',
          background: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)' 
        }}>
          <div className="image" style={{ 
            flexShrink: 0,
            width: '300px', 
            height: '300px',
            borderRadius: '4px', 
            overflow: 'hidden' 
          }}>
            <img
              src={getImageUrl(artifact.image_url)}
              alt={artifact.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.src = defaultImg; }}
            />
          </div>

          <div className="info" style={{ flexGrow: 1, padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="origin">
              <h2 style={{ fontSize: '18px' }}>Центр производства:</h2>
              <h3 style={{ fontSize: '20px' }}>{artifact.production_center}</h3>
            </div>
            {/* <div className="origin" style={{ marginTop: '16px' }}>
              <h2 style={{ fontSize: '18px' }}>Статус:</h2>
              <h3 style={{ fontSize: '20px' }}>{artifact.is_active ? 'Активен' : 'Неактивен'}</h3>
            </div> */}
          </div>
        </div>

        <div className="content" style={{ marginTop: '24px' }}>
          <div className="description" style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#333', marginBottom: '12px' }}>
              Описание
            </h3>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#666', margin: 0 }}>
              {artifact.description}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ArtifactDetail;