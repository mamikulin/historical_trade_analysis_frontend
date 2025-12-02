import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { artifactService } from '../services/artifactService';
import './Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const [artifactName, setArtifactName] = useState<string>('');
  
  useEffect(() => {
    // Получаем название артефакта из API
    const pathnames = location.pathname.split('/').filter(x => x);
    if (pathnames[0] === 'artifact' && pathnames.length > 1) {
      const artifactId = Number(pathnames[1]);
      artifactService.getById(artifactId)
        .then(data => setArtifactName(data.name))
        .catch(err => {
          console.error('Error loading artifact name for breadcrumbs:', err);
          setArtifactName('Артефакт');
        });
    } else {
      setArtifactName('');
    }
  }, [location.pathname]);
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Главная', path: '/' }
    ];

    if (pathnames.length === 0) {
      return [];
    }

    if (pathnames[0] === 'catalog') {
      breadcrumbs.push({ label: 'Каталог услуг', path: '/catalog' });
    }

    if (pathnames[0] === 'artifact' && pathnames.length > 1) {
      breadcrumbs.push({ label: 'Каталог услуг', path: '/catalog' });
      breadcrumbs.push({ label: artifactName || 'Загрузка...', path: location.pathname });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ol className="breadcrumbs-list">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="breadcrumbs-item">
            {index < breadcrumbs.length - 1 ? (
              <>
                <Link to={crumb.path} className="breadcrumbs-link">
                  {crumb.label}
                </Link>
                <span className="breadcrumbs-separator">/</span>
              </>
            ) : (
              <span className="breadcrumbs-current">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
