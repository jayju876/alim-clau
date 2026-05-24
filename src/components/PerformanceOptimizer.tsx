import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadFont = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Prefetch likely navigation targets
    const prefetchPages = () => {
      const criticalPages = ['/about', '/contact'];
      criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // Optimize images loading
    const optimizeImages = () => {
      // Add intersection observer for lazy loading if not supported natively
      if ('loading' in HTMLImageElement.prototype === false) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || img.src;
              imageObserver.unobserve(img);
            }
          });
        });
        
        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Run optimizations
    preloadFont();
    prefetchPages();
    optimizeImages();

    // Clean up
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;