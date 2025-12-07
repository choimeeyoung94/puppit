# 🐶 Puppit - 반려동물 용품 중고거래 플랫폼

Puppit은 반려동물 용품을 사고팔 수 있는 중고거래 웹 애플리케이션입니다. 실시간 채팅, 포인트 결제, 리뷰 시스템 등 다양한 기능을 제공합니다.

## 📋 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시스템 아키텍처](#시스템-아키텍처)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [API 문서](#api-문서)
- [배포](#배포)

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
- 채팅방 삭제

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

### Backend
- **Java** 11
- **Spring Framework** 5.3.39
  - Spring MVC
  - Spring AOP
  - Spring JDBC
  - Spring WebSocket
- **MyBatis** 3.5.14
- **Lombok** 1.18.38

### Frontend
- **JSP** 2.3.3
- **JSTL** 1.2
- **JavaScript**
- **HTML5/CSS3**

### Database
- **MySQL** 8.0.33
- **HikariCP** 5.1.0 (Connection Pool)

### Infrastructure
- **Apache Tomcat** 9.0.109
- **Nginx** (Reverse Proxy)
- **AWS S3** (이미지 저장소)
- **Docker** (컨테이너화)

### External APIs
- **Kakao Login API** (소셜 로그인)
- **IamPort** (결제 시스템)

### Tools & Libraries
- **Maven** (빌드 도구)
- **SLF4J + Logback** (로깅)
- **Jackson** (JSON 처리)
- **Commons FileUpload** (파일 업로드)
- **Google Guava** (유틸리티)

## 🏗 시스템 아키텍처

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│    Nginx    │ (Reverse Proxy, Port 80)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Tomcat    │ (WAS, Port 8080)
│ Spring MVC  │
└──────┬──────┘
       │
       ├─→ ┌──────────┐
       │   │  MySQL   │ (Database)
       │   └──────────┘
       │
       └─→ ┌──────────┐
           │  AWS S3  │ (Image Storage)
           └──────────┘
```

## 🚀 시작하기

### 사전 요구사항
- Java 11 이상
- Maven 3.6 이상
- MySQL 8.0 이상
- Docker (선택사항)

### 로컬 환경 설정

1. **저장소 클론**
```bash
git clone https://github.com/choimeeyoung94/puppit.git
cd puppit
```

2. **데이터베이스 설정**
```bash
# MySQL 접속
mysql -u root -p

# 데이터베이스 생성
CREATE DATABASE db_puppit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 스키마 적용
USE db_puppit;
source src/main/resources/SCHEMA.sql;
```

3. **환경 변수 설정**

`src/main/resources/application-secret.properties` 파일 생성:
```properties
# Database Configuration
db.url=jdbc:mysql://localhost:3306/db_puppit?useSSL=false&serverTimezone=Asia/Seoul
db.username=your_db_username
db.password=your_db_password

# AWS S3 Configuration
aws.s3.accessKey=your_aws_access_key
aws.s3.secretKey=your_aws_secret_key
aws.s3.bucketName=your_bucket_name
aws.s3.region=ap-northeast-2

# Kakao Login API
kakao.client.id=your_kakao_client_id
kakao.redirect.uri=http://localhost:8080/puppit/user/kakao/callback

# IamPort Configuration
iamport.key=your_iamport_key
iamport.secret=your_iamport_secret
```

4. **빌드 및 실행**
```bash
# Maven 빌드
mvn clean package

# WAR 파일을 Tomcat에 배포
cp target/puppit-1.0.0.war $TOMCAT_HOME/webapps/puppit.war

# Tomcat 시작
$TOMCAT_HOME/bin/startup.sh
```

5. **애플리케이션 접속**
```
http://localhost:8080/puppit
```

### Docker를 사용한 실행

```bash
# Docker 이미지 빌드
docker build -t puppit:latest .

# 컨테이너 실행
docker run -d -p 80:80 -p 8080:8080 --name puppit-container puppit:latest

# 애플리케이션 접속
http://localhost/puppit
```

## 📁 프로젝트 구조

```
puppit/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── org/puppit/
│   │   │       ├── config/           # 설정 클래스
│   │   │       │   ├── AwsS3Config.java
│   │   │       │   ├── WebConfig.java
│   │   │       │   └── WebSocketConfig.java
│   │   │       ├── controller/       # 컨트롤러
│   │   │       │   ├── ProductController.java
│   │   │       │   ├── UserController.java
│   │   │       │   ├── ChatController.java
│   │   │       │   ├── OrderController.java
│   │   │       │   └── ...
│   │   │       ├── service/          # 서비스 레이어
│   │   │       │   ├── ProductService.java
│   │   │       │   ├── UserService.java
│   │   │       │   ├── ChatService.java
│   │   │       │   └── ...
│   │   │       ├── repository/       # DAO (MyBatis)
│   │   │       │   ├── ProductDAO.java
│   │   │       │   ├── UserDAO.java
│   │   │       │   └── ...
│   │   │       ├── model/dto/        # DTO 클래스
│   │   │       └── util/             # 유틸리티
│   │   ├── resources/
│   │   │   ├── mybatis/
│   │   │   │   ├── config/
│   │   │   │   │   └── mybatis-config.xml
│   │   │   │   └── mapper/           # MyBatis 매퍼
│   │   │   │       ├── productMapper.xml
│   │   │   │       ├── userMapper.xml
│   │   │   │       └── ...
│   │   │   ├── SCHEMA.sql            # DB 스키마
│   │   │   └── application-secret.properties
│   │   └── webapp/
│   │       ├── WEB-INF/
│   │       │   ├── views/            # JSP 파일
│   │       │   │   ├── product/
│   │       │   │   ├── user/
│   │       │   │   ├── chat/
│   │       │   │   └── ...
│   │       │   ├── spring/
│   │       │   │   ├── root-context.xml
│   │       │   │   └── appServlet/
│   │       │   │       └── servlet-context.xml
│   │       │   └── web.xml
│   │       └── resources/            # 정적 리소스
│   │           └── image/
│   └── test/
│       └── java/
├── Dockerfile                        # Docker 설정
├── pom.xml                          # Maven 설정
└── README.md
```

## 📡 API 문서

### 상품 API

#### 상품 목록 조회
- **GET** `/product/search`
- **Parameters**: `searchName` (검색 키워드)
- **Response**: JSON 배열

#### 상품 상세 조회
- **GET** `/product/detail/{productId}`
- **Response**: 상품 상세 정보 (JSP)

#### 상품 등록
- **POST** `/product/new`
- **Parameters**: 
  - `product` (상품 정보)
  - `imageFiles` (이미지 파일들)

#### 상품 수정
- **POST** `/product/update`
- **Parameters**: 
  - `product` (수정할 상품 정보)
  - `imageFiles` (새 이미지 파일들)
  - `deleteImageIds` (삭제할 이미지 ID들)

#### 상품 삭제
- **POST** `/product/delete`
- **Parameters**: `productId`

### 채팅 API

#### 채팅방 생성/조회
- **GET** `/chat/createRoom`
- **Parameters**: 
  - `productId`
  - `buyerId`
  - `sellerId`

#### 메시지 조회
- **GET** `/chat/message`
- **Parameters**: 
  - `roomId`
  - `loginUserId`
- **Response**: JSON (메시지 목록, 상품 정보)

#### 채팅방 삭제
- **POST** `/chat/removeroom`
- **Parameters**: `roomId`
- **Response**: JSON (성공/실패)

### 결제 API

#### 포인트 충전
- **POST** `/order/charge`
- **Parameters**: 결제 정보

#### 상품 구매
- **POST** `/order/buy`
- **Parameters**: 상품 정보, 결제 정보

## 🗄️ 데이터베이스 스키마

### 주요 테이블

- **user**: 사용자 정보
- **product**: 상품 정보
- **product_image**: 상품 이미지
- **room**: 채팅방
- **chat**: 채팅 메시지
- **alarm**: 알림
- **trade_payment**: 거래 결제 정보
- **point_charge**: 포인트 충전 내역
- **review**: 리뷰
- **wishlist**: 찜 목록
- **search_log**: 검색 기록

자세한 스키마는 `src/main/resources/SCHEMA.sql` 참고

## 🔐 보안

- 비밀번호: Salt + SHA-256 해싱
- 세션 기반 인증
- XSS 방지
- SQL Injection 방지 (MyBatis PreparedStatement)
- CSRF 토큰 (필요 시 추가 구현)

## 🧪 테스트

```bash
# 단위 테스트 실행
mvn test

# 통합 테스트 실행
mvn verify
```

## 📦 배포

### War 파일 생성
```bash
mvn clean package
```

생성된 WAR 파일: `target/puppit-1.0.0.war`

### Docker 이미지 빌드 및 배포
```bash
# 이미지 빌드
docker build -t puppit:1.0.0 .

# Docker Hub에 푸시 (선택사항)
docker tag puppit:1.0.0 username/puppit:1.0.0
docker push username/puppit:1.0.0

# 컨테이너 실행
docker run -d \
  -p 80:80 \
  -p 8080:8080 \
  --name puppit \
  puppit:1.0.0
```

### 프로덕션 환경 설정

1. **환경 변수 설정**: 실제 운영 환경의 DB, AWS S3 정보 설정
2. **SSL 인증서**: HTTPS 적용 권장
3. **방화벽 설정**: 필요한 포트만 개방
4. **로그 관리**: Logback 설정을 통한 로그 레벨 조정
5. **백업**: 정기적인 DB 백업 설정

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 개발팀

- GitHub: [@choimeeyoung94](https://github.com/choimeeyoung94)

## 📞 문의

프로젝트 관련 문의사항은 Issues 탭을 이용해주세요.

---

**Made with ❤️ for Pet Lovers**

