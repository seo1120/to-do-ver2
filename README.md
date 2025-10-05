# ✨ 루미의 Todo 리스트 ver2

> React로 만든 예쁘고 기능이 풍부한 투두 앱 💕

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC)
![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF)

## 🎯 프로젝트 개요

루미의 Todo 리스트 ver2는 React와 Tailwind CSS를 사용하여 만든 현대적이고 사용자 친화적인 할 일 관리 애플리케이션입니다. 드래그 앤 드롭, 다크모드, 반응형 디자인 등 다양한 고급 기능을 포함하고 있습니다.

## ✨ 주요 기능

### 🎨 핵심 CRUD 기능
- ✅ **Create**: 새로운 할일 추가 (Enter 키 지원)
- 📖 **Read**: 할일 목록 표시
- 🔄 **Update**: 완료/미완료 상태 토글
- 🗑️ **Delete**: 할일 삭제

### 🎯 사용자 경험
- 📝 빈 상태일 때 안내 메시지
- ⚠️ 입력 유효성 검사 (빈 문자열 방지)
- 📊 할일 통계 표시 (전체/완료/진행중 개수)
- 📈 진행률 바 표시

### 🔍 필터링 및 검색
- 🔍 할일 검색 기능
- 📋 전체/진행중/완료 필터링
- 🎯 실시간 필터링 결과

### 🎨 고급 UX 기능
- 🖱️ **드래그 앤 드롭**: 할일 순서 변경
- 🌙 **다크/라이트 모드**: 테마 전환
- ✨ **애니메이션**: 부드러운 전환 효과
- 📱 **반응형 디자인**: 태블릿과 데스크톱 최적화

### 💾 데이터 관리
- 💾 **LocalStorage**: 자동 데이터 저장
- 🔄 **상태 유지**: 페이지 새로고침 시에도 데이터 보존
- 🗑️ **일괄 작업**: 모두 완료/삭제 기능
- 🔧 **데이터 초기화**: 저장된 데이터 삭제

## 🛠️ 기술 스택

- **Frontend**: React 19.2.0
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Drag & Drop**: @dnd-kit
- **Icons**: 이모지 및 커스텀 파비콘

## 📦 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone https://github.com/seo1120/to-do-ver2.git
cd to-do-ver2
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

## 🎨 디자인 특징

### 🎯 색상 테마
- **라이트 모드**: 연한 핑크 배경 (`bg-pink-50`)
- **다크 모드**: 진한 회색 배경 (`bg-gray-900`)
- **버튼**: 연한 핑크 (`bg-pink-300`) → 진한 핑크 (`hover:bg-pink-500`)

### 🎨 UI/UX
- **글래스모피즘**: 반투명 카드 디자인
- **부드러운 애니메이션**: 호버 효과와 전환
- **직관적인 아이콘**: 이모지와 시각적 피드백
- **반응형 레이아웃**: 모바일부터 데스크톱까지

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── TodoApp.jsx      # 메인 앱 컴포넌트
│   ├── TodoList.jsx     # 드래그 앤 드롭 리스트
│   └── TodoItem.jsx     # 개별 투두 아이템
├── main.jsx             # 엔트리 포인트
├── index.css            # 전역 스타일
└── App.css              # (삭제됨 - Tailwind 사용)

public/
├── pink-dot-star96.png  # 커스텀 파비콘
└── vite.svg             # (삭제됨)
```

## 🎯 주요 컴포넌트

### TodoApp.jsx
- 메인 애플리케이션 로직
- 상태 관리 (todos, filter, search, darkMode)
- LocalStorage 연동
- 통계 계산

### TodoList.jsx
- 드래그 앤 드롭 구현
- @dnd-kit 라이브러리 사용
- 필터링된 투두 목록 렌더링

### TodoItem.jsx
- 개별 투두 아이템 표시
- 완료/미완료 토글
- 삭제 기능
- 드래그 핸들

## 🚀 고급 기능 구현

### 드래그 앤 드롭
```javascript
// @dnd-kit을 사용한 드래그 앤 드롭
import { DndContext, SortableContext } from '@dnd-kit/sortable';
```

### 다크모드
```javascript
// LocalStorage에 다크모드 상태 저장
useEffect(() => {
  localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
  document.body.classList.toggle('dark', isDarkMode);
}, [isDarkMode]);
```

### 반응형 디자인
```css
/* Tailwind CSS 반응형 클래스 */
className="grid grid-cols-1 md:grid-cols-2 gap-4"
```

## 📱 반응형 디자인

- **모바일**: 1열 그리드, 세로 레이아웃
- **태블릿**: 2열 그리드, 혼합 레이아웃
- **데스크톱**: 최적화된 레이아웃, 큰 화면 활용

## 🎨 커스터마이징

### 색상 변경
```css
/* index.css에서 전체 배경색 변경 */
body {
  background-color: #fdf2f8; /* 연한 핑크 */
}

body.dark {
  background-color: #111827; /* 진한 회색 */
}
```

### 버튼 색상
```javascript
// TodoApp.jsx에서 버튼 색상 변경
className="bg-pink-300 hover:bg-pink-500"
```

## 🐛 알려진 이슈

- 드래그 앤 드롭 시 일부 브라우저에서 성능 최적화 필요
- 모바일에서 드래그 감도 조정 가능

## 🔮 향후 계획

- [ ] 카테고리별 할일 분류
- [ ] 마감일 설정 기능
- [ ] 할일 우선순위 설정
- [ ] 데이터 내보내기/가져오기
- [ ] PWA 지원

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👨‍💻 개발자

**루미** - Full-stack Developer
- GitHub: [@seo1120](https://github.com/seo1120)

---

💕 **루미의 Todo 리스트 ver2**로 할 일을 관리하고 꿈을 이뤄가세요! ✨
