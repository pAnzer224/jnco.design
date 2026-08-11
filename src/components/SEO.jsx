import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type }) => {
  const defaultTitle = "Juneco Mirande | UI/UX & Graphic Designer";
  const defaultDescription = "I'm a UI/UX and Graphic Designer with a frontend development background, turning ideas into real, working digital products.";
  
  return (
    <Helmet>
      { /* Standard metadata tags */ }
      <title>{title ? `${title} | Juneco Mirande` : defaultTitle}</title>
      <meta name='description' content={description || defaultDescription} />
      
      { /* OpenGraph tags */ }
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={title ? `${title} | Juneco Mirande` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      
      { /* Twitter tags */ }
      <meta name="twitter:creator" content={name || "Juneco Mirande"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | Juneco Mirande` : defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
};

export default SEO;
