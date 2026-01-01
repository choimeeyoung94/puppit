# 빠른 시작 가이드

## 🚀 5분 안에 시작하기

### 1단계: 저장소 클론

```bash
git clone https://github.com/choimeeyoung94/puppit.git
cd puppit
```

### 2단계: 환경 변수 설정

```bash
# .env 파일 생성
cp .env.example .env

# .env 파일 편집 (필수 값만 설정)
# 최소 설정으로도 로컬 테스트 가능
```

### 3단계: Docker로 실행

```bash
# 모든 서비스 시작 (MySQL + Backend + Frontend)
docker-compose up -d

# 로그 확인
docker-compose logs -f
```

### 4단계: 접속

- 🌐 프론트엔드: http://localhost:3000
- 🔧 백엔드 API: http://localhost:8080/api
- 💾 MySQL: localhost:3306 (user: user, password: user)

## ⚡ 빠른 명령어

```bash
# 서비스 시작
docker-compose up -d

# 서비스 중지
docker-compose down

# 로그 보기
docker-compose logs -f

# 특정 서비스만 재시작
docker-compose restart backend
docker-compose restart frontend

# 데이터베이스 초기화
docker-compose down -v
docker-compose up -d
```

## 🔧 개발 모드

### 백엔드만 실행

```bash
cd backend
mvn spring-boot:run
```

### 프론트엔드만 실행

```bash
cd frontend
npm install
npm start
```

## 🐛 문제 해결

### 포트가 이미 사용 중인 경우

```bash
# docker-compose.yml 파일에서 포트 변경
# 예: 8080 -> 8081
ports:
  - "8081:8080"
```

### 데이터베이스 연결 실패

```bash
# MySQL이 완전히 시작될 때까지 대기
docker-compose logs mysql

# 헬스체크 확인
docker-compose ps
```

### 빌드 캐시 문제

```bash
# 캐시 없이 재빌드
docker-compose build --no-cache
docker-compose up -d
```

## 📚 더 자세한 정보

- [전체 README](README.md)
- [마이그레이션 가이드](MIGRATION_GUIDE.md)
- [백엔드 문서](backend/README.md)
- [프론트엔드 문서](frontend/README.md)

## 💡 Tips

1. **첫 실행 시 시간이 걸립니다**: 이미지 다운로드 및 빌드에 시간이 소요됩니다.
2. **개발 중에는 hot reload 지원**: 코드 변경 시 자동으로 반영됩니다.
3. **환경 변수는 선택사항**: AWS S3, 카카오 로그인 등은 설정하지 않아도 기본 기능 테스트 가능합니다.

## ❓ 도움이 필요하신가요?

[Issues 탭](https://github.com/choimeeyoung94/puppit/issues)에서 질문하거나 문제를 보고해주세요!

