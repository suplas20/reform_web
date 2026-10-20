import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, it } from "vitest";
import App from "../app/root";
import HomePage from "../app/routes/home";
import AboutPage from "../app/routes/about";
import FeaturesPage from "../app/routes/features";
import StoriesPage from "../app/routes/stories";
import StoryPage from "../app/routes/story";
import FaqPage from "../app/routes/faq";
import DownloadPage from "../app/routes/download";
import TermsPage from "../app/routes/terms";
import PrivacyPage from "../app/routes/privacy";
import { staticPaths } from "../app/lib/paths";
import GuidesPage from "../app/routes/guides";
import GuidePage from "../app/routes/guide";
import EditorialPage from "../app/routes/editorial";

function renderPage(path: string) {
  const router = createMemoryRouter(
    [
      {
        element: <App />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/features", element: <FeaturesPage /> },
          { path: "/stories", element: <StoriesPage /> },
          { path: "/stories/:slug", element: <StoryPage /> },
          { path: "/guides", element: <GuidesPage /> },
          { path: "/guides/:category", element: <GuidePage /> },
          { path: "/editorial-policy", element: <EditorialPage /> },
          { path: "/faq", element: <FaqPage /> },
          { path: "/download", element: <DownloadPage /> },
          { path: "/terms", element: <TermsPage /> },
          { path: "/privacy", element: <PrivacyPage /> },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  render(<RouterProvider router={router} />);
  return router;
}

it.each(staticPaths)(
  "announces the release for every download action on %s",
  async (path) => {
    const user = userEvent.setup();
    const router = renderPage(path);
    const buttons = screen.getAllByRole("button", {
      name: /앱 다운로드|앱 만나보기|App Store 다운로드|Google Play 다운로드/,
    });
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    for (const button of buttons) {
      await user.click(button);
      expect(screen.getByRole("status").textContent).toBe("출시 예정입니다");
      expect(router.state.location.pathname).toBe(path);
    }
  },
);

it("announces the release and closes the mobile menu", async () => {
  const user = userEvent.setup();
  const router = renderPage("/about");
  await user.click(screen.getByRole("button", { name: "모바일 메뉴 열기" }));
  const menu = screen.getByRole("navigation", { name: "모바일 메뉴" });
  const download = within(menu).getByRole("button", { name: "앱 다운로드" });
  download.focus();
  await user.tab();
  expect(document.activeElement).toBe(
    screen.getByRole("button", { name: "모바일 메뉴 닫기" }),
  );
  await user.click(download);
  expect(screen.getByRole("status").textContent).toBe("출시 예정입니다");
  expect(screen.queryByRole("navigation", { name: "모바일 메뉴" })).toBeNull();
  expect(document.body.classList.contains("nav-open")).toBe(false);
  expect(router.state.location.pathname).toBe("/about");
});
