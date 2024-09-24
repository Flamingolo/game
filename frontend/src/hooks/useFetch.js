import { useContext, useEffect } from 'react';
import { API_CONFIG } from '../config/apiConfig';
import { FetchContext } from '../context/FetchContext';

const useFetch = (endpoint) => {
  const { data, setData, loading, setLoading, error, setError } = useContext(FetchContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_CONFIG[endpoint]);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, setData, setLoading, setError]);

  return { data, loading, error };
};

export default useFetch;
