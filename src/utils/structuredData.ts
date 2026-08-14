import { SITE_NAME, SITE_URL, author, reviewer } from "@/data/seo";

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "description": "Free US alimony calculator for estimating spousal support by state.",
  "url": SITE_URL,
  "inLanguage": "en-US",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_NAME,
  "description": "Provider of free US alimony calculators and educational spousal support resources.",
  "url": SITE_URL,
  "logo": `${SITE_URL}/favicon.ico.png`,
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": `${SITE_URL}/contact`
  }
});

export const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "US Alimony Calculator",
  "description": "Free online calculator for estimating spousal support payments by US state.",
  "url": SITE_URL,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "State-specific calculations",
    "Temporary and long-term support estimates",
    "Monthly and yearly breakdown",
    "Privacy protected",
    "Expert-reviewed formulas"
  ]
});

export const generateStateCalculatorSchema = (stateName: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `${stateName} Alimony Calculator`,
  "description": `Calculate alimony and spousal support estimates for ${stateName} using US legal factors.`,
  "url": `${SITE_URL}/${slug}`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "targetAudience": {
    "@type": "Audience",
    "audienceType": "Individuals going through divorce proceedings"
  }
});

export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": author.name,
  "jobTitle": author.title,
  "description": author.bio,
  "image": `${SITE_URL}${author.image}`,
  "sameAs": [author.linkedin]
});

export const generateArticleSchema = (headline: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": headline,
  "description": description,
  "url": url,
  "datePublished": "2026-05-24",
  "dateModified": "2026-05-24",
  "author": {
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.title
  },
  "reviewedBy": {
    "@type": "Person",
    "name": reviewer.name,
    "jobTitle": reviewer.title
  },
  "publisher": {
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL
  }
});

export const generateWebPageSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": name,
  "description": description,
  "url": url,
  "inLanguage": "en-US",
  "isPartOf": {
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL
  }
});
