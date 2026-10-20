import { Link, useLocation } from "react-router";
import { getBreadcrumbs } from "../lib/seo";

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const items = getBreadcrumbs(pathname.replace(/\/$/, "") || "/");
  if (!items.length) return null;
  return (
    <nav className="container breadcrumbs" aria-label="현재 위치">
      <ol>
        {items.map((item, i) => (
          <li key={item.path}>
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link to={item.path}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
