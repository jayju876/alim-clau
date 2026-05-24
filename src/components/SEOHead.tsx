import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL } from "@/data/seo";
import { useEffect, useState } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: object;
}

const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  image = `${SITE_URL}/og-image.jpg`,
  type = "website",
  structuredData
}: SEOHeadProps) => {
  const [override, setOverride] = useState<any>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    let active = true;
    fetch(`/api/public/seo?path=${encodeURIComponent(window.location.pathname)}`)
      .then((response) => response.ok ? response.json() : {})
      .then((data) => {
        if (active) setOverride(data || {});
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const effectiveTitle = override.metaTitle || title;
  const effectiveDescription = override.metaDescription || description;
  const effectiveKeywords = override.metaKeywords || keywords;
  const effectiveCanonical = override.canonicalUrl || canonical;
  const effectiveOgTitle = override.ogTitle || effectiveTitle;
  const effectiveOgDescription = override.ogDescription || effectiveDescription;
  const fullTitle = effectiveTitle.includes("LegalAlimonyCalculator") ? effectiveTitle : `${effectiveTitle} | ${SITE_NAME}`;
  const ogFullTitle = effectiveOgTitle.includes("LegalAlimonyCalculator") ? effectiveOgTitle : `${effectiveOgTitle} | ${SITE_NAME}`;
  const url = effectiveCanonical || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={effectiveDescription} />
      {effectiveKeywords && <meta name="keywords" content={effectiveKeywords} />}
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={ogFullTitle} />
      <meta property="og:description" content={effectiveOgDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogFullTitle} />
      <meta name="twitter:description" content={effectiveOgDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@legalalimonycalc" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-US" />
      <meta name="theme-color" content="#0b4f8a" />
      <meta name="format-detection" content="telephone=no" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
