# 이미지 교체 기록 — 2026-10-20

기존 카테고리 원본은 가로 88~99px, 메인 이미지는 459px여서 큰 화면에서 확대하면 화질이 떨어졌습니다. 내장 `image_gen` 도구의 기본 생성 모드로 사진 7종을 새로 생성했습니다. 실제 고객의 수리 전후 사진이 아닌 마케팅용 예시 이미지입니다.

## 저장 위치와 적용

| 용도                | 최종 파일                               |
| ------------------- | --------------------------------------- |
| 메인 및 브랜드 배경 | `public/images/hero-20261020.webp`      |
| 가구                | `public/images/furniture-20261020.webp` |
| 가방·가죽           | `public/images/bag-20261020.webp`       |
| 신발                | `public/images/shoes-20261020.webp`     |
| 의류                | `public/images/clothing-20261020.webp`  |
| 가전제품            | `public/images/appliance-20261020.webp` |
| 생활용품            | `public/images/living-20261020.webp`    |

원본은 모두 1536×1024px입니다. 같은 폴더의 `*-480.webp`, `*-960.webp`가 반응형 변형입니다. 생성된 PNG를 sharp로 WebP 품질 80으로 인코딩했고, 각 결과를 다시 디코딩해 확인했습니다. 새 파일 이름으로 브라우저/CDN의 기존 이미지 캐시와 구분합니다. 이전 주소의 이미지도 고해상도 파일로 교체해 이전 링크를 유지합니다.

`app/data/image-sizes.json`에 실제 크기와 `srcSet`을 기록합니다. 컴포넌트, CSS 배경, OG 이미지, 사전 로드 모두 새 경로를 참조합니다. 이미지 요청이 실패하면 `public/images/image-fallback.svg`를 표시합니다. 이 대체 이미지는 간단한 코드 기반 SVG이며 사진을 대신하는 기본 콘텐츠로 사용하지 않습니다.

## 최종 프롬프트 세트

메인 이미지:

> Use case: photorealistic-natural. Asset type: high-resolution hero photograph for the re:form Korean repair-and-reuse marketing website. Create one original photograph, wide landscape composition, at least 1536 pixels wide. A sunlit warm Korean apartment living/dining corner with an impeccably restored oak chair with woven cane backrest, a small round wooden table and ceramic cup, linen sofa and a restrained green plant. Warm cream, oak and beige palette with natural forest-green accents. Crisp natural wood grain, woven cane, linen details. Soft morning sunlight, realistic editorial interior photography, inviting and quiet. Full-bleed single scene, no panels. Keep the important chair and table in the center so it crops well to a portrait hero. Do not include a smartphone, any UI, typography, text, watermark, logo or captions. This is a replacement for pixelated mockup photography, so prioritize real photographic detail and sharp high-resolution output.

카테고리 사진 6종은 각각 별도로 생성했으며 다음 공통 프롬프트에 아래 Subject를 적용했습니다:

> Use case: photorealistic-natural. Asset type: high-resolution repair-and-reuse website category and article photograph for re:form. Create one original single-scene photo, landscape 3:2, at least 1536 pixels wide, with subject centered fully inside frame so square and wide cropping both work. Subject: [아래 개별 대상]. Consistent style: photorealistic editorial lifestyle/product photography, warm cream, beige, natural oak and subtle forest green, soft morning window light, restrained uncluttered composition, realistic material texture and crisp detail. No collage, no panels, no added typography, no logo, no watermarks, no app screens. Replace tiny pixelated thumbnails, sharp high resolution essential.

- Furniture: restored solid oak dining chair with woven cane seat and back on a calm wooden workshop floor next to a small workbench, entire chair framed.
- Bag: cognac leather tote on a pale oak workbench with a folded cotton care cloth, seams and handles sharp, no labels.
- Shoes: pair of cream and white canvas sneakers on a light wood care table with a wooden brush and cloth, no brand lettering.
- Clothing: folded indigo denim jeans, spool of beige thread, scissors, measuring tape and small fabric on an oak sewing table, no readable labels or people.
- Appliance: unbranded compact stainless electric kettle on a pale oak maintenance bench with screwdriver set and cloth, fully assembled and unplugged, no exposed wires.
- Living: restored small wood side table with cream fabric-shade lamp, closed neutral book and ceramic vase in a sunlit apartment with a green plant.

## 검증

`npm run check`에서 이미지 오류 시 복구, 전체 SSG 페이지의 이미지 경로 및 반응형 경로, WebP 파일 길이와 실제 프레임 해상도, 내비게이션 메뉴 삭제를 검사합니다. Cloudflare Pages에 배포한 뒤 새 이미지 주소가 `200 image/webp`로 응답하는지 확인합니다.
