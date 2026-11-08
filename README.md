# Español básico v2 · 전공 기초 스페인어 — 수업용 인터랙티브 사이트

고등학교 「전공 기초 스페인어 (Español básico)」 교재 **알파벳·발음 + 12과 전체**를 국제학교 수업에서 쓰기 위한 인터랙티브 학습 사이트입니다.
모든 과가 「스페인어 회화 I」 9과와 같은 포맷(공통 엔진)으로 구성되어 있습니다.

- 사이트: https://yalli2.github.io/major_spanish_v2/
- 과별 주소: https://yalli2.github.io/major_spanish_v2/L00/ (알파벳·발음), /L01/ … /L12/

## 각 과 구성 (교재 순서)
Portada(핵심 학습 목표) → Diálogo · Lectura → Vocabulario · Contesta a las siguientes preguntas → Amplía tu vocabulario
→ Gramática(교재 표 재현 + 드릴) → 연습문제 1~n → Actividades 1~n → Cultura → ¡Compruébalo!(쓰기 모의시험 100점) → Resultados(성적표)

- 채점 표식: ○ 정답 / △ 악센트·¿¡ 부호만 틀림 / ✕ 오답 + 정답 예시. 자유작문은 체크리스트 + 초록 형광펜 + 빨간 펜 첨삭
- 교재 도표 재현: 문법 표, 요일·월 표 빈칸, 사진–표현 선 연결, 표 분류, 낱말 카드, V/F, 사진 묘사 등
- 성적표: 섹션별 막대, 영역별 레이더, 자주 하는 실수, 모의시험 기록 (인쇄/PDF 가능)
- 🔊 대화·본문: v1의 원어민 녹음(mp3, `audio/`) 우선 재생, 없으면 브라우저 음성 · 특수문자(á é í ó ú ñ ¿ ¡) 입력 버튼
- 기록은 학생 브라우저(localStorage, `msv2_*`)에만 저장됩니다. 학생 이름은 모든 과에서 공유돼요.

## 파일 구조
```
index.html             목차(허브) — 과별 진도 표시
common/engine.js       공통 엔진 (채점 · 컴포넌트 · 성적표 · 모의시험 · 특수문자 · mp3/음성)
common/style.css       공통 디자인
common/audio-map.js    문장 → mp3 파일 대응표
audio/*.mp3            원어민 녹음 (edge-tts, v1에서 가져옴)
L00 … L12/index.html   과별 페이지
L00 … L12/lesson.js    과별 학습 데이터와 활동 구성
```
