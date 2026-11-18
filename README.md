# Jehu Ahn — Personal Website

Jehu Ahn의 연구와 프로젝트를 소개하는 단일 페이지 웹사이트입니다.
HTML, CSS, JavaScript만 사용하며 빌드나 패키지 설치가 필요하지 않습니다.

- 사이트: https://whodeeboi.github.io/
- 배포 소스: `website` 브랜치의 `/docs`
- 직접 편집하는 방법: [EDITING.md](EDITING.md)

## 빠른 수정

| 바꾸려는 내용 | 파일 |
|---|---|
| 소개, 링크, 뉴스, 논문, 프로젝트, 경력 | `docs/index.html` |
| 색상, 전체 폭, 사진 크기, 섹션 간격 | `docs/styles/tokens.css` |
| 구성 요소의 글자 크기·테두리·정렬 | `docs/styles/components.css` |
| 사이드바·모바일 배치 | `docs/styles/layout.css` |
| 이미지 | `docs/assets/images/` |

이미지는 폴더에 넣은 뒤 `index.html`의 해당 항목에서 `<figure>`를 추가하거나 수정합니다. 자세한 예제와 파일별 역할은 편집 가이드에 있습니다.

## 로컬 미리보기

`docs/index.html`을 브라우저에서 열거나, 저장소 루트에서 다음 명령을 실행합니다.

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

브라우저에서 http://127.0.0.1:8000 을 엽니다. 종료는 터미널에서 `Ctrl+C`입니다.
VS Code Live Server를 사용하는 경우 `docs/index.html`에서 실행해도 됩니다.

## GitHub Pages

Settings → Pages → Deploy from a branch → `website` / `/docs`.
로컬 수정은 커밋 후 `website`에 푸시해야 배포됩니다. `docs/.nojekyll`을 유지하세요.

루트의 `LICENSE`에는 기존 저장소의 라이선스 고지가 보존되어 있습니다.
