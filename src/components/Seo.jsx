import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeoData } from '../context/SeoContext';

const SITE_URL = 'https://techbuds.in';

const DEFAULTS = {
  home: {
    title: 'TechBuds — Digital Marketing & Web Development',
    description: 'SEO, SMM, SEM, Meta Ads, Google Ads and Web Development services to grow your business online.',
  },
  about: {
    title: 'About Us | TechBuds',
    description: 'Learn about TechBuds — a freelance partner for digital marketing and web development.',
  },
  services: {
    title: 'Our Services | TechBuds',
    description: 'Explore SEO, SMM, SEM, SMO, Meta Ads, Google Ads and Web Development services offered by TechBuds.',
  },
  blog: {
    title: 'Blog | TechBuds',
    description: 'Insights and tips on digital marketing and web development from TechBuds.',
  },
  contact: {
    title: 'Contact Us | TechBuds',
    description: 'Get in touch with TechBuds for your digital marketing and web development needs.',
  },
};

function setMetaTag(attrName, attrValue, content) {
  let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function Seo({ page, titleOverride, descriptionOverride }) {
  const { seo } = useSeoData();
  const location = useLocation();

  useEffect(() => {
    const pageData = seo?.[page] || {};
    const title = titleOverride || pageData.title || DEFAULTS[page]?.title || 'TechBuds';
    const description = descriptionOverride || pageData.description || DEFAULTS[page]?.description || '';

    // Title
    document.title = title;

    // Meta description
    setMetaTag('name', 'description', description);

    // Open Graph tags (bonus — social share previews bhi sahi rahenge)
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');

    // ---- CANONICAL TAG — fully dynamic, current URL se auto-generate ----
    const cleanPath = location.pathname.replace(/\/+$/, '') || '/';
    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    setMetaTag('property', 'og:url', canonicalUrl);
  }, [seo, page, titleOverride, descriptionOverride, location.pathname]);

  return null;
}

export default Seo;