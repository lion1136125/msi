== GitHub Pages SEO 스타터 (도메인: www.msi-service.co.kr) ==

[필수 파일 업로드 위치]
- 이 폴더 안의 모든 파일을 GitHub 저장소 '루트'에 그대로 업로드하세요.
  (배포 소스가 main/(root) 또는 그에 해당하는 실제 배포 루트여야 합니다.)

[파일 설명]
- .nojekyll       : Jekyll 처리를 막아 sitemap.xml 등이 HTML로 변환되는 문제 예방
- robots.txt      : 검색 엔진 허용 및 사이트맵 경로 제공
- sitemap.xml     : 기본 사이트맵 (메인 URL 1개 포함) — 필요 시 URL 항목을 추가
- CNAME           : GitHub Pages 커스텀 도메인 설정 파일 (한 줄: www.msi-service.co.kr)

[Search Console 등록 순서]
1) Search Console에서 속성 추가 → URL 접두어: https://www.msi-service.co.kr/
2) HTML 파일 방식으로 googleXXXX.html 다운로드 → 저장소 루트에 업로드
   (주소: https://www.msi-service.co.kr/googleXXXX.html 로 열리면 OK)
   *또는* 도메인 속성 선택 후 카페24 DNS에 TXT 레코드로 google-site-verification=... 추가
3) Sitemaps 메뉴에서 sitemap.xml 제출
4) URL 검사에서 메인/핵심 페이지에 대해 '색인 생성 요청'

[사이트맵 확장 예시]
- 실제로 존재하는 페이지가 있다면 아래 형식으로 sitemap.xml에 추가하세요.
  <url><loc>https://www.msi-service.co.kr/contact</loc></url>
  <url><loc>https://www.msi-service.co.kr/service</loc></url>

[주의]
- 검증용 googleXXXX.html 파일은 삭제하지 마세요.
- 주소는 https + www 로 통일해서 사용하세요.