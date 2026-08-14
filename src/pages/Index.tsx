import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";
import SEOHead from "@/components/SEOHead";
import AuthorReview from "@/components/AuthorReview";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calculator as CalculatorIcon, FileText, Lock, MapPin, Scale, Shield, Star, Users } from "lucide-react";
import { featuredStates, getStateUrl, states } from "@/data/states";
import { SITE_URL } from "@/data/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
  generateWebsiteSchema
} from "@/utils/structuredData";

const faqs = [
  {
    question: "How accurate is this US alimony calculator?",
    answer: "It provides an educational estimate using common public support factors such as income difference, marriage length, child support obligations, and state-specific adjustments. It is not a court order or legal advice."
  },
  {
    question: "Does every state calculate alimony the same way?",
    answer: "No. Some states use formulas for temporary support, some use statutory caps, and many rely heavily on judicial discretion. That is why the calculator includes a state selector."
  },
  {
    question: "Can child support reduce spousal support?",
    answer: "Often yes. Courts may consider child support and parenting-related obligations when reviewing ability to pay and financial need."
  },
  {
    question: "Is alimony taxable in the United States?",
    answer: "For most divorce or separation instruments executed after December 31, 2018, alimony is not deductible by the payer and is not taxable income to the recipient under federal tax rules."
  },
  {
    question: "Do you store my income information?",
    answer: "No. The calculator runs in your browser and does not submit income data to a server."
  }
];

const toc = [
  ["calculator", "Calculator"],
  ["how-calculated", "How alimony is calculated"],
  ["factors", "Support factors"],
  ["temporary-permanent", "Temporary vs permanent"],
  ["state-laws", "State-based laws"],
  ["accuracy", "Accuracy"],
  ["faq", "FAQ"]
];

const Index = () => {
  const title = "US Alimony Calculator by State (2026)";
  const description = "Estimate monthly and yearly spousal support with a free US alimony calculator. Compare state factors, income differences, marriage duration, and child support.";
  const structuredData = [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateSoftwareApplicationSchema(),
    generatePersonSchema(),
    generateWebPageSchema("US Alimony Calculator", description, SITE_URL),
    generateArticleSchema(title, description, SITE_URL),
    generateBreadcrumbSchema([{ name: "Home", url: SITE_URL }]),
    generateFAQSchema(faqs)
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={title}
        description={description}
        keywords="alimony calculator in US, US alimony calculator, spousal support calculator USA, divorce alimony calculator, state-wise alimony calculator"
        canonical={`${SITE_URL}/`}
        type="website"
        structuredData={structuredData}
      />
      <Navigation />

      <main>
        <section className="bg-gradient-to-br from-legal-blue/5 to-legal-gold/10 py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-5 bg-trust-green text-white hover:bg-trust-green">Updated for US spousal support estimates</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">US Alimony Calculator</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Estimate monthly and yearly spousal support by state using income, marriage duration, child support, and common US family-law factors.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <a href="#calculator">Calculate Alimony</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/how-we-calculate-alimony">How We Calculate</Link>
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center justify-center gap-2"><Lock className="h-4 w-4 text-trust-green" /> Browser-only calculations</span>
                <span className="inline-flex items-center justify-center gap-2"><Shield className="h-4 w-4 text-trust-green" /> Attorney-reviewed legal notes</span>
                <span className="inline-flex items-center justify-center gap-2"><Scale className="h-4 w-4 text-trust-green" /> All 50 US states</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b bg-background py-4">
          <div className="container mx-auto px-4">
            <nav aria-label="Table of contents" className="flex gap-3 overflow-x-auto text-sm">
              {toc.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-md border px-3 py-2 hover:border-legal-blue hover:text-legal-blue">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section id="calculator" className="py-14 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Free US Alimony Calculator</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use USD annual income, select your state, and see temporary, long-term, monthly, and yearly estimates.
              </p>
            </div>
            <Calculator />
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Featured State-Wise Alimony Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {featuredStates.map((state) => (
                <Card key={state.code} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-legal-blue" />{state.name}</span>
                      <Star className="h-4 w-4 text-legal-gold fill-current" />
                    </CardTitle>
                    <CardDescription>{state.name} spousal support estimate and legal notes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={getStateUrl(state)}>Open Calculator <ArrowRight className="h-4 w-4 ml-2" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-8 max-w-6xl mx-auto">
              <aside className="lg:sticky lg:top-24 h-fit rounded-lg border bg-background p-5">
                <h2 className="font-semibold mb-3">Legal Calculator Guides</h2>
                <div className="space-y-2 text-sm">
                  <Link className="block text-legal-blue hover:underline" to="/how-we-calculate-alimony">How we calculate alimony</Link>
                  <Link className="block text-legal-blue hover:underline" to="/data-sources">Data sources</Link>
                  <Link className="block text-legal-blue hover:underline" to="/state-law-references">State law references</Link>
                  <a className="block text-legal-blue hover:underline" href="#state-laws">State alimony laws</a>
                  <a className="block text-legal-blue hover:underline" href="#faq">Alimony duration FAQ</a>
                  <span className="block text-muted-foreground">Child support calculator</span>
                  <span className="block text-muted-foreground">Divorce cost calculator</span>
                </div>
              </aside>

              <div className="space-y-8">
                <Card id="how-calculated" className="scroll-mt-24">
                  <CardHeader>
                    <CardTitle>How Alimony is Calculated in the US</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>US alimony, also called spousal support or maintenance, is usually based on financial need and ability to pay. Courts often review gross income, net income, assets, debts, earning capacity, marriage length, health, age, child-related obligations, and the standard of living during marriage.</p>
                    <p>Some states publish formulas for temporary support. Others provide statutory factors and leave the amount to judicial discretion. This divorce alimony calculator uses a transparent estimate model and state adjustment factors to help users understand a likely support range.</p>
                  </CardContent>
                </Card>

                <Card id="factors" className="scroll-mt-24">
                  <CardHeader>
                    <CardTitle>Factors That Affect Spousal Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {["Income difference", "Marriage duration", "Child support obligations", "Earning capacity", "Health and age", "Marital standard of living", "Property division", "State statutory factors"].map((factor) => (
                        <div key={factor} className="rounded-lg border bg-background p-3 text-sm">{factor}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card id="temporary-permanent" className="scroll-mt-24">
                  <CardHeader>
                    <CardTitle>Temporary vs Permanent Alimony</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p><strong className="text-foreground">Temporary alimony</strong> may be ordered while a divorce is pending so both spouses can meet basic expenses during the case.</p>
                    <p><strong className="text-foreground">Permanent or long-term alimony</strong> is less common and usually tied to long marriages, major income disparity, age, disability, or limited earning capacity. Many states now prefer durational or rehabilitative support where appropriate.</p>
                  </CardContent>
                </Card>

                <Card id="state-laws" className="scroll-mt-24">
                  <CardHeader>
                    <CardTitle>State-Based Alimony Laws</CardTitle>
                    <CardDescription>Use these internal links for state-wise alimony calculator pages.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {states.map((state) => (
                        <Link key={state.code} to={getStateUrl(state)} className="rounded-lg border bg-background p-3 text-sm hover:border-legal-blue hover:text-legal-blue">
                          {state.name}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Alimony Payments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>There is no single average alimony payment that fits every divorce. A short marriage with similar incomes may produce no support, while a long marriage with one high earner and one dependent spouse can produce significant monthly support.</p>
                    <p>The most useful benchmark is a state-specific range that accounts for income difference, duration, child support, and ability to pay.</p>
                  </CardContent>
                </Card>

                <Card id="accuracy" className="scroll-mt-24">
                  <CardHeader>
                    <CardTitle>How Accurate This Calculator Is</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>The tool is designed for planning and education. It can help you prepare questions for a mediator or attorney, compare scenarios, and understand the financial impact of support. It cannot predict a judge's exact order.</p>
                    <p>For any legal filing, settlement proposal, or tax-sensitive decision, speak with a licensed family law attorney in your state.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader><CalculatorIcon className="h-10 w-10 text-legal-blue mb-3" /><CardTitle>Transparent Formula</CardTitle></CardHeader>
                <CardContent className="text-muted-foreground">Results show monthly, yearly, temporary, and long-term estimates so users can compare practical outcomes.</CardContent>
              </Card>
              <Card>
                <CardHeader><Users className="h-10 w-10 text-legal-blue mb-3" /><CardTitle>Reviewed Content</CardTitle></CardHeader>
                <CardContent className="text-muted-foreground">Author and legal review sections support EEAT expectations for a legal-financial YMYL topic.</CardContent>
              </Card>
              <Card>
                <CardHeader><FileText className="h-10 w-10 text-legal-blue mb-3" /><CardTitle>Printable Results</CardTitle></CardHeader>
                <CardContent className="text-muted-foreground">Print, save PDF, or email your estimate for personal planning or attorney consultations.</CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="py-14 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="rounded-lg border bg-background px-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <AuthorReview />
          </div>
        </section>

        <section className="py-14 bg-legal-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a State-Specific Attorney Review?</h2>
            <p className="text-lg mb-7 max-w-2xl mx-auto opacity-90">
              Use the calculator for planning, then bring your estimate to a licensed family law attorney for legal advice.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact">Request Consultation Information</Link>
            </Button>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 shadow-lg backdrop-blur md:hidden">
          <Button className="w-full" asChild><a href="#calculator">Calculate Alimony</a></Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
