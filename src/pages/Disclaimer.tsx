import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Scale, Shield, FileText } from "lucide-react";
import { SITE_URL } from "@/data/seo";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Alimony Calculator Legal Disclaimer | Limits of Use"
        description="Read the legal disclaimer for AlimonyCalculator, including calculator limitations, educational-use guidance, liability boundaries, and privacy notes."
        keywords="legal disclaimer, privacy policy, alimony calculator legal terms, liability limitation"
        canonical={`${SITE_URL}/disclaimer`}
      />
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Legal Disclaimer & Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Important information about the use of our alimony calculators and your privacy rights.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Disclaimer */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-6 w-6" />
                Important Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-700 space-y-4">
              <p className="font-semibold">
                The alimony calculators provided on AlimonyCalculator are for informational and educational purposes only.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>These calculators provide estimates only and should not be considered legal advice</li>
                <li>Actual alimony awards are determined by courts based on specific circumstances and judicial discretion</li>
                <li>Results may not reflect current changes in state laws or recent legal precedents</li>
                <li>Individual cases may involve factors not accounted for in our calculations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Not Legal Advice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-6 w-6 text-legal-blue" />
                Not Legal Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The information and calculations provided on this website do not constitute legal advice and should not be relied upon as such.
                AlimonyCalculator does not establish an attorney-client relationship with users.
              </p>
              <p>
                For specific legal advice regarding your situation, you should consult with a qualified family law attorney
                licensed to practice in your jurisdiction. Laws vary by state and are subject to change.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold mb-2">We strongly recommend consulting an attorney if:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>You are involved in divorce or separation proceedings</li>
                  <li>You need to modify existing alimony arrangements</li>
                  <li>Your case involves complex financial situations</li>
                  <li>There are disputes about income calculation or duration</li>
                  <li>You have questions about enforcement of alimony orders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-legal-blue" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AlimonyCalculator, its owners, operators, and contributors shall not be liable for any damages,
                losses, or legal consequences arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use of our calculators or reliance on the estimates provided</li>
                <li>Inaccuracies in calculations due to changes in laws or court interpretations</li>
                <li>Decisions made based on information obtained from this website</li>
                <li>Technical errors, interruptions, or unavailability of the service</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Users acknowledge that they use this website and its calculators at their own risk and discretion.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-legal-blue" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Information Collection</h3>
              <p>
                We do not collect, store, or transmit any personal financial information entered into our calculators.
                All calculations are performed locally in your browser.
              </p>

              <h3 className="font-semibold">Data Storage</h3>
              <p>
                Your calculation inputs are not saved on our servers. When you close or refresh the page,
                all entered information is permanently deleted.
              </p>

              <h3 className="font-semibold">Contact Information</h3>
              <p>
                If you contact us through our contact form, we collect only the information you voluntarily provide
                (name, email, message) to respond to your inquiry. This information is not shared with third parties.
              </p>

              <h3 className="font-semibold">Cookies and Analytics</h3>
              <p>
                We may use basic analytics to understand website usage patterns, but we do not track personal information
                or link analytics data to individual users.
              </p>
            </CardContent>
          </Card>

          {/* Accuracy and Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Accuracy and Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                While we strive to keep our calculators current with applicable laws and guidelines,
                we cannot guarantee that all information is completely up-to-date or accurate for every jurisdiction.
              </p>
              <p>
                State laws regarding alimony are subject to change, and courts may interpret guidelines differently.
                We recommend verifying current laws and seeking professional legal counsel for the most accurate information.
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* Contact for Legal Issues */}
          <Card className="bg-legal-blue/10 border-legal-blue/20">
            <CardContent className="pt-6">
              <p className="text-center font-semibold mb-4">
                Need Legal Representation?
              </p>
              <p className="text-center text-muted-foreground">
                For qualified legal advice and representation in family law matters,
                please consult with a licensed attorney in your area. We recommend contacting
                your state bar association for attorney referrals.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
