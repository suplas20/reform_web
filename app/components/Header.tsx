import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowIcon } from "./Icons";

const navigation = [
  { to: "/about", label: "서비스 소개" },
  { to: "/features", label: "주요 기능" },
  { to: "/stories", label: "리폼 이야기" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.key]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return;
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle.current) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("nav-open");
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="logo" to="/" aria-label="re:form 홈">
            re<span className="colon">:</span>form
          </Link>
          <nav className="desktop-nav" aria-label="주 메뉴">
            {navigation.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link to="/download" className="btn btn-sm">
              앱 다운로드 <ArrowIcon size={14} />
            </Link>
            <button
              ref={toggle}
              type="button"
              className="mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={`모바일 메뉴 ${open ? "닫기" : "열기"}`}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path
                  d={open ? "m6 6 12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className={open ? "nav-open" : ""}>
        <div
          ref={menu}
          id="mobile-menu"
          className="mobile-menu"
          aria-hidden={!open}
          inert={!open}
        >
          <nav aria-label="모바일 메뉴">
            <NavLink to="/" end onClick={() => setOpen(false)}>
              홈
            </NavLink>
            {navigation.map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <Link to="/download" className="btn" onClick={() => setOpen(false)}>
              앱 다운로드 <ArrowIcon />
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
