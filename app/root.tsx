import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ToastProvider } from "./components/Toast";
import { siteUrl } from "./lib/seo";
import { ErrorContent } from "./routes/not-found";
import "./styles.css";

export function Layout({ children }: { children: ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "re:form",
    inLanguage: "ko-KR",
    description: "수리·리폼 전문 업체 탐색을 돕는 re:form 앱 소개 웹사이트",
    ...(siteUrl ? { url: siteUrl } : {}),
  };
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#075647" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </ToastProvider>
  );
}

export default function App() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <SiteLayout>
      <title>
        {notFound
          ? "페이지를 찾을 수 없습니다"
          : "페이지를 불러오지 못했습니다"}{" "}
        | re:form
      </title>
      <meta name="robots" content="noindex" />
      <ErrorContent notFound={notFound} />
    </SiteLayout>
  );
}
