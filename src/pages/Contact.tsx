import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateFAQSchema } from "@/utils/structuredData";
import { SITE_URL } from "@/data/seo";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // FAQ data for structured data
  const faqs = [
    {
      question: "Are the calculations accurate?",
      answer: "Our calculators provide estimates based on state guidelines, but actual awards may vary based on specific circumstances and judicial discretion."
    },
    {
      question: "Is this legal advice?",
      answer: "No, our calculators are educational tools only. They do not constitute legal advice. For legal advice, consult with a qualified family law attorney."
    },
    {
      question: "Do you store my data?",
      answer: "No, all calculations are performed in your browser and we don't store any personal or financial information."
    }
  ];

  const structuredData = generateFAQSchema(faqs);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real application, this would send the form data to a server
    toast.success("Thank you for your message. We'll get back to you soon!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Contact LegalAlimonyCalculator.com | Calculator Support"
        description="Contact LegalAlimonyCalculator.com with questions or feedback about our free alimony calculators, spousal support estimates, and family-law resources."
        keywords="contact alimony calculator, calculator support, legal questions, spousal support help"
        canonical={`${SITE_URL}/contact`}
        structuredData={structuredData}
      />
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our alimony calculators or need assistance? We're here to help. 
            Reach out to us for support or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-legal-blue" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calculator-question">Calculator Question</SelectItem>
                        <SelectItem value="technical-support">Technical Support</SelectItem>
                        <SelectItem value="legal-inquiry">Legal Inquiry</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe how we can help you..."
                      className="min-h-32"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-6 w-6 text-legal-blue" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">General Inquiries</h4>
                  <p className="text-muted-foreground">
                    For questions about our calculators, features, or general support.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Response Time</h4>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-legal-blue" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Are the calculations accurate?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our calculators provide estimates based on state guidelines, but actual awards may vary.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Is this legal advice?</h4>
                  <p className="text-sm text-muted-foreground">
                    No, our calculators are educational tools only. Consult an attorney for legal advice.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Do you store my data?</h4>
                  <p className="text-sm text-muted-foreground">
                    No, all calculations are performed in your browser and we don't store personal information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> LegalAlimonyCalculator.com does not provide legal advice. 
                If you have specific legal questions or need representation, please consult with a qualified 
                family law attorney in your jurisdiction. Our responses to inquiries are for informational 
                purposes only and do not constitute attorney-client relationships.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
