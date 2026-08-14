import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, Calculator } from "lucide-react";
import { SITE_URL } from "@/data/seo";
import { featuredStates, getStateUrl } from "@/data/states";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Page Not Found | Return to the Calculator"
        description="This page could not be found. Return to the free US alimony calculator or choose a state-specific spousal support estimate."
        canonical={`${SITE_URL}${location.pathname}`}
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-4xl font-bold mb-2">404</CardTitle>
              <p className="text-xl text-muted-foreground">Page Not Found</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist. It may have been moved, deleted, or you entered the wrong URL.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Return Home
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/#calculator">
                    <Calculator className="h-4 w-4 mr-2" />
                    Use Calculator
                  </Link>
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-4">Looking for a specific state calculator?</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  {featuredStates.map((state) => (
                    <Link
                      key={state.code}
                      to={getStateUrl(state)}
                      className="text-legal-blue hover:text-primary-hover transition-colors"
                    >
                      {state.name}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
