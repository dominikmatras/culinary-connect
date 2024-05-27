import { useNavigate } from 'react-router-dom';
import './NotFound.less';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/')
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-container__title">404</h1>
      <h2 className="not-found-container__subtitle">Page Not Found</h2>
      <p className="not-found-container__description">Sorry, the page you're looking for doesn't exist.</p>
      <button className="not-found-container__back-button" onClick={goHome}>Go Back</button>
    </div>
  );
};

export default NotFound;
