import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AuthorReview from "@/components/AuthorReview";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogCategories, SITE_URL } from "@/data/seo";
import { states, getStateUrl } from "@/data/states";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/utils/structuredData";

type TrustPageProps = {
  slug: string;
};

const pageCopy: Record<string, { title: string; description: string; sections: Array<{ heading: string; body: string | string[] }> }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    description: "Learn how LegalAlimonyCalculator.com protects calculator privacy and handles contact form information.",
    sections: [
      { heading: "Calculator Privacy", body: "Income and alimony inputs are calculated in your browser. We do not require registration to use the calculator." },
      { heading: "Contact Forms", body: "If you contact us, we may use the information you provide to respond to your request. Do not submit confidential legal facts through the contact form." },
      { heading: "Analytics and Cookies", body: "The site may use privacy-conscious analytics to understand page performance and improve helpful content. Users should review browser settings for cookie controls." }
    ]
  },
  "terms-and-conditions": {
    title: "Terms and Conditions",
    description: "Terms for using the free US alimony calculator, legal information pages, and website tools.",
    sections: [
      { heading: "Educational Use", body: "The website provides educational legal-financial calculators and general information. It does not provide legal advice or representation." },
      { heading: "No Guarantee", body: "Calculator estimates are not guaranteed outcomes. Courts, mediators, attorneys, and parties may reach different amounts." },
      { heading: "Acceptable Use", body: "Users agree not to misuse the website, interfere with availability, or rely on the tool as a substitute for professional advice." }
    ]
  },
  "editorial-policy": {
    title: "Editorial Policy",
    description: "Our editorial policy explains sourcing, review, updates, and quality standards for alimony content.",
    sections: [
      { heading: "Helpful Content Standards", body: "We write for people navigating divorce planning in the United States, using plain language, clear disclaimers, and practical context." },
      { heading: "Review Workflow", body: "Content is prepared by a family law research analyst and reviewed for general legal accuracy by a divorce attorney reviewer." },
      { heading: "Update Policy", body: "Core calculator pages are reviewed periodically and whenever major public legal changes affect state support calculations." }
    ]
  },
  "legal-disclaimer": {
    title: "Legal Disclaimer",
    description: "Important legal disclaimer for LegalAlimonyCalculator.com alimony estimates and educational content.",
    sections: [
      { heading: "Not Legal Advice", body: "This calculator provides estimated alimony figures based on publicly available guidelines and should not be considered legal advice." },
      { heading: "No Attorney-Client Relationship", body: "Using this website, contacting us, or reading reviewed content does not create an attorney-client relationship." },
      { heading: "Consult Local Counsel", body: "Alimony law is state-specific and fact-sensitive. Speak with a licensed family law attorney before making legal or financial decisions." }
    ]
  },
  "meet-our-experts": {
    title: "Meet Our Experts",
    description: "Meet the research and legal review contributors behind the US alimony calculator platform.",
    sections: [
      { heading: "Michael Anderson", body: "Family Law Research Analyst with 8+ years of experience analyzing divorce laws, spousal support policies, and alimony calculation methods across US states." },
      { heading: "Sarah Mitchell", body: "Divorce Attorney reviewer for general legal terminology, YMYL clarity, and public-facing family law explanations." }
    ]
  },
  "how-we-calculate-alimony": {
    title: "How We Calculate Alimony",
    description: "Learn how the US alimony calculator estimates spousal support using income, state factors, duration, and child support adjustments.",
    sections: [
      { heading: "Inputs", body: ["Payer annual income", "Recipient annual income", "US state", "Marriage duration", "Number of children", "Monthly child support paid"] },
      { heading: "Formula Approach", body: "The model starts with income difference, applies a state adjustment factor, scales by marriage duration, and then accounts for child-related support obligations." },
      { heading: "Output", body: "Results include estimated monthly support, yearly support, temporary support, long-term support, and suggested duration for planning." }
    ]
  },
  "data-sources": {
    title: "Data Sources",
    description: "Review the public data source categories used to maintain alimony calculator guidance.",
    sections: [
      { heading: "Primary Source Categories", body: ["State family law statutes", "State judiciary self-help resources", "Court rules and public forms", "Public bar association educational materials", "Federal tax guidance for alimony treatment"] },
      { heading: "Limitations", body: "State laws, local rules, and court practices change. Source notes are educational references, not a complete legal research file." }
    ]
  },
  "state-law-references": {
    title: "State Law References",
    description: "Browse state-wise alimony calculator references and internal links for all US states.",
    sections: [
      { heading: "State Calculator Library", body: "Each state page includes local support notes, common legal factors, FAQs, and calculator access." },
      { heading: "Research Scope", body: "State pages are designed as plain-English starting points for understanding spousal support issues before attorney consultation." }
    ]
  },
  "blog": {
    title: "Alimony and Divorce Law Blog",
    description: "SEO blog structure for divorce laws, spousal support, state alimony guides, family law, and legal financial planning.",
    sections: [
      { heading: "Blog Categories", body: blogCategories },
      { heading: "Publishing Strategy", body: "Future articles should answer specific user questions, cite primary public sources where possible, include author/reviewer details, and link to relevant state calculators." }
    ]
  }
};

const TrustPage = ({ slug }: TrustPageProps) => {
  const page = pageCopy[slug] || pageCopy["legal-disclaimer"];
  const url = `${SITE_URL}/${slug}`;
  const structuredData = [
    generateWebPageSchema(page.title, page.description, url),
    generateBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: page.title, url }
    ])
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${page.title} - LegalAlimonyCalculator.com`}
        description={page.description}
        canonical={url}
        structuredData={structuredData}
      />
      <Navigation />
      <main className="container mx-auto px-4 py-10">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.title, href: `/${slug}` }]} />
        <section className="max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          <p className="text-xl text-muted-foreground">{page.description}</p>
        </section>

        <section className="max-w-4xl mx-auto space-y-6 mb-12">
          {page.sections.map((section) => (
            <Card key={section.heading}>
              <CardHeader>
                <CardTitle>{section.heading}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {Array.isArray(section.body) ? (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.body.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : (
                  <p>{section.body}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        {slug === "state-law-references" && (
          <section className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {states.map((state) => (
                <a key={state.code} className="rounded-lg border p-3 text-sm hover:border-legal-blue hover:text-legal-blue" href={getStateUrl(state)}>
                  {state.name}
                </a>
              ))}
            </div>
          </section>
        )}

        {["editorial-policy", "meet-our-experts", "how-we-calculate-alimony"].includes(slug) && <AuthorReview />}
      </main>
      <Footer />
    </div>
  );
};

export default TrustPage;
