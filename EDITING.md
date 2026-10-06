# 웹사이트 직접 편집 가이드

이 사이트는 HTML에 내용을 쓰고, CSS로 디자인하고, JavaScript로 테마와 목차 동작을 보완합니다. 별도 데이터베이스, 프레임워크, npm, Hugo 빌드가 없습니다. HTML을 저장하고 브라우저를 새로고침하면 변경을 확인할 수 있습니다.

## 1. 파일 지도

```text
README.md                         시작 안내
EDITING.md                        이 편집 가이드
LICENSE                           기존 라이선스 고지
docs/
  .nojekyll                       GitHub Pages에서 정적 파일 그대로 제공
  index.html                      사이트에 표시되는 모든 내용
  assets/
    icons.svg                     브라우저 탭 아이콘
    images/
      profile.jpg                 프로필 사진
      publications/               논문 이미지 (처음에는 비어 있음)
      projects/                   프로젝트 이미지 (처음에는 비어 있음)
  styles/
    tokens.css                    자주 바꾸는 색상·크기·간격 변수
    base.css                      기본 서체·제목·링크·접근성·인쇄 스타일
    components.css                프로필·뉴스·작업 항목·타임라인의 디자인
    layout.css                    전체 배치와 화면 너비별 반응형 규칙
    enhancements.css              링크의 작은 호버 효과·동작 줄이기 설정
  scripts/
    theme-init.js                 첫 화면이 나오기 전에 저장된 테마 적용
    main.js                       테마 버튼·모바일 목차·현재 섹션 표시·이미지 오류 처리
```

CSS는 위 순서대로 불러옵니다. 같은 속성이 겹치면 선택자의 우선순위가 같을 때 뒤의 규칙이 적용됩니다. 새 스타일을 여러 파일에 중복으로 덧붙이기보다 해당 역할의 기존 규칙을 수정하세요.

## 2. 가장 자주 수정할 곳

`docs/index.html`에서 VS Code 검색(`Cmd+F`)으로 아래 문자열을 찾으세요.

| 검색할 문자열 | 수정할 내용 |
|---|---|
| `<title>` | 브라우저 탭 제목 |
| `name="description"` | 검색 엔진용 사이트 설명 |
| `id="section-nav"` | 목차와 번호 |
| `id="about"` | 이름·직책·소속·연락처·사진·관심사·소개 |
| `class="interests"` | 초록색 연구 관심사 3개 |
| `id="news"` | 소식 목록 |
| `id="saluschart"` | SalusChart 논문 |
| `id="flect"` 등 | 해당 프로젝트 |
| `id="experience"` | Research / Additional Experience |
| `id="education"` | 학력 |
| `id="honors"` | 수상 |
| `<footer>` | 마지막 업데이트 날짜·연락처 |

CV 링크는 **모바일 상단과 About에 총 2곳** 있습니다. CV 파일의 Drive ID가 바뀌면 두 곳의 `href`를 함께 수정하세요. Google Drive의 같은 파일을 업데이트해 URL이 유지되면 HTML을 바꿀 필요가 없습니다. 링크는 기존처럼 같은 탭에서 열립니다.

`id`는 각 항목의 고유 주소입니다. 예를 들어 `#flect`는 Flect로 직접 이동합니다. 제목을 바꾸더라도 기존 `id`는 가능하면 유지하세요. 동일한 `id`를 두 번 쓰면 안 됩니다.

## 3. 논문·프로젝트 이미지 넣기

### 이미지 파일을 넣을 폴더

- 논문: `docs/assets/images/publications/`
- 프로젝트: `docs/assets/images/projects/`
- 프로필: `docs/assets/images/profile.jpg`

이미지 파일명은 소문자 영문과 하이픈을 권장합니다. `.webp`, `.png`, `.jpg` 모두 가능합니다. 확장자를 이름만 바꾸면 이미지 형식이 변환되는 것은 아닙니다.

### SalusChart 예제

1. `docs/assets/images/publications/saluschart.webp`에 실제 이미지를 넣습니다.
2. `docs/index.html`에서 `id="saluschart"`를 검색합니다.
3. 바로 아래 `<!-- Optional image: ...`부터 `-->`까지의 주석을 다음 활성 HTML로 교체합니다. 설명 문장과 `<!--`, `-->`는 남기지 않습니다.

```html
<figure class="work-item__image">
  <img
    src="assets/images/publications/saluschart.webp"
    alt="SalusChart의 모바일 건강 데이터 차트 예시"
    width="800"
    height="600"
    loading="lazy"
    decoding="async">
</figure>
```

영어 사이트이므로 실제 `alt`는 이미지 내용을 설명하는 영어로 작성하세요. 위 설명은 이해를 위한 예시입니다. 파일이 PNG면 `src`도 `saluschart.png`로 수정합니다. `width`와 `height`는 원본 이미지의 실제 픽셀 크기로 맞추세요.

**경로 기준은 `index.html`이 있는 docs 폴더입니다.** 따라서 HTML에는 `docs/assets/...`나 `/Users/...`가 아니라 `assets/...`를 씁니다. 대소문자도 실제 파일과 정확히 맞춰야 합니다.

### 프로젝트 이미지

모든 프로젝트에 같은 주석 예제가 준비되어 있습니다.

| 항목 ID | 준비된 파일 경로 (docs 기준) |
|---|---|
| saluschart | `assets/images/publications/saluschart.webp` |
| flect | `assets/images/projects/flect.webp` |
| pictrace | `assets/images/projects/pictrace.webp` |
| moodyjam | `assets/images/projects/moodyjam.webp` |
| forgetaboutit | `assets/images/projects/forgetaboutit.webp` |
| context-aware-music | `assets/images/projects/context-aware-music.webp` |

이미지가 주석 안에 있으면 요청하지 않고 공간도 차지하지 않습니다. 활성화하면 데스크톱은 이미지 왼쪽/텍스트 오른쪽, 699px 이하에서는 이미지 위/텍스트 아래가 됩니다. CSS나 JavaScript를 추가로 수정할 필요가 없습니다. JavaScript가 실행되는 환경에서는 파일 경로가 잘못된 이미지 영역을 숨깁니다. 이미지가 안 보이면 먼저 파일명·확장자·주석 여부를 확인하세요.

기본 이미지 틀은 4:3이며 `object-fit: contain`으로 그림 전체를 보여줍니다. 논문 그림이 잘리지 않도록 한 설정입니다. 썸네일은 가로 800–1200px 정도면 충분하며, 가능하면 용량을 줄여 업로드하세요. 이미지가 아직 없으면 주석 상태를 유지하면 됩니다. `.gitkeep`은 Git에 빈 폴더를 보존하기 위한 빈 파일입니다.

## 4. 새 프로젝트 또는 논문 추가

기존 `<article class="work-item" ...>`부터 그에 대응하는 `</article>`까지 복사해 같은 섹션에 붙여넣으세요. 한 항목의 구성은 다음과 같습니다.

```html
<article class="work-item" id="new-project">
  <!-- 이미지가 있으면 여기에 figure를 넣습니다. -->
  <div class="work-item__body">
    <h3 class="work-item__title">Project Name: Descriptive Subtitle</h3>
    <p class="work-item__subtitle">Undergraduate Project</p>
    <p class="work-item__meta">Jan – Mar 2027</p>
    <p class="work-item__summary">What you built and what you contributed.</p>
    <div class="resource-links">
      <a href="https://example.com/project">Code <span class="link-arrow" aria-hidden="true">↗</span></a>
    </div>
  </div>
</article>
```

위 URL과 내용은 예시이므로 실제 자료로 교체합니다. `id`는 새 고유 이름으로 바꾸세요. 논문을 추가할 때는 기존 SalusChart 항목을 복사해 제목·학회·저자·연도·링크를 교체하세요. 본인 이름의 `<strong>Jehu Ahn</strong>`은 굵게 표시하기 위한 것입니다. Publications 제목 오른쪽의 연도(`section-note`)도 필요하면 함께 수정하거나 삭제하세요.

새 프로젝트마다 사이드바나 JavaScript를 수정할 필요는 없습니다. 항목의 표시 순서는 HTML 순서이며 자동 날짜 정렬은 하지 않습니다. 새 항목은 원하는 위치에 붙여넣으세요. 새 **상위 섹션**을 만들 때만 목차 링크, 섹션 ID, 제목 ID, `aria-labelledby`, 목차/제목 번호를 함께 맞추면 됩니다.

## 5. News 추가

`news-list` 안에 있는 `<li class="news-item">...</li>`를 복사해 위쪽에 추가합니다.

```html
<li class="news-item">
  <time datetime="2027-01">2027.01</time>
  <p>Your new update.</p>
</li>
```

화면에 보이는 날짜와 `datetime`을 같이 수정하세요. 링크가 필요하면 `<a href="실제 URL">링크 문구</a>`를 문장 안에 넣습니다. 한 달 표기는 `YYYY-MM`, 특정 날짜는 `YYYY-MM-DD`를 사용할 수 있습니다.

## 6. 경력 편집

`research-experience-heading` 아래에는 연구 경력 3개, `additional-experience-heading` 아래에는 다른 경력 4개가 있습니다. 각 그룹의 `<ol class="experience-timeline">` 안에서 `<li class="experience-item">...</li>`를 복사·편집합니다.

- `h4`: 기관/팀 이름과 선택적 링크
- `experience-role`: 직책과 기간
- `muted`: 연구/활동 내용, 지도교수 등 세부 정보

세로선과 점은 CSS가 자동으로 그립니다. 개수에 따라 선을 직접 수정할 필요가 없습니다. 현재 직책은 Research Intern으로 통일했습니다. About의 지도교수 문구는 제거하고 경력에는 남겼습니다.

## 7. 디자인을 변수로 조절하기

먼저 `docs/styles/tokens.css` 상단을 보세요.

| 변수 | 현재 값 | 바뀌는 것 |
|---|---|---|
| `--color-accent` | `#366348` | 초록색 링크·연구 관심사·타임라인 점 |
| `--color-tint` | `#edf3e9` | 프로필 배경·현재 목차·선택 버튼 배경 |
| `--space-section` | `52px` | 섹션 사이 간격; 1099px 이하에서는 44px |
| `--site-width` | `1168px` | 전체 사이트 최대 폭(외부 여백 포함) |
| `--sidebar-width` | `152px` | 데스크톱 목차 폭 |
| `--column-gap` | `52px` | 사이드바와 본문 사이 |
| `--content-width` | `860px` | 본문 최대 폭 |
| `--profile-size` | `240px` | 큰 화면 프로필 사진 크기 |
| `--profile-size-mobile` | `168px` | 699px 이하 사진 크기 |
| `--interest-size` | `19px` | 큰 화면 연구 키워드; 모바일은 layout.css에서 18px |
| `--work-image-width` | `200px` | 데스크톱 작업 썸네일 폭 |
| `--work-gap` | `26px` | 썸네일과 설명 사이 |
| `--radius` | `10px` | 사진·썸네일 모서리 |

전체 폭은 사이드바, 열 간격, 본문, 좌우 패딩(총 56px)을 수용해야 합니다. 본문 폭만 크게 올려도 전체 폭이 제한되면 더 넓어지지 않습니다.

색은 Light 기본값, 수동 Dark(`:root[data-theme="dark"]`), System Dark(`prefers-color-scheme: dark`)의 세 영역이 있습니다. Dark 팔레트를 바꾸면 수동/시스템 Dark 두 영역을 함께 수정하세요. 인쇄는 마지막 `@media print`에서 Light로 고정합니다.

글꼴은 `base.css`의 `body`에서, 프로젝트 제목 크기는 `components.css`의 `.work-item__title`에서 변경합니다. `layout.css`는 1100px 이상(사이드바), 700–1099px(상단 목차), 699px 이하(세로 프로필·작업 목록)를 구분합니다. 1099px 기준을 변경할 때는 `main.js`의 `matchMedia`도 같은 값으로 맞추세요.

## 8. JavaScript가 하는 일

콘텐츠는 HTML에 이미 들어 있어 JavaScript가 없어도 읽힙니다. 일반 콘텐츠 수정에는 JS를 건드리지 않습니다.

- `theme-init.js`: 저장된 Light/Dark를 CSS가 로드되기 전에 적용해 첫 화면의 색상 전환을 줄입니다.
- `main.js` 테마 부분: 해·달 버튼, `Use system`, 선택 상태와 `jehu-theme` 저장값을 관리합니다. System은 `data-theme` 속성을 없애 CSS가 OS 설정을 따르게 합니다.
- 메뉴 부분: 모바일에서 Sections를 열고 닫고, Escape나 메뉴 밖으로 포커스가 이동하면 닫습니다.
- 섹션 부분: 스크롤 위치에 따라 현재 목차를 표시합니다. 섹션 링크를 누르면 해당 제목으로 키보드 포커스도 이동합니다. 브라우저의 기본 해시 주소와 뒤로 가기를 유지합니다.
- 이미지 부분: 불러오지 못한 이미지를 숨겨 깨진 이미지 상자를 방지합니다.

Light/Dark 고정 상태에서는 `Use system`을 눌러 OS 설정으로 복귀할 수 있습니다. 기존 방문자의 테마 설정도 계속 사용합니다.

## 9. 수정 후 확인과 배포

1. HTML/CSS를 저장하고 미리보기를 새로고침합니다.
2. 넓은 화면과 좁은 화면에서 가로 스크롤·잘린 제목·사진을 확인합니다.
3. Light/Dark/System, 모바일 Sections, 목차 이동, CV/프로젝트 링크를 확인합니다.
4. 새 이미지의 파일명과 `src` 대소문자가 일치하는지 확인합니다.
5. VS Code에서 변경사항을 검토하고 커밋한 뒤 `website`에 푸시합니다.

저장소 루트에서 실행하는 명령 예시입니다. `git status`와 `git diff`로 원하는 변경만 있는지 먼저 확인하세요.

```sh
git status
git diff
git add docs README.md EDITING.md
git commit -m "Update website design and editing guide"
git push origin website
```

GitHub Pages는 `website`의 `/docs`를 배포하도록 유지합니다. 루트의 README와 이 편집 가이드는 사이트 콘텐츠로 포함되지 않습니다. URL 변경은 별도 작업입니다.
