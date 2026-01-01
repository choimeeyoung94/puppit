# Puppit Backend

Spring Boot 기반 백엔드 API 서버입니다.

## 기술 스택

- Java 11
- Spring Boot 2.7.18
- MyBatis 3.5.14
- MySQL 8.0
- Maven

## 개발 환경 실행

```bash
# 의존성 설치 및 빌드
mvn clean install

# 개발 모드 실행
mvn spring-boot:run

# 특정 프로파일로 실행
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Docker 실행

```bash
# 개발용 (Hot Reload)
docker build -f Dockerfile.dev -t puppit-backend:dev .
docker run -p 8080:8080 puppit-backend:dev

# 프로덕션용
docker build -f Dockerfile -t puppit-backend:prod .
docker run -p 8080:8080 -e SPRING_PROFILE=prod puppit-backend:prod
```

## 환경 변수

필요한 환경 변수:
- `DB_URL`: 데이터베이스 URL
- `DB_USERNAME`: 데이터베이스 사용자명
- `DB_PASSWORD`: 데이터베이스 비밀번호
- `AWS_S3_ACCESS_KEY`: AWS S3 액세스 키
- `AWS_S3_SECRET_KEY`: AWS S3 시크릿 키
- `AWS_S3_BUCKET_NAME`: S3 버킷 이름
- `KAKAO_CLIENT_ID`: 카카오 클라이언트 ID
- `IAMPORT_KEY`: 아임포트 API 키
- `IAMPORT_SECRET`: 아임포트 시크릿

## API 엔드포인트

- API Base URL: `http://localhost:8080/api`
- Health Check: `http://localhost:8080/api/actuator/health`
- WebSocket: `ws://localhost:8080/api/ws-chat`

## 빌드

```bash
# JAR 파일 생성
mvn clean package

# 테스트 스킵하고 빌드
mvn clean package -DskipTests
```

생성된 JAR 파일: `target/puppit-backend-1.0.0.jar`

