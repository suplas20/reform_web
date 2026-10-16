import { Link } from "react-router";

export const meta = () => [
  { title: "페이지를 찾을 수 없습니다 | re:form" },
  { name: "robots", content: "noindex" },
];

export function ErrorContent({ notFound = true }: { notFound?: boolean }) {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">{notFound ? "404" : "RE:FORM"}</span>
        <h1>
          {notFound
            ? "페이지를 찾을 수 없습니다."
            : "페이지를 불러오지 못했습니다."}
        </h1>
        <p className="lead">
          {notFound
            ? "주소를 확인하거나 홈에서 다시 둘러보세요."
            : "잠시 후 다시 시도해 주세요."}
        </p>
        <Link to="/" className="btn">
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  );
}

export default function NotFoundPage() {
  return <ErrorContent />;
}
