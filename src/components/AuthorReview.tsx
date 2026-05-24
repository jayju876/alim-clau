import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { author, LAST_UPDATED, reviewer } from "@/data/seo";
import { Award, CalendarCheck, ShieldCheck } from "lucide-react";

const AuthorReview = () => (
  <Card className="max-w-4xl mx-auto border-legal-blue/20">
    <CardContent className="p-6">
      <div className="grid gap-6 md:grid-cols-[auto,1fr]">
        <img
          src={author.image}
          alt={`${author.name}, ${author.title}`}
          width="96"
          height="96"
          loading="lazy"
          className="h-24 w-24 rounded-full border bg-muted"
        />
        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold">Written by {author.name}</h2>
              <Badge variant="secondary">{author.title}</Badge>
            </div>
            <p className="mt-2 text-muted-foreground">{author.bio}</p>
            <a className="mt-2 inline-block text-sm font-medium text-legal-blue hover:underline" href={author.linkedin} rel="nofollow noopener noreferrer" target="_blank">
              LinkedIn profile
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm">
              <CalendarCheck className="h-4 w-4 text-legal-blue" />
              <span>Last Updated: {LAST_UPDATED}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-legal-gold" />
              <span>Reviewed By: {reviewer.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-trust-green" />
              <span>Attorney reviewed: {reviewer.reviewedDate}</span>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Legal review note:</strong> {reviewer.note}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default AuthorReview;
