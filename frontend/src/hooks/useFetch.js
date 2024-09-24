import { useContext, useEffect } from 'react';
import { API_CONFIG } from '../config/apiConfig';
import { FetchContext } from '../context/FetchContext';

const useFetch = (endpoint) => {
  const { data, setData, loading, setLoading, error, setError } = useContext(FetchContext);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_CONFIG[endpoint]);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, setData, setLoading, setError]);

  return { data, loading, error };
};

export default useFetch;
