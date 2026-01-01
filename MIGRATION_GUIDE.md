# 프로젝트 마이그레이션 가이드

기존 Spring MVC + JSP 프로젝트를 React + Spring Boot로 마이그레이션한 가이드입니다.

## 주요 변경 사항

### 1. 프로젝트 구조

#### Before (기존)
```
puppit/
├── src/main/
│   ├── java/
│   ├── resources/
│   └── webapp/
│       ├── WEB-INF/
│       │   ├── views/          # JSP 파일
│       │   └── spring/         # XML 설정
│       └── resources/
├── pom.xml                     # WAR 패키징
└── Dockerfile
```

#### After (변경 후)
```
puppit/
├── backend/                    # Spring Boot API
│   ├── src/main/
│   │   ├── java/
│   │   └── resources/
│   │       └── application.yml # YAML 설정
│   ├── pom.xml                # JAR 패키징
│   └── Dockerfile
├── frontend/                   # React SPA
│   ├── src/
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

### 2. 백엔드 변경사항

#### 설정 방식
- **Before**: XML 기반 설정 (`web.xml`, `servlet-context.xml`, `root-context.xml`)
- **After**: Java Config + YAML (`@SpringBootApplication`, `application.yml`)

#### 패키징
- **Before**: WAR 파일로 Tomcat에 배포
- **After**: JAR 파일, 내장 Tomcat 사용

#### 의존성 관리
- **Before**: Spring Framework 5.3.39 개별 의존성
- **After**: Spring Boot 2.7.18 Starter 의존성

#### API 엔드포인트
- **Before**: `/product/list`, `/user/login` 등
- **After**: `/api/product/list`, `/api/user/login` 등 (context-path: `/api`)

### 3. 프론트엔드 변경사항

#### 뷰 렌더링
- **Before**: JSP 서버 사이드 렌더링
- **After**: React 클라이언트 사이드 렌더링 (SPA)

#### 라우팅
- **Before**: 서버 측 컨트롤러가 JSP 뷰 반환
- **After**: React Router로 클라이언트 측 라우팅

#### API 통신
- **Before**: Form submit, AJAX
- **After**: Axios를 사용한 REST API 호출

### 4. 배포 방식

#### Before
```bash
mvn clean package
# WAR 파일을 Tomcat에 배포
cp target/puppit-1.0.0.war $TOMCAT_HOME/webapps/
```

#### After

**로컬 개발:**
```bash
docker-compose up -d
```

**프로덕션 배포:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 마이그레이션 단계

### Phase 1: 백엔드 API 전환 ✅

1. Spring Boot 프로젝트 생성
2. 기존 Controller를 REST API로 전환
3. JSP 반환 대신 JSON 응답 반환
4. CORS 설정 추가
5. MyBatis 설정을 Spring Boot 방식으로 변경

### Phase 2: 프론트엔드 구축 ✅

1. React 프로젝트 생성
2. 기존 JSP 페이지를 React 컴포넌트로 전환
3. API 클라이언트 구현
4. 라우팅 설정
5. 상태 관리 구현

### Phase 3: Docker 환경 구성 ✅

1. 개발용 Dockerfile 작성
2. 프로덕션용 Dockerfile 작성 (멀티스테이지 빌드)
3. Docker Compose 설정 (로컬 개발)
4. Nginx 리버스 프록시 설정

### Phase 4: 완전 전환 (진행 중)

1. 모든 JSP 페이지를 React로 마이그레이션
2. 통합 테스트 수행
3. 성능 최적화
4. 프로덕션 배포

## 호환성 유지

마이그레이션 기간 동안 기존 시스템과의 호환성을 유지하기 위해:

1. 기존 코드는 `/src` 디렉토리에 보관
2. 새로운 코드는 `/backend`, `/frontend` 디렉토리에 작성
3. API 엔드포인트 경로는 `/api` prefix로 구분

## 주의사항

### 세션 관리
- **Before**: 서버 측 세션 (JSP)
- **After**: JWT 또는 세션 쿠키 기반 인증으로 전환 필요

### 파일 업로드
- 기존: `CommonsMultipartResolver`
- 변경: Spring Boot의 `StandardServletMultipartResolver` (자동 설정)

### WebSocket
- 엔드포인트 경로 변경: `/ws-chat` → `/api/ws-chat`
- CORS 설정 추가 필요

### 정적 리소스
- **Before**: `/src/main/webapp/resources/`
- **After**: React에서 관리 (`/frontend/public/`, `/frontend/src/`)

## 다음 단계

1. [ ] 남은 JSP 페이지를 React 컴포넌트로 전환
2. [ ] JWT 인증 시스템 구현
3. [ ] 통합 테스트 작성
4. [ ] CI/CD 파이프라인 구축
5. [ ] 모니터링 및 로깅 시스템 구축

## 롤백 계획

문제 발생 시 기존 시스템으로 롤백:

```bash
# 기존 Dockerfile 사용
docker build -t puppit:legacy -f Dockerfile.legacy .
docker run -p 80:80 puppit:legacy
```

기존 코드는 삭제하지 않고 보관 중입니다.

## 참고 자료

- [Spring Boot Migration Guide](https://spring.io/guides/gs/spring-boot/)
- [React Documentation](https://react.dev/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

