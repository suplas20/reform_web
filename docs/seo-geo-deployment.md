# SEO·GEO 운영 반영

공식 대표 주소: **https://www.dashiform.com**. 이 문서는 코드에서 처리한 설정과 Cloudflare 계정에서 적용해야 하는 설정을 구분합니다. 계정 설정은 아직 이 작업으로 변경하지 않았습니다.

## 1. 변경 소스 재배포

Cloudflare Pages 빌드 명령은 `npm run build`, 출력은 `build/client`, 운영 브랜치는 `main`을 사용합니다. 새 빌드는 canonical과 sitemap을 항상 생성하고 배포 전 검사를 수행합니다. `VITE_SITE_URL`을 기존에 설정했다면 `https://www.dashiform.com`과 맞추세요.

운영에서 확인할 결과:

- `/sitemap.xml`이 XML과 HTTP 200으로 응답하며 검색 허용 페이지 20개 포함
- 22개 모든 페이지에 자기 주소를 가리키는 www canonical
- `/guides`와 6개 분야 가이드, `/editorial-policy`에 직접 접근 가능
- `/terms`, `/privacy` 초안은 noindex,follow 및 sitemap 제외
- `main` 외 미리보기 배포는 noindex,follow 및 sitemap 미생성

## 2. www 대표 도메인으로 영구 리다이렉트

Cloudflare Pages `_redirects`는 도메인 조건 리다이렉트를 지원하지 않습니다. Cloudflare zone의 **Rules → Redirect Rules**에서 설정합니다. [Cloudflare Pages 리다이렉트 제약](https://developers.cloudflare.com/pages/configuration/redirects/), [대시보드 설정 안내](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/).

| 항목                  | 값                                                           |
| --------------------- | ------------------------------------------------------------ |
| 이름                  | dashiform canonical hostname                                 |
| 조건                  | Custom filter expression                                     |
| 조건식                | `http.host eq "dashiform.com"`                               |
| URL redirect          | Dynamic                                                      |
| 목적지 표현식         | `concat("https://www.dashiform.com", http.request.uri.path)` |
| HTTP 상태             | 301                                                          |
| Preserve query string | 활성화                                                       |

`dashiform.com` DNS는 Cloudflare 프록시를 사용해야 합니다. www에서 다시 루트 도메인으로 보내는 기존 규칙이 있다면 루프가 생기지 않도록 함께 확인합니다.

기대 결과:

```text
https://dashiform.com/guides?category=bag
  → 301 https://www.dashiform.com/guides?category=bag
```

경로와 쿼리를 유지합니다. Pages 기본 `.pages.dev` 주소도 운영과 중복 노출하지 않도록 Cloudflare의 custom-domain redirect 안내를 적용할 수 있습니다. 브랜치 미리보기는 이미 noindex로 빌드합니다.

## 3. 검색·답변 접근과 학습 크롤러 구분

소스 robots는 Googlebot/Bingbot, OAI-SearchBot/PerplexityBot/Claude-SearchBot과 사용자 요청 에이전트의 접근을 허용합니다. 기존 학습 차단 방향은 GPTBot/ClaudeBot/CCBot/Google-Extended에 대해 유지했습니다.

운영에서 확인했던 Cloudflare Managed robots에는 ChatGPT-User/Perplexity-User/Claude-User의 Disallow가 추가되어 있었습니다. Cloudflare는 원본 robots 앞에 관리 규칙을 합칠 수 있으며, 실제 차단은 별도의 엣지 정책으로도 적용됩니다. 따라서 저장소 robots만 보고 접근 가능하다고 단정하지 않습니다. [Cloudflare robots 관리](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/).

Cloudflare의 **Security → Settings → Bot traffic → Configure AI bot policies**에서:

- **Search: Allow**
- **Agent: Allow**
- **Training: Disallow** (현재 학습 차단 방향 유지)
- Bot Preference Sync를 사용하는 경우 위 정책에 맞게 동기화

AI Crawl Control, WAF 및 Bot Fight 관련 규칙에서도 원하는 검색/답변 크롤러에 challenge·block이 걸리지 않는지 보안 이벤트와 실제 크롤 로그로 확인하세요. 예외를 만들 때는 User-Agent만 믿고 우회시키지 말고, 서비스가 공개하는 검증된 IP 또는 Cloudflare의 verified bot 분류를 활용합니다.

GPTBot 학습 허용과 OAI-SearchBot 검색 허용은 별도입니다. ChatGPT-User와 Perplexity-User는 사용자 요청용이며 robots 적용 방식이 자동 검색 크롤러와 다를 수 있습니다. [OpenAI 크롤러 구분](https://developers.openai.com/api/docs/bots), [Perplexity 크롤러와 WAF 안내](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

Google 검색의 AI Overviews/AI Mode는 Googlebot 접근을 사용합니다. Google-Extended는 일부 다른 Google AI 시스템의 학습·grounding을 제어하므로, Gemini 등 그 범위까지 허용하려는 경우에는 정책을 별도로 검토하세요. [Google AI 검색 안내](https://developers.google.com/search/docs/appearance/ai-features).

## 4. 검색엔진 등록 및 배포 후 확인

Google Search Console, Bing Webmaster Tools, 네이버 Search Advisor에서 `https://www.dashiform.com` 소유권을 확인하고 다음 sitemap을 제출합니다.

```text
https://www.dashiform.com/sitemap.xml
```

DNS 인증을 쓰거나, 발급받은 공개 토큰을 `VITE_GOOGLE_SITE_VERIFICATION`, `VITE_BING_SITE_VERIFICATION`, `VITE_NAVER_SITE_VERIFICATION` 빌드 환경 변수로 설정하고 재배포하세요. 토큰 없이 등록 완료라고 간주하지 않습니다.

```bash
npm run audit:live
```

명령은 22개 문서의 HTTP 응답·canonical·robots·JSON-LD, sitemap, 이전 URL, 404, 대표 도메인 리다이렉트를 읽기 전용으로 확인합니다. Cloudflare 관리 규칙의 AI Disallow가 남아 있으면 주의 메시지를 표시합니다. 로컬 검증은 `npm run audit:live -- http://127.0.0.1:8788`로 실행할 수 있습니다.

이 검사가 통과해도 검색엔진 색인과 AI 인용을 보장하지 않습니다. Search Console URL 검사, 실제 AI 크롤러 로그, PageSpeed Insights 및 실제 방문자의 Core Web Vitals로 운영 결과를 추가 확인해야 합니다.

## 5. 콘텐츠 운영 기준

- 주제별 질문에 먼저 짧게 답하고, 상담 체크리스트와 세부 설명을 연결합니다.
- 실제 작성 주체를 표시합니다. 확인되지 않은 사람 이름, 전문 자격, 검수, 작업 사례, 평점, 가격을 생성하지 않습니다.
- 외부 자료는 실제 본문을 뒷받침할 때 이름과 URL을 표시합니다. 다른 제조사의 조건을 전체 제품에 일반화하지 않습니다.
- Article의 수정일과 sitemap lastmod는 본문 수정 이력과 일치시킵니다. 미확인 발행일을 임의로 넣지 않습니다.
- 정책 초안의 noindex는 내용이 확정되면 `draftPaths`와 SEO 정책에서 함께 해제합니다.
- FAQPage는 실제 노출된 질문·답변과 일치하지만, 일반 마케팅 사이트에 Google FAQ 리치 결과를 보장하는 기능은 아닙니다.
- llms.txt나 특수 AI 스키마는 Google AI 검색의 필수 조건이 아닙니다. 실제로 읽을 수 있는 유용한 본문, 내부 링크와 확인 가능한 근거를 우선합니다.

공식 기준: [Google AI 기능과 웹사이트](https://developers.google.com/search/docs/appearance/ai-features), [Article 구조화 데이터](https://developers.google.com/search/docs/appearance/structured-data/article), [FAQ 구조화 데이터](https://developers.google.com/search/docs/appearance/structured-data/faqpage).
