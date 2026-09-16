import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://my-app-backend-bh6j.onrender.com';
const SeoContext = createContext({ seo: {}, content: {}, loading: true });

export function SeoProvider({ children }) {
  const [seo, setSeo] = useState({});
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/content`)
      .then((res) => {
        setContent(res.data || {});
        setSeo(res.data?.seo || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return <SeoContext.Provider value={{ seo, content, loading }}>{children}</SeoContext.Provider>;
}

export function useSeoData() {
  return useContext(SeoContext);
}