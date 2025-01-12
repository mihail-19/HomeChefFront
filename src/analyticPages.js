import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const analyticPages = () => {
  const location = useLocation()

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-J6309DD0B5', {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])
}

export default analyticPages