import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";

function useFetch(url, initialValue) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      setIsLoading(true);
      try {
        const data = await axios.get(`${BASE_URL}${url}`);
        setData(data.data.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { data, error, isLoading };
}

export default useFetch;
