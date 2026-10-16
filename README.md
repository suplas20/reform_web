# re:form 웹사이트

기존 HTML 시안 14개 페이지를 React + TypeScript로 옮긴 앱 소개 사이트입니다. 실행과 배포는 저장소 루트에서 합니다.

- React + Vite + React Router Framework Mode
- React Router 공식 `prerender`로 전체 페이지를 빌드 시 HTML로 생성
- `ssr: false`로 운영 서버 없이 Cloudflare Pages에서 정적 파일 제공
- FAQ 검색/분류/펼치기, URL과 연동되는 이야기 필터, 모바일 메뉴, 다운로드 안내, 링크 복사

## 로컬 실행

Node.js 24를 사용하세요. 의존성은 `package-lock.json`으로 고정합니다.

```bash
npm ci
npm run dev
```

개발 주소는 터미널에 표시됩니다(기본 `http://127.0.0.1:5173`).

```bash
npm run check    # 타입 검사 → UI 동작 테스트 → SSG 빌드 → 정적 산출물 검사
npm run preview  # 빌드 결과를 Cloudflare Pages 환경으로 로컬 확인
```

`preview` 전에 `npm run build` 또는 `npm run check`를 실행하세요. Wrangler 최초 실행에는 패키지 설치와 실행 환경 초기화가 필요할 수 있습니다.

## 페이지와 소스

| 주소                 | 내용                                         |
| -------------------- | -------------------------------------------- |
| `/`                  | 홈                                           |
| `/about`             | 서비스 소개                                  |
| `/features`          | 주요 기능                                    |
| `/stories`           | 이야기 목록, `?category=bag` 등 분류 링크    |
| `/stories/:slug`     | 가구·가방·신발·의류·생활용품·가전 가이드 6개 |
| `/faq`               | FAQ 검색 및 분류                             |
| `/download`          | 앱 다운로드 안내                             |
| `/terms`, `/privacy` | 시안의 정책 초안                             |

`app/routes.ts`에서 경로를 정의하고 `react-router.config.ts`에서 14개 경로를 사전 렌더링합니다. 페이지 본문·메타 정보는 JS를 실행하지 않아도 생성된 HTML에 들어 있습니다. 경로별 코드 분할과 페이지 이동은 React Router가 담당합니다.

```text
app/
  components/       # 헤더, 푸터, 앱 목업, 공통 CTA, 토스트 등
  data/             # 페이지 메타 정보, FAQ, 이야기 데이터
  lib/seo.ts        # 페이지별 SEO/OG/canonical
  routes/           # React 페이지
  root.tsx          # 공통 문서 및 레이아웃
  styles.css        # 시안에서 옮긴 반응형 스타일
public/             # 이미지, 파비콘, 404.html, Cloudflare 헤더
scripts/            # robots/sitemap/기존 URL 리다이렉트 생성
tests/              # UI 동작 및 SSG 산출물 검사
```

이야기를 추가할 때는 `app/data/stories.ts`를 수정하면 상세 페이지와 사전 렌더링 목록, sitemap, 이전 형식 URL 리다이렉트에 함께 반영됩니다.

## Cloudflare Pages 배포

Cloudflare 대시보드에서 **Workers & Pages → Create application → Pages → Git 저장소 연결** 후 다음 값을 설정하세요.

| 설정                           | 값                                 |
| ------------------------------ | ---------------------------------- |
| Framework preset               | None                               |
| Root directory                 | 저장소 루트(비워 둠)               |
| Build command                  | `npm run build`                    |
| Build output directory         | `build/client`                     |
| Node 버전                      | `24` (`.node-version` 제공)        |
| 환경 변수(공식 도메인 확정 후) | `VITE_SITE_URL=https://공식도메인` |

React Router의 Cloudflare SSR/Workers 템플릿을 선택할 필요가 없습니다. 이 프로젝트는 Pages에 HTML/CSS/JS/이미지만 배포합니다. 런타임 Functions나 Worker는 사용하지 않습니다.

`wrangler.jsonc`의 `name`은 생성한 Pages 프로젝트 이름과 맞추세요. CLI로 배포하려면 계정에 로그인하고 프로젝트를 만든 후 실행합니다.

```bash
npx wrangler login
npx wrangler pages project create reform-web
npm run deploy
```

실제 계정 인증, 원격 Pages 프로젝트 생성, 도메인 연결은 로컬 구현에 포함되어 있지 않습니다. `npm run deploy`는 원격 배포를 수행합니다.

### 경로와 404

- 기존 `/about.html` 등 HTML 주소는 새 주소로 301 리다이렉트됩니다.
- 기존 `/story-wooden-chair.html` 및 확장자 없는 이전 이야기 주소도 `/stories/wooden-chair`로 연결됩니다.
- 최상위 `404.html`을 제공하여 존재하지 않는 URL은 HTTP 404로 응답합니다. 모든 경로를 `/index.html`로 보내는 SPA 리라이트는 사용하지 않습니다.
- 앱 안에서 잘못된 링크로 이동한 경우에도 안내와 홈 복귀 링크를 표시합니다.

### 공식 도메인과 SEO

로컬에서는 `.env.example`을 `.env`로 복사하고, Cloudflare에서는 빌드 환경 변수에 동일한 값을 설정합니다.

```dotenv
VITE_SITE_URL=https://reform.example.com
```

값에는 도메인 원점만 넣습니다(경로, 쿼리, 해시 제외). 설정하면 페이지별 canonical, 절대 OG URL, `sitemap.xml`, robots의 Sitemap 주소를 생성합니다. 도메인을 설정하지 않으면 임의의 운영 주소를 만들지 않고 canonical과 sitemap을 생략합니다. 환경 변수를 바꾼 후에는 다시 빌드해야 합니다.

## 시안에서 유지한 출시 준비 항목

모든 페이지의 다운로드 버튼(헤더·푸터·모바일 메뉴·본문 CTA·스토어 버튼)은 `app/components/DownloadButton.tsx`를 통해 “출시 예정입니다” 메시지를 표시합니다. QR 코드는 안내 자리 표시자입니다. 실제 링크 확정 시 공통 다운로드 버튼과 `app/components/StoreButtons.tsx`, 다운로드 페이지의 안내를 업데이트하세요. 정책 초안, 목업 이미지, 서비스 기능 설명과 예시 콘텐츠도 원본 내용을 유지했습니다.

공식 참고: [React Router 사전 렌더링](https://reactrouter.com/how-to/pre-rendering), [Cloudflare 정적 HTML 배포](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/), [Cloudflare 경로 및 404 동작](https://developers.cloudflare.com/pages/configuration/serving-pages/).
