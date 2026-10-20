import { Link } from "react-router";
import { guides, guidePath } from "../data/guides";

export function GuideLinks({ exclude }: { exclude?: string }) {
  return (
    <ul className="guide-links">
      {guides
        .filter((guide) => guide.id !== exclude)
        .map((guide) => (
          <li key={guide.id}>
            <Link to={guidePath(guide)}>{guide.title}</Link>
          </li>
        ))}
    </ul>
  );
}
