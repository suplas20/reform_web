# re:form 마케팅 웹사이트

운영 주소는 **https://www.dashiform.com**입니다. React + Vite + React Router SSG로 앱 소개와 수리·리폼 가이드를 제공하고 Cloudflare Pages에서 정적 파일로 서비스합니다.

## 실행과 검증

Node.js 24를 사용하고 저장소 루트에서 실행하세요.

```bash
npm ci
npm run dev
npm run check
npm run preview
```

- `dev`: 개발 서버(기본 `http://127.0.0.1:5173`)
- `check`: 타입 검사, 사용자 동작 테스트, SSG 빌드 및 SEO 산출물 검사
- `build`: 22개 경로의 HTML 생성 및 필수 SEO 검사. 검사 실패 시 배포용 빌드 실패
- `preview`: 빌드 결과를 Cloudflare Pages 로컬 환경에서 확인
- `audit:live`: 재배포된 운영 사이트의 HTTP·HTML·sitemap·robots·도메인 통합 검사

```bash
npm run audit:live
# 로컬 Cloudflare 미리보기 검사
npm run audit:live -- http://127.0.0.1:8788
```

운영 검사 명령은 공개 URL만 읽습니다. 실제 Google 색인 여부, AI 답변 인용, 검증된 크롤러 IP의 접근 성공을 판정하는 도구는 아닙니다.

## SEO·GEO 구조

| 구성          | 구현                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------- |
| 대표 주소     | `site.config.ts`의 `https://www.dashiform.com` 사용. 환경 변수 누락 시에도 유지                     |
| 페이지 생성   | 22개 경로 모두 SSG. JS 없이 제목·설명·본문·내부 링크·구조화 데이터 확인 가능                        |
| URL 정규화    | 페이지별 canonical, 쿼리·필터·추적 값 제외, 확장자 없는 주소, 기존 HTML 주소 301                    |
| sitemap       | 검색 허용 페이지 20개. 정책 초안과 404·미리보기 제외                                                |
| 구조화 데이터 | Organization, WebSite, WebPage/AboutPage/CollectionPage, BreadcrumbList, Article, ItemList, FAQPage |
| 주제별 진입   | `/guides`와 가구·가방·신발·의류·가전·생활용품 독립 가이드 6개                                       |
| 콘텐츠 이해   | 핵심 질문과 답변, 상담 체크리스트, 글 목차, 관련 글·분야 가이드 연결                                |
| 편집 정보     | 편집 주체와 원칙 공개. 실제 내용 수정일 사용. 확인되지 않은 개인 작성자·검수·발행일·평점 미생성     |
| 공유 메타     | 절대 OG/Twitter URL, 이미지 크기와 설명                                                             |
| 이미지        | 실제 파일 크기에 맞는 width/height, 비핵심 이미지 lazy, 홈 주요 이미지 preload                      |
| 배포 구분     | Cloudflare `main` 외 브랜치 자동 `noindex,follow`. 공식 주소로 canonical 유지                       |
| 빌드 검사     | canonical·robots·JSON-LD 연결·본문 일치·sitemap·이미지·링크 및 홈에서 전체 페이지 발견 가능 여부    |

검색 순위나 AI 인용을 구조화 데이터만으로 보장하지 않습니다. 일반 마케팅 사이트의 FAQPage 마크업은 Google FAQ 리치 결과 노출 보장을 의미하지 않습니다. GEO용 특수 파일보다 크롤링 가능한 본문, 명확한 답변, 출처와 실제 콘텐츠 품질에 우선순위를 둡니다.

## 페이지와 소스

| 주소                         | 내용                                         |
| ---------------------------- | -------------------------------------------- |
| `/`                          | 서비스와 분야별 가이드 소개                  |
| `/about`, `/features`        | 서비스 가치와 앱의 주요 기능                 |
| `/guides`                    | 수리·리폼 가이드 허브                        |
| `/guides/:category`          | 분야별 질문·답변과 상담 준비, 관련 이야기    |
| `/stories`, `/stories/:slug` | 이야기 목록과 상세 가이드 6개                |
| `/faq`                       | 서비스 FAQ 검색·분류·답변                    |
| `/download`                  | 앱 출시 안내                                 |
| `/editorial-policy`          | 콘텐츠 작성 주체·범위·편집 원칙              |
| `/terms`, `/privacy`         | 검토용 정책 초안. HTML에 noindex,follow 적용 |

```text
site.config.ts          # 공식 주소·브랜드·운영 브랜치 및 설정 검증
app/lib/paths.ts        # SSG·sitemap·검증 공통 경로 목록
app/lib/seo.ts          # canonical·OG·robots·페이지별 JSON-LD
app/data/guides.ts      # 분야별 검색 진입 콘텐츠
app/data/stories.ts     # 이야기 본문
app/data/story-details.ts # 핵심 답변·체크리스트·수정일·참고 자료
app/data/image-sizes.json # 원본 이미지 실제 치수
app/routes/            # React 페이지
scripts/finalize-build.mjs # Cloudflare용 파일 배치·robots·sitemap·리다이렉트
scripts/audit-live.mjs  # 재배포 후 공개 응답 점검
```

이야기를 추가하면 `stories.ts`와 `story-details.ts`를 함께 작성하세요. 작성자·발행일·평점·수리 결과를 추정해서 채우지 마세요. `updatedAt`은 본문을 실제 수정할 때만 변경합니다. `lastmod`는 해당 콘텐츠의 수정일을 사용하며 빌드 시각으로 갱신하지 않습니다. 이미지를 교체할 때는 `image-sizes.json`에 실제 치수를 반영해야 합니다.

## Cloudflare Pages 배포

| 설정              | 값                             |
| ----------------- | ------------------------------ |
| Framework preset  | None                           |
| Root directory    | 저장소 루트                    |
| Build command     | `npm run build`                |
| Output directory  | `build/client`                 |
| Node              | 24 (`.node-version` 제공)      |
| Production branch | main (`site.config.ts`와 일치) |

`VITE_SITE_URL`은 생략할 수 있습니다. 설정한다면 `https://www.dashiform.com`과 일치해야 하며, 잘못된 값은 빌드 오류가 됩니다. 도메인을 이전할 때는 `site.config.ts`와 Cloudflare 도메인·리다이렉트 설정을 함께 변경하세요.

검토용 빌드는 `VITE_INDEXING=disabled`로 설정할 수 있습니다. Cloudflare 미리보기 브랜치는 이 값이 enabled여도 자동으로 검색 제외됩니다. 로컬 `.env` 예시는 `.env.example`에 있습니다. Search Console/Bing/Naver의 공개 소유권 확인 메타 토큰도 선택적으로 설정할 수 있습니다. DNS 인증을 사용한다면 토큰은 필요하지 않습니다.

계정 인증과 Pages 프로젝트가 준비된 환경에서는:

```bash
npm run deploy
```

**운영에 반영할 Cloudflare 도메인 리다이렉트와 AI 접근 정책은 [배포 안내](docs/seo-geo-deployment.md)를 함께 적용하세요.** 저장소 파일만으로 계정의 봇 차단 설정이나 호스트 리다이렉트를 변경할 수는 없습니다.

## 출시 및 콘텐츠 상태

모든 앱 다운로드 버튼은 “출시 예정입니다” 메시지를 표시합니다. `/download` 안내 페이지는 별도의 “앱 출시 안내” 링크로 발견할 수 있습니다. 앱스토어 주소·QR 코드·정책 문서·제품 이미지는 실제 출시 정보에 맞춰 갱신해야 합니다.

현재 이야기와 가이드는 일반적인 상담 준비 정보입니다. 실제 업체 사례나 전문 검수 자료가 준비되면 근거·확인 날짜와 함께 콘텐츠를 강화하세요. 기존 목업 이미지에는 작은 원본이 포함되어 있으므로 운영용 사진을 확보하면 고해상도 WebP와 실제 치수로 교체하세요.
