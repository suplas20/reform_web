import { useState } from "react";
import { faqCategories, faqs } from "../data/faq";
import { pages } from "../data/pages";
import { createPageMeta } from "../lib/seo";
import { SearchIcon } from "../components/Icons";

export const meta = () => createPageMeta(pages.faq);

export default function FaqPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
  const visibleFaqs = faqs.filter(
    (faq) =>
      (category === "all" || faq.category === category) &&
      `${faq.question} ${faq.answer}`
        .toLocaleLowerCase("ko-KR")
        .includes(normalizedQuery),
  );

  return (
    <>
      <section className="faq-title">
        <div className="container">
          <span className="eyebrow">FAQ</span>
          <h1>자주 묻는 질문</h1>
          <p className="lead">
            re:form 이용에 대해 자주 묻는 질문을 모았습니다.
          </p>
        </div>
      </section>
      <section>
        <div className="container faq-layout">
          <aside className="faq-sidebar" aria-label="질문 카테고리">
            {faqCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`faq-category${category === item.id ? " active" : ""}`}
                aria-pressed={category === item.id}
                onClick={() => {
                  setCategory(item.id);
                  setExpanded([]);
                }}
              >
                {item.label}
              </button>
            ))}
          </aside>
          <div>
            <label className="faq-search">
              <SearchIcon />
              <input
                type="search"
                placeholder="궁금한 내용을 검색해 보세요"
                aria-label="FAQ 검색"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setExpanded([]);
                }}
              />
            </label>
            <div className="faq-list">
              {visibleFaqs.map((faq) => (
                <details
                  key={faq.id}
                  className="faq-item"
                  open={expanded.includes(faq.id)}
                >
                  <summary
                    onClick={(event) => {
                      event.preventDefault();
                      setExpanded((ids) =>
                        ids.includes(faq.id)
                          ? ids.filter((id) => id !== faq.id)
                          : [...ids, faq.id],
                      );
                    }}
                  >
                    {faq.question}
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
            {visibleFaqs.length === 0 && (
              <p
                className="faq-empty"
                style={{ display: "block" }}
                role="status"
              >
                검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
