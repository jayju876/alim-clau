import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import { featuredStates, getStateUrl } from "@/data/states";

const Footer = () => {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-6 w-6 text-legal-blue" />
              <span className="text-lg font-bold text-legal-blue">AlimonyCalculator</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Free US alimony calculator platform with state-wise spousal support estimates, legal notes, and privacy-friendly browser calculations.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This tool provides estimates only. Consult a licensed attorney for official legal advice.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Trust & Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-legal-blue transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/meet-our-experts" className="text-muted-foreground hover:text-legal-blue transition-colors">Meet Our Experts</Link>
              </li>
              <li>
                <Link to="/editorial-policy" className="text-muted-foreground hover:text-legal-blue transition-colors">Editorial Policy</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-legal-blue transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-muted-foreground hover:text-legal-blue transition-colors">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/legal-disclaimer" className="text-muted-foreground hover:text-legal-blue transition-colors">Legal Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Popular States */}
          <div>
            <h3 className="font-semibold mb-4">Popular States</h3>
            <ul className="space-y-2">
              {featuredStates.map((state) => (
                <li key={state.code}>
                  <Link
                    to={getStateUrl(state)}
                    className="text-muted-foreground hover:text-legal-blue transition-colors"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
              <li><Link to="/state-law-references" className="text-muted-foreground hover:text-legal-blue transition-colors">All State Law References</Link></li>
              <li><Link to="/how-we-calculate-alimony" className="text-muted-foreground hover:text-legal-blue transition-colors">How We Calculate Alimony</Link></li>
              <li><Link to="/data-sources" className="text-muted-foreground hover:text-legal-blue transition-colors">Data Sources</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AlimonyCalculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
