# 🐶 Puppit - 반려동물 용품 중고거래 플랫폼

Puppit은 반려동물 용품을 사고팔 수 있는 중고거래 웹 애플리케이션입니다. React + Spring Boot 기반으로 실시간 채팅, 포인트 결제, 리뷰 시스템 등 다양한 기능을 제공합니다.

## 📋 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
  - [사전 요구사항](#사전-요구사항)
  - [로컬 개발 환경 설정](#로컬-개발-환경-설정)
  - [Docker를 사용한 실행](#docker를-사용한-실행)
- [배포](#배포)
- [API 문서](#api-문서)

## 🎯 주요 기능

### 사용자 관리
- 회원가입 및 로그인 (일반 / 카카오 소셜 로그인)
- 프로필 이미지 관리 (AWS S3 연동)
- 비밀번호 찾기 및 재설정
- 회원 탈퇴 (소프트 삭제)

### 상품 관리
- 상품 등록/수정/삭제 (CRUD)
- 이미지 다중 업로드 (AWS S3)
- 카테고리별 분류 (사료, 간식, 장난감, 의류 등)
- 지역별 필터링
- 상품 상태 관리 (판매중, 예약중, 판매완료)
- 찜하기 기능

### 검색 기능
- 키워드 검색
- 실시간 자동완성
- 검색 기록 저장
- 카테고리별 검색

### 실시간 채팅
- WebSocket 기반 실시간 메시지
- 채팅방 생성 및 관리
- 읽음/안읽음 상태 표시
- 알림 기능

### 거래 및 결제
- 포인트 충전 (IamPort 연동)
- 포인트 기반 상품 구매
- 거래 내역 관리
- 거래 상태 추적

### 리뷰 시스템
- 거래 후 리뷰 작성
- 별점 평가 (1~5점)
- 판매자별 리뷰 조회

## 🛠 기술 스택

### Frontend
- **React** 18.2.0
- **React Router** 6.22.0
- **Axios** 1.6.7
- **SockJS + STOMP** (WebSocket)
- **CSS3** (모던 스타일링)

### Backend
- **Java** 11
- **Spring Boot** 2.7.18
  - Spring Web
  - Spring WebSocket
  - Spring AOP
  - Spring Validation
- **MyBatis** 3.5.14
- **Lombok** 1.18.38

### Database
- **MySQL** 8.0
- **HikariCP** (Connection Pool)

### Infrastructure
- **Docker** & **Docker Compose**
- **Nginx** (Reverse Proxy & Static File Server)
- **AWS S3** (이미지 저장소)

### External APIs
- **Kakao Login API** (소셜 로그인)
- **IamPort** (결제 시스템)

### Tools
- **Maven** (백엔드 빌드)
- **npm** (프론트엔드 패키지 관리)

## 📁 프로젝트 구조

```
puppit/
├── backend/                      # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/org/puppit/
│   │   │   │   ├── config/      # 설정 클래스
│   │   │   │   ├── controller/  # REST API 컨트롤러
│   │   │   │   ├── service/     # 비즈니스 로직
│   │   │   │   ├── repository/  # DAO (MyBatis)
│   │   │   │   ├── model/dto/   # DTO 클래스
│   │   │   │   └── util/        # 유틸리티
│   │   │   └── resources/
│   │   │       ├── mybatis/     # MyBatis 설정 및 매퍼
│   │   │       ├── application.yml
│   │   │       └── SCHEMA.sql   # 데이터베이스 스키마
│   │   └── test/
│   ├── Dockerfile               # 프로덕션용 Dockerfile
│   ├── Dockerfile.dev           # 개발용 Dockerfile
│   └── pom.xml
│
├── frontend/                    # React 프론트엔드
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── pages/               # 페이지 컴포넌트
│   │   ├── utils/               # 유틸리티 (API 클라이언트 등)
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile               # 프로덕션용 Dockerfile
│   ├── Dockerfile.dev           # 개발용 Dockerfile
│   ├── nginx.conf               # Nginx 설정
│   └── package.json
│
├── docker-compose.yml           # 로컬 개발용 Docker Compose
├── docker-compose.prod.yml      # 프로덕션용 Docker Compose
├── .env.example                 # 환경변수 예시
└── README.md
```

## 🚀 시작하기

### 사전 요구사항

#### Docker를 사용하는 경우
- Docker 20.10 이상
- Docker Compose 2.0 이상

#### 로컬에서 직접 실행하는 경우
- Java 11 이상
- Maven 3.6 이상
- Node.js 18 이상
- MySQL 8.0 이상

### 로컬 개발 환경 설정

#### 1. 저장소 클론

```bash
git clone https://github.com/choimeeyoung94/puppit.git
cd puppit
```

#### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 필요한 값을 설정합니다:

```bash
cp .env.example .env
```

`.env` 파일 예시:

```properties
# Database
MYSQL_ROOT_PASSWORD=rootpassword
DB_USERNAME=user
DB_PASSWORD=user

# AWS S3
AWS_S3_ACCESS_KEY=your_access_key
AWS_S3_SECRET_KEY=your_secret_key
AWS_S3_BUCKET_NAME=your_bucket_name
AWS_S3_REGION=ap-northeast-2

# Kakao Login
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_REDIRECT_URI=http://localhost:3000/oauth/kakao/callback

# IamPort
IAMPORT_KEY=your_iamport_key
IAMPORT_SECRET=your_iamport_secret

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:80
```

#### 3. 데이터베이스 설정 (Docker 없이 실행하는 경우)

```bash
# MySQL 접속
mysql -u root -p

# 데이터베이스 생성
CREATE DATABASE db_puppit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 스키마 적용
USE db_puppit;
source backend/src/main/resources/SCHEMA.sql;
```

#### 4. 백엔드 실행

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

백엔드 서버는 `http://localhost:8080`에서 실행됩니다.

#### 5. 프론트엔드 실행

```bash
cd frontend
npm install
npm start
```

프론트엔드 서버는 `http://localhost:3000`에서 실행됩니다.

### Docker를 사용한 실행

Docker Compose를 사용하면 MySQL, 백엔드, 프론트엔드를 한 번에 실행할 수 있습니다.

#### 로컬 개발 환경

```bash
# .env 파일 생성
cp .env.example .env

# 모든 서비스 시작
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 특정 서비스만 재시작
docker-compose restart backend

# 모든 서비스 종료
docker-compose down

# 볼륨까지 삭제 (데이터베이스 초기화)
docker-compose down -v
```

서비스 접속:
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:8080/api
- MySQL: localhost:3306

#### 개별 컨테이너 관리

```bash
# 백엔드만 재빌드 및 재시작
docker-compose up -d --build backend

# 프론트엔드만 재빌드 및 재시작
docker-compose up -d --build frontend

# 특정 서비스 로그 확인
docker-compose logs -f backend
docker-compose logs -f frontend

# 실행 중인 컨테이너 접속
docker exec -it puppit-backend-dev bash
docker exec -it puppit-frontend-dev sh
docker exec -it puppit-mysql-dev mysql -u user -p
```

## 🚢 배포

### 프로덕션 환경 배포

#### 1. 환경 변수 설정

프로덕션 환경의 `.env` 파일을 설정합니다:

```bash
MYSQL_ROOT_PASSWORD=secure_root_password
DB_USERNAME=puppit_user
DB_PASSWORD=secure_password

AWS_S3_ACCESS_KEY=production_access_key
AWS_S3_SECRET_KEY=production_secret_key
AWS_S3_BUCKET_NAME=puppit-production
AWS_S3_REGION=ap-northeast-2

KAKAO_CLIENT_ID=production_kakao_client_id
KAKAO_REDIRECT_URI=https://yourdomain.com/oauth/kakao/callback

IAMPORT_KEY=production_iamport_key
IAMPORT_SECRET=production_iamport_secret

CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

#### 2. Docker Compose로 배포

```bash
# 프로덕션 이미지 빌드 및 실행
docker-compose -f docker-compose.prod.yml up -d --build

# 로그 확인
docker-compose -f docker-compose.prod.yml logs -f

# 서비스 재시작
docker-compose -f docker-compose.prod.yml restart

# 서비스 중지
docker-compose -f docker-compose.prod.yml down
```

#### 3. 개별 이미지 빌드 및 배포

```bash
# 백엔드 이미지 빌드
cd backend
docker build -t puppit-backend:latest .

# 프론트엔드 이미지 빌드
cd frontend
docker build -t puppit-frontend:latest .

# Docker Hub에 푸시 (선택사항)
docker tag puppit-backend:latest username/puppit-backend:latest
docker tag puppit-frontend:latest username/puppit-frontend:latest
docker push username/puppit-backend:latest
docker push username/puppit-frontend:latest
```

### 프로덕션 배포 체크리스트

- [ ] 모든 환경 변수가 프로덕션 값으로 설정되었는지 확인
- [ ] 데이터베이스 백업 전략 수립
- [ ] SSL/TLS 인증서 설정 (HTTPS)
- [ ] 방화벽 설정 (필요한 포트만 개방)
- [ ] 로그 관리 및 모니터링 설정
- [ ] 성능 테스트 및 부하 테스트
- [ ] 보안 취약점 점검

## 📡 API 문서

### 주요 엔드포인트

#### 상품 API
- `GET /api/product/list` - 상품 목록 조회
- `GET /api/product/detail/{id}` - 상품 상세 조회
- `POST /api/product/new` - 상품 등록
- `POST /api/product/update` - 상품 수정
- `POST /api/product/delete` - 상품 삭제

#### 사용자 API
- `POST /api/user/login` - 로그인
- `POST /api/user/register` - 회원가입
- `POST /api/user/logout` - 로그아웃
- `GET /api/user/profile` - 프로필 조회
- `POST /api/user/update` - 프로필 수정

#### 채팅 API
- `GET /api/chat/list` - 채팅방 목록
- `GET /api/chat/message` - 메시지 조회
- `GET /api/chat/createRoom` - 채팅방 생성
- `POST /api/chat/removeroom` - 채팅방 삭제
- `WS /api/ws-chat` - WebSocket 연결

#### 검색 API
- `GET /api/search/top` - 인기 검색어

#### 결제 API
- `POST /api/payment/orders` - 주문 생성
- `POST /api/payment/verify` - 결제 검증
- `GET /api/payment/history` - 결제 내역

## 🔐 보안

- 비밀번호: Salt + SHA-256 해싱
- CORS 설정을 통한 출처 제한
- XSS 방지 헤더 설정
- SQL Injection 방지 (MyBatis PreparedStatement)
- 환경 변수를 통한 민감 정보 관리

## 🐛 트러블슈팅

### 일반적인 문제 해결

#### 포트 충돌
```bash
# 사용 중인 포트 확인
netstat -ano | findstr :8080
netstat -ano | findstr :3000
netstat -ano | findstr :3306

# Docker 포트 변경 (docker-compose.yml 수정)
ports:
  - "8081:8080"  # 호스트:컨테이너
```

#### 데이터베이스 연결 실패
```bash
# MySQL 컨테이너 로그 확인
docker-compose logs mysql

# 데이터베이스 재시작
docker-compose restart mysql

# 데이터베이스 초기화
docker-compose down -v
docker-compose up -d
```

#### 이미지 빌드 실패
```bash
# Docker 캐시 삭제 후 재빌드
docker-compose build --no-cache

# 사용하지 않는 이미지 정리
docker image prune -a
```

## 🧪 테스트

```bash
# 백엔드 테스트
cd backend
mvn test

# 프론트엔드 테스트
cd frontend
npm test
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 개발팀

- GitHub: [@choimeeyoung94](https://github.com/choimeeyoung94)

## 📞 문의

프로젝트 관련 문의사항은 Issues 탭을 이용해주세요.

---

**Made with ❤️ for Pet Lovers**

