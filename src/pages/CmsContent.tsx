import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL } from "@/data/seo";

type CmsContentProps = {
  type: "blog" | "page";
};

const parseFaqs = (value = "") =>
  value.split("\n").filter(Boolean).map((line) => {
    const [question, answer] = line.split("|");
    return { question: question?.trim(), answer: answer?.trim() };
  }).filter((item) => item.question && item.answer);

const parseLinks = (value = "") =>
  value.split("\n").filter(Boolean).map((line) => {
    const [label, url] = line.split("|");
    return { label: label?.trim(), url: url?.trim() };
  }).filter((item) => item.label && item.url);

const buildCmsTitle = (type: CmsContentProps["type"], title: string) =>
  type === "blog" ? `${title} | Alimony & Divorce Law` : title;

const buildCmsDescription = (type: CmsContentProps["type"], record: any) => {
  if (record.excerpt) return record.excerpt;
  return type === "blog"
    ? `Read ${record.title} for practical guidance on alimony, spousal support, and divorce law in the United States.`
    : `Explore ${record.title} for clear educational information about alimony, spousal support, and family-law planning.`;
};

const CmsContent = ({ type }: CmsContentProps) => {
  const { slug = "" } = useParams();
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/${type === "blog" ? "blogs" : "pages"}/${slug}`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(setRecord)
      .finally(() => setLoading(false));
  }, [slug, type]);

  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  if (!record) return <div className="min-h-screen grid place-items-center">Content not found</div>;

  const seo = record.seo || {};
  const faqs = parseFaqs(record.faqs);
  const links = parseLinks(record.internalLinks);
  const canonical = seo.canonicalUrl || `${SITE_URL}/${type === "blog" ? "blog" : "p"}/${record.slug}`;
  const fallbackTitle = buildCmsTitle(type, record.title);
  const fallbackDescription = buildCmsDescription(type, record);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seo.metaTitle || fallbackTitle}
        description={seo.metaDescription || fallbackDescription}
        keywords={seo.metaKeywords}
        canonical={canonical}
        image={record.featuredImage || undefined}
        structuredData={{
          "@context": "https://schema.org",
          "@type": type === "blog" ? "Article" : "WebPage",
          "headline": record.title,
          "description": seo.metaDescription || fallbackDescription,
          "dateModified": record.lastUpdated || record.updatedAt,
          "author": record.author ? { "@type": "Person", "name": record.author.name } : undefined
        }}
      />
      <Navigation />
      <main className="container mx-auto px-4 py-10">
        <article className="mx-auto max-w-4xl">
          {record.featuredImage && (
            <img src={record.featuredImage} alt={record.title} className="mb-8 aspect-video w-full rounded-lg object-cover" loading="lazy" />
          )}
          <p className="mb-3 text-sm text-muted-foreground">Last updated: {record.lastUpdated || record.updatedAt?.slice(0, 10)}</p>
          <h1 className="mb-4 text-4xl font-bold">{record.headings?.h1 || record.title}</h1>
          {record.excerpt && <p className="mb-8 text-xl text-muted-foreground">{record.excerpt}</p>}
          <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: record.content }} />

          {links.length > 0 && (
            <Card className="mt-10">
              <CardContent className="p-6">
                <h2 className="mb-3 text-xl font-semibold">Related Resources</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {links.map((link) => <Link key={link.url} to={link.url} className="text-legal-blue hover:underline">{link.label}</Link>)}
                </div>
              </CardContent>
            </Card>
          )}

          {faqs.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="rounded-lg border px-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {type === "blog" && record.author && (
            <Card className="mt-10">
              <CardContent className="flex gap-4 p-6">
                {record.author.image && <img src={record.author.image} alt={record.author.name} className="h-20 w-20 rounded-full object-cover" loading="lazy" />}
                <div>
                  <h2 className="text-xl font-bold">Written by {record.author.name}</h2>
                  <p className="text-muted-foreground">{record.author.bio}</p>
                  {record.author.linkedin && <a href={record.author.linkedin} className="text-sm text-legal-blue hover:underline" target="_blank" rel="noreferrer">LinkedIn profile</a>}
                </div>
              </CardContent>
            </Card>
          )}

          {record.disclaimer && (
            <div className="mt-10 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
              <strong>Disclaimer:</strong> {record.disclaimer}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default CmsContent;
