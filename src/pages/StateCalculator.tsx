import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";
import SEOHead from "@/components/SEOHead";
import AuthorReview from "@/components/AuthorReview";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { getStateBySlug, getStateUrl, states } from "@/data/states";
import { SITE_URL } from "@/data/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateStateCalculatorSchema,
  generateWebPageSchema
} from "@/utils/structuredData";

type FaqItem = {
  question: string;
  answer: string;
};

type SidebarLinkProps = {
  href: string;
  label: string;
};

const faqItems = (stateName: string): FaqItem[] => [
  {
    question: `How is alimony calculated in ${stateName}?`,
    answer: `${stateName} courts generally review financial need, ability to pay, income, earning capacity, marriage duration, child-related obligations, and statutory support factors.`
  },
  {
    question: `Does ${stateName} have a fixed alimony formula?`,
    answer: `${stateName} may use guidelines or statutory factors depending on the type of support and case posture. Courts can adjust support based on the facts.`
  },
  {
    question: `Can ${stateName} alimony be modified?`,
    answer: "Many support orders can be modified after a substantial change in circumstances, but the rules depend on the order language and state law."
  }
];

const legalResourceLinks: SidebarLinkProps[] = [
  { href: "/state-law-references", label: "State Law References" },
  { href: "/data-sources", label: "Data Sources" },
  { href: "/legal-disclaimer", label: "Legal Disclaimer" }
];

const getRelatedStates = (currentCode: string) =>
  states.filter((item) => item.code !== currentCode).slice(0, 6);

const buildStructuredData = (stateRecord: (typeof states)[0], canonicalUrl: string, faqs: FaqItem[]) => [
  generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: `${stateRecord.name} Alimony Calculator`, url: canonicalUrl }
  ]),
  generateStateCalculatorSchema(stateRecord.name, stateRecord.calculatorSlug),
  generateWebPageSchema(`${stateRecord.name} Alimony Calculator`, `${stateRecord.name} alimony payments estimate with local spousal support insights.`, canonicalUrl),
  generateArticleSchema(`${stateRecord.name} Alimony Calculator (2026) - Spousal Support Estimate`, `Estimate ${stateRecord.name} alimony payments with a free state-wise alimony calculator. Review local spousal support factors, FAQs, legal notes, and monthly/yearly estimates.`, canonicalUrl),
  generateFAQSchema(faqs)
];

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <CardHeader>
    <CardTitle className="flex items-center gap-2">{icon}{title}</CardTitle>
  </CardHeader>
);

const StateInfoCard = ({ stateRecord }: { stateRecord: (typeof states)[0] }) => (
  <Card>
    <SectionTitle icon={<BookOpen className="h-6 w-6 text-legal-blue" />} title={`How Alimony is Calculated in ${stateRecord.name}`} />
    <CardContent className="space-y-4 text-muted-foreground">
      <p>{stateRecord.lawNote}</p>
      <p>{stateRecord.durationNote}</p>
      <h2 className="text-xl font-semibold text-foreground">Local Calculation Factors</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Annual income and earning capacity of both spouses</li>
        <li>Length of marriage and marital standard of living</li>
        <li>Existing child support and parenting obligations</li>
        <li>Age, health, employability, and education needs</li>
        <li>Assets, debts, and property division</li>
        <li>Any statutory caps, formulas, or court discretion in {stateRecord.name}</li>
      </ul>
    </CardContent>
  </Card>
);

const LegalNotesCard = ({ stateRecord }: { stateRecord: (typeof states)[0] }) => (
  <Card>
    <SectionTitle icon={null} title={`${stateRecord.name} Legal Notes`} />
    <CardContent className="space-y-4 text-muted-foreground">
      <p>Support can be temporary, rehabilitative, durational, reimbursement-based, lump sum, or long-term depending on state law and case facts.</p>
      <p>Calculator output should be treated as a planning range. A court may order a different amount after reviewing evidence, tax treatment, credibility, settlement terms, and local rules.</p>
      <div className="rounded-lg border bg-muted/40 p-4">
        <strong className="text-foreground">Data source note:</strong> {stateRecord.sourceNote}
      </div>
    </CardContent>
  </Card>
);

const FaqCard = ({ faqs }: { faqs: FaqItem[] }) => (
  <Card>
    <SectionTitle icon={null} title="Alimony FAQs" />
    <CardContent>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CardContent>
  </Card>
);

const SidebarCard = ({ children }: { children: React.ReactNode }) => <Card>{children}</Card>;

const SidebarLink = ({ href, label }: SidebarLinkProps) => (
  <Button variant="outline" className="w-full justify-between" asChild>
    <Link to={href}>
      {label}
      <ExternalLink className="h-4 w-4" />
    </Link>
  </Button>
);

const StateCalculator = () => {
  const { state = "" } = useParams<{ state: string }>();
  const stateRecord = getStateBySlug(state) || states.find((item) => item.slug === "california")!;
  const canonicalPath = getStateUrl(stateRecord);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const faqs = faqItems(stateRecord.name);
  const relatedStates = getRelatedStates(stateRecord.code);
  const structuredData = buildStructuredData(stateRecord, canonicalUrl, faqs);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${stateRecord.name} Alimony Calculator (2026) - Spousal Support Estimate`}
        description={`Estimate ${stateRecord.name} alimony payments with a free state-wise alimony calculator. Review local spousal support factors, FAQs, legal notes, and monthly/yearly estimates.`}
        keywords={`${stateRecord.name} alimony calculator, ${stateRecord.name} spousal support calculator, divorce alimony calculator, state-wise alimony calculator`}
        canonical={canonicalUrl}
        structuredData={structuredData}
      />

      <Navigation />

      <main className="container mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: `${stateRecord.name} Alimony Calculator`, href: canonicalPath }
          ]}
        />

        <Button variant="outline" className="mb-8" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to US Calculator
          </Link>
        </Button>

        <section className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-8 w-8 text-legal-blue" />
            <h1 className="text-4xl font-bold text-foreground">{stateRecord.name} Alimony Calculator</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estimate spousal support in {stateRecord.name} using income, marriage duration, child support, and local legal factors.
          </p>
        </section>

        <section className="mb-14">
          <Calculator state={stateRecord.name} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
          <div className="lg:col-span-2 space-y-8">
            <StateInfoCard stateRecord={stateRecord} />
            <LegalNotesCard stateRecord={stateRecord} />
            <FaqCard faqs={faqs} />
          </div>

          <aside className="space-y-6">
            <SidebarCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-trust-green" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p><strong>Currency:</strong> USD</p>
                <p><strong>Support type:</strong> Temporary and long-term estimate</p>
                <p><strong>Tax note:</strong> Federal post-2018 rules generally apply</p>
                <p><strong>Modification:</strong> Often possible after changed circumstances</p>
              </CardContent>
            </SidebarCard>

            <SidebarCard>
              <CardHeader>
                <CardTitle>Related State Calculators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedStates.map((item) => (
                  <Link key={item.code} to={getStateUrl(item)} className="block text-legal-blue hover:underline">
                    {item.name} Alimony Calculator
                  </Link>
                ))}
              </CardContent>
            </SidebarCard>

            <SidebarCard>
              <CardHeader>
                <CardTitle>Legal Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {legalResourceLinks.map((link) => (
                  <SidebarLink key={link.href} href={link.href} label={link.label} />
                ))}
              </CardContent>
            </SidebarCard>
          </aside>
        </section>

        <section className="mb-14">
          <AuthorReview />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StateCalculator;
