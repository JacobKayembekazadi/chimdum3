/**
 * SEO utilities for dynamic meta tag management
 */

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

/**
 * Updates document title
 */
export const updateTitle = (title: string): void => {
  if (typeof document !== 'undefined') {
    document.title = title;
  }
};

/**
 * Updates or creates meta tag
 */
export const updateMetaTag = (
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name'
): void => {
  if (typeof document === 'undefined') return;

  const selector = attribute === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

/**
 * Updates SEO meta tags
 */
export const updateSEO = (data: SEOData): void => {
  if (typeof document === 'undefined') return;

  if (data.title) {
    updateTitle(data.title);
    updateMetaTag('og:title', data.title, 'property');
    updateMetaTag('twitter:title', data.title);
  }

  if (data.description) {
    updateMetaTag('description', data.description);
    updateMetaTag('og:description', data.description, 'property');
    updateMetaTag('twitter:description', data.description);
  }

  if (data.keywords) {
    updateMetaTag('keywords', data.keywords);
  }

  if (data.image) {
    updateMetaTag('og:image', data.image, 'property');
    updateMetaTag('twitter:image', data.image);
  }

  if (data.url) {
    updateMetaTag('og:url', data.url, 'property');
  }

  if (data.type) {
    updateMetaTag('og:type', data.type, 'property');
  }
};

