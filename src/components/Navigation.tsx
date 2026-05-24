import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-legal-blue" />
            <span className="text-xl font-bold text-legal-blue">LegalAlimonyCalculator</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-legal-blue transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-legal-blue transition-colors">
              About
            </Link>
            <Link to="/state-law-references" className="text-foreground hover:text-legal-blue transition-colors">
              States
            </Link>
            <Link to="/how-we-calculate-alimony" className="text-foreground hover:text-legal-blue transition-colors">
              Methodology
            </Link>
            <Link to="/meet-our-experts" className="text-foreground hover:text-legal-blue transition-colors">
              Experts
            </Link>
            <Link to="/contact" className="text-foreground hover:text-legal-blue transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2 text-foreground hover:text-legal-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-foreground hover:text-legal-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-foreground hover:text-legal-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/state-law-references"
                className="px-4 py-2 text-foreground hover:text-legal-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                State Calculators
              </Link>
              <Link
                to="/how-we-calculate-alimony"
                className="px-4 py-2 text-foreground hover:text-legal-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Methodology
              </Link>
              <Link
                to="/meet-our-experts"
                className="px-4 py-2 text-foreground hover:text-legal-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Experts
              </Link>
              <Link
                to="/legal-disclaimer"
                className="px-4 py-2 text-foreground hover:text-legal-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Disclaimer
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
