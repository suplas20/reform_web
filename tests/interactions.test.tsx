import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it, vi } from "vitest";
import FaqPage from "../app/routes/faq";
import StoriesPage from "../app/routes/stories";
import StoryPage from "../app/routes/story";
import { Header } from "../app/components/Header";
import { StoreButtons } from "../app/components/StoreButtons";
import { CopyLinkButton } from "../app/components/CopyLinkButton";
import { ToastProvider } from "../app/components/Toast";

describe("FAQ", () => {
  it("combines category and answer search, expands answers, and recovers from no results", async () => {
    const user = userEvent.setup();
    render(<FaqPage />);
    expect(document.querySelectorAll("details")).toHaveLength(10);
    await user.click(screen.getByRole("button", { name: "서비스 소개" }));
    expect(document.querySelectorAll("details")).toHaveLength(2);
    const search = screen.getByRole("searchbox", { name: "FAQ 검색" });
    await user.type(search, "마케팅");
    expect(document.querySelectorAll("details")).toHaveLength(1);
    await user.click(
      screen.getByText("Q. 웹사이트에서도 업체를 검색할 수 있나요?"),
    );
    expect(document.querySelector("details")?.open).toBe(true);
    await user.clear(search);
    await user.type(search, "존재하지않는검색어");
    expect(screen.getByRole("status").textContent).toContain(
      "검색 결과가 없습니다",
    );
    await user.clear(search);
    await user.click(screen.getByRole("button", { name: "전체" }));
    expect(document.querySelectorAll("details")).toHaveLength(10);
    expect(document.querySelectorAll("details[open]")).toHaveLength(0);
  });
});

describe("stories", () => {
  it("reads deep-linked filters, updates the URL, and restores filters on browser back", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [{ path: "/stories", element: <StoriesPage /> }],
      { initialEntries: ["/stories?category=bag"] },
    );
    render(<RouterProvider router={router} />);
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toContain(
      "가죽 가방",
    );
    await user.click(screen.getByRole("button", { name: "전체" }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(router.state.location.search).toBe("");
    await user.click(screen.getByRole("button", { name: "신발" }));
    expect(router.state.location.search).toBe("?category=shoes");
    expect(screen.getByRole("heading", { level: 3 }).textContent).toContain(
      "운동화",
    );
    await act(() => router.navigate(-1));
    expect(screen.getAllByRole("article")).toHaveLength(6);
    await act(() => router.navigate(-1));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen
        .getByRole("button", { name: "가방/가죽" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });

  it("falls back to all stories for an unsupported category", () => {
    render(
      <MemoryRouter initialEntries={["/stories?category=invalid"]}>
        <StoriesPage />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("shows a recovery link for an unknown story", () => {
    const router = createMemoryRouter(
      [{ path: "/stories/:slug", element: <StoryPage /> }],
      { initialEntries: ["/stories/missing"] },
    );
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "페이지를 찾을 수 없습니다",
    );
    expect(
      screen
        .getByRole("link", { name: "홈으로 돌아가기" })
        .getAttribute("href"),
    ).toBe("/");
  });
});

describe("mobile navigation", () => {
  it("moves focus into the menu, closes with Escape, and restores focus and scrolling", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const toggle = screen.getByRole("button", { name: "모바일 메뉴 열기" });
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(document.body.classList.contains("nav-open")).toBe(true);
    const mobile = screen.getByRole("navigation", { name: "모바일 메뉴" });
    expect(document.activeElement).toBe(
      within(mobile).getByRole("link", { name: "홈" }),
    );
    await user.keyboard("{Escape}");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
    expect(document.body.classList.contains("nav-open")).toBe(false);
    expect(
      screen.queryByRole("navigation", { name: "모바일 메뉴" }),
    ).toBeNull();
  });

  it("closes after navigating and marks the destination active", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: "모바일 메뉴 열기" }));
    await user.click(
      within(screen.getByRole("navigation", { name: "모바일 메뉴" })).getByRole(
        "link",
        { name: "서비스 소개" },
      ),
    );
    expect(
      screen
        .getByRole("button", { name: "모바일 메뉴 열기" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
    expect(
      screen
        .getByRole("link", { name: "서비스 소개" })
        .getAttribute("aria-current"),
    ).toBe("page");
  });
});

describe("download and sharing", () => {
  it("announces that downloads are not available yet", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <StoreButtons />
      </ToastProvider>,
    );
    await user.click(
      screen.getByRole("button", { name: /App Store 다운로드/ }),
    );
    expect(screen.getByRole("status").textContent).toContain("앱 출시 후");
  });

  it("copies the URL and reports success", async () => {
    const user = userEvent.setup();
    const copy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(
      <ToastProvider>
        <CopyLinkButton />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: /링크 복사/ }));
    expect(copy).toHaveBeenCalledWith(window.location.href);
    expect(screen.getByRole("status").textContent).toBe(
      "페이지 주소를 복사했습니다.",
    );
  });

  it("provides a fallback when clipboard access fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("denied"),
    );
    render(
      <ToastProvider>
        <CopyLinkButton />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: /링크 복사/ }));
    expect(screen.getByRole("status").textContent).toBe(
      "주소창에서 페이지 주소를 복사해 주세요.",
    );
  });
});
