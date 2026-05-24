import { Link } from "react-router-dom";

type Crumb = {
  name: string;
  href: string;
};

const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <li key={item.href} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">/</span>}
          {index === items.length - 1 ? (
            <span aria-current="page" className="font-medium text-foreground">{item.name}</span>
          ) : (
            <Link to={item.href} className="hover:text-legal-blue hover:underline">{item.name}</Link>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
