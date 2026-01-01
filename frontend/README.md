# Puppit Frontend

React 기반 프론트엔드 애플리케이션입니다.

## 기술 스택

- React 18.2.0
- React Router 6.22.0
- Axios 1.6.7
- SockJS + STOMP (WebSocket)

## 개발 환경 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build

# 테스트
npm test
```

## Docker 실행

```bash
# 개발용
docker build -f Dockerfile.dev -t puppit-frontend:dev .
docker run -p 3000:3000 puppit-frontend:dev

# 프로덕션용 (Nginx)
docker build -f Dockerfile -t puppit-frontend:prod .
docker run -p 80:80 puppit-frontend:prod
```

## 환경 변수

`.env` 파일을 생성하여 환경 변수를 설정합니다:

```properties
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_WS_URL=ws://localhost:8080/api
```

## 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
│   └── layout/      # 레이아웃 컴포넌트
├── pages/           # 페이지 컴포넌트
│   ├── product/     # 상품 관련 페이지
│   ├── user/        # 사용자 관련 페이지
│   └── chat/        # 채팅 관련 페이지
├── utils/           # 유틸리티
│   └── api.js       # API 클라이언트
├── App.js           # 메인 앱 컴포넌트
└── index.js         # 엔트리 포인트
```

## 빌드 결과물

프로덕션 빌드 후 `build/` 디렉토리에 최적화된 정적 파일이 생성됩니다.

```bash
npm run build
```

생성된 파일들은 Nginx 또는 다른 정적 파일 서버로 서빙할 수 있습니다.

