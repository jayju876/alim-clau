import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Scale, Award, BookOpen } from "lucide-react";
import { generateOrganizationSchema } from "@/utils/structuredData";
import { SITE_URL } from "@/data/seo";

const About = () => {
  const structuredData = generateOrganizationSchema();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About the Alimony Calculator | Tools & Methodology"
        description="Learn how AlimonyCalculator builds free, state-specific alimony calculators using public family-law factors, expert review, and browser-based privacy."
        keywords="about alimony calculator, legal expertise, family law tools, divorce support tools"
        canonical={`${SITE_URL}/about`}
        structuredData={structuredData}
      />
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            About AlimonyCalculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Providing accurate, reliable alimony calculations based on current state laws and legal guidelines
            to help individuals understand their potential financial obligations or entitlements.
          </p>
        </div>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Calculators Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Scale className="h-12 w-12 text-legal-blue mb-4" />
                <CardTitle>State-Specific Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our calculators are based on current state-specific alimony laws, guidelines, and judicial precedents
                  to provide the most accurate estimates possible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-legal-blue mb-4" />
                <CardTitle>Multiple Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We consider income differences, marriage duration, number of children, and other relevant factors
                  that courts typically evaluate when determining alimony awards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-legal-blue mb-4" />
                <CardTitle>Expert-Reviewed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our formulas are developed and reviewed by legal professionals familiar with family law
                  to ensure accuracy and compliance with current legal standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-trust-green mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Completely Free</h3>
                    <p className="text-muted-foreground">
                      No hidden fees, no registration required. Get instant alimony estimates at no cost.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-trust-green mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">All 50 US States</h3>
                    <p className="text-muted-foreground">
                      Comprehensive US coverage with state-specific calculations for accurate regional estimates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-trust-green mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Privacy Protected</h3>
                    <p className="text-muted-foreground">
                      Your financial information is not stored or shared. All calculations happen in your browser.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-trust-green mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Regularly Updated</h3>
                    <p className="text-muted-foreground">
                      Our calculations are updated to reflect changes in state laws and legal precedents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-trust-green mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Easy to Use</h3>
                    <p className="text-muted-foreground">
                      Simple, intuitive interface that provides results in seconds without legal jargon.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-trust-green mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Educational Resources</h3>
                    <p className="text-muted-foreground">
                      Learn about alimony laws and factors that influence court decisions in your state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise & Methodology */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Expertise & Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-legal-blue mb-4" />
                  <CardTitle>Legal Foundation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our calculations are based on comprehensive analysis of state family law statutes, court rules,
                    and established judicial guidelines across all 50 states.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Review of state-specific alimony statutes</li>
                    <li>• Analysis of judicial precedents and guidelines</li>
                    <li>• Regular updates reflecting law changes</li>
                    <li>• Cross-referenced with bar association resources</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Scale className="h-12 w-12 text-legal-blue mb-4" />
                  <CardTitle>Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Each calculator undergoes rigorous testing and review to ensure accuracy and reliability
                    within the bounds of general legal guidelines.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Legal professional review process</li>
                    <li>• Comparison with published guidelines</li>
                    <li>• Regular accuracy testing and validation</li>
                    <li>• Continuous improvement based on feedback</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section>
          <Card className="bg-yellow-50 border-yellow-200 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-yellow-800">Important Legal Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700 mb-4">
                AlimonyCalculator provides educational tools and estimates only. Our calculators are not a substitute
                for professional legal advice and should not be relied upon for making important legal or financial decisions.
              </p>
              <p className="text-yellow-700">
                Actual alimony awards are determined by courts based on specific circumstances, evidence presented,
                and judicial discretion. We strongly recommend consulting with a qualified family law attorney
                for personalized legal guidance regarding your situation.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
