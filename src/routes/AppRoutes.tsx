import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Disclaimer from "@/pages/Disclaimer";
import StateCalculator from "@/pages/StateCalculator";
import TrustPage from "@/pages/TrustPage";
import CmsContent from "@/pages/CmsContent";
import Admin, { AdminLogin } from "@/pages/admin/Admin";
import NotFound from "@/pages/NotFound";

const trustRoutes = [
  "privacy-policy",
  "terms-and-conditions",
  "editorial-policy",
  "legal-disclaimer",
  "meet-our-experts",
  "how-we-calculate-alimony",
  "data-sources",
  "state-law-references",
  "blog",
];

const AppRoutes = () => (
  <BrowserRouter>
    <ScrollToTop />
    <PerformanceOptimizer />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      {trustRoutes.map((slug) => (
        <Route key={slug} path={`/${slug}`} element={<TrustPage slug={slug} />} />
      ))}
      <Route path="/blog/:slug" element={<CmsContent type="blog" />} />
      <Route path="/p/:slug" element={<CmsContent type="page" />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/:state" element={<StateCalculator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
