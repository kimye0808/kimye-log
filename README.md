# kimye-log
kimye-log is a fullstack blog project crafted with TypeScript, Next.js, and React

---

<img src="./sample/pc.gif" width="1208" height="570"/>
<img src="./sample/tablet.gif" width="620" height="620"/>
<img src="./sample/mobile.gif" width="200" height="400"/>


---

## **Kimyelog 개발** 📝

Next.js를 활용하여 서버 사이드 렌더링(SSR) 기반의 개인 블로그를 개발했습니다.  
반응형 웹 디자인, 마크다운 글쓰기, 이미지 업로드 기능, 그리고 SEO를 구현했습니다.   
추후에 글 수정, 삭제, 댓글 기능을 추가할 예정입니다:  

- 🚀 **Next.js와 SSR**: 서버 사이드 렌더링 기반의 블로그 구현
- 📱 **반응형 디자인**: 다양한 디바이스에 최적화된 UI/UX
- ✍️ **마크다운 지원**: 편리한 글쓰기 환경 제공
- 🖼️ **이미지 업로드**: Firebase 활용 이미지 관리 기능 구현
- 🔍 **SEO 최적화**: 검색 엔진 친화적 구조 설계

**기술 스택**: Next.js, React, Firebase, MongoDB Atlas, CSS, HTML

### 🏆 주요 성과

- **이미지 업로드 기능 개선**: Firebase를 활용해 사용자 경험을 크게 향상
- **성능 최적화**: throttle 기법 적용으로 렌더링 지연 시간 90% 단축 (275ms → 25ms)

### 🧠 문제 해결 과정

- **1. 라우팅 방식 선택**
    - **도전**: 페이지 vs 앱 라우터
    - **해결**: 공식 문서 기반 앱 라우터 채택, 최신 기술 경험 확보
- **2. 상태 관리 최적화**
    - **도전**: Redux 복잡성 해소
    - **해결**: Redux Toolkit 도입으로 효율성 증대
- **3. 마크다운 에디터 구현**
    - **도전**: 마크다운 글쓰기 기능 구현
    - **해결**: `Codemirror` 기반의 `react-md-editor` 라이브러리 사용으로 학습 시간 절약
- **4. 데이터 저장 방식 선택**
    - **도전**: 로컬 파일 vs 데이터베이스 저장 방식
    - **해결**: MongoDB Atlas로 전환하여 관리 효율성 향상
- **5. 렌더링 성능 최적화 (throttle 적용)**
    - **도전**: `react-md-edtior` 의 오픈 소스 분석 결과, textarea에 많은 양을 담아 렌더링 지연 발생하는 것으로 판단
    - **해결**: `Codemirror` 와 `remark` 기반의 `react-markdown-editor` 및 `react-markdown-renderer` 라이브러리로 전환, `throttle`을 적용해 전역 상태 업데이트 횟수를 줄이고 렌더링 최적화
- **6. 렌더링 성능 최적화(react-virtualized 적용 시도)**
    - **도전**: 여전히 1000줄 이상의 글에서 서드 파티 컴포넌트 렌더링 딜레이 발생
    - **해결**:  dom element 분석 결과, 보이지 않는 부분임에도 렌더링 되는 것이 원인이라고 판단,  `react-virtualized`를 이용해 글을 블록 단위로 부분 렌더링하여 성능 개선하고자 함
- **7. react-virtualized 적용**
    - **도전**: `react-virtualized` 를 적용할려면 화면에 보이는 부분을 정확히 알아야 했는데 이는 반응형 웹과 서드 파티 라이브러리 특성상 알아내는 것이 불가
    - **해결**: 글 내용을 마크다운 문법으로 파싱해서 블록에 번호를 매겨 해당 번호를 기준으로 화면에 보이는 부분 판단, 성공적으로 적용하여 1000줄 이상의 렌더링 시간 크게 감소
- **8. 이미지 업로드 기능 구현**
    - **도전**: 마크다운 에디터에 이미지 첨부 및 미리보기 기능 추가
    - **해결**: Firebase Storage와의 연동으로 클라우드 이미지 저장 및 마크다운 문법 적용
