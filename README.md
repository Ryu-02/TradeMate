<div align="center">

# 📊 TradeMate

**간편한 매매 기록 관리 솔루션**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" />
</p>

[기능 소개](#-주요-기능) • [시작하기](#-시작하기) • [API 문서](#-api-엔드포인트)

</div>

---

## 📖 소개

TradeMate는 트레이더를 위한 **직관적인 매매 기록 관리 애플리케이션**입니다.
깔끔한 UI/UX와 강력한 백엔드를 통해 당신의 트레이딩 기록을 효율적으로 관리하세요.

### 💡 왜 TradeMate인가요?

- ✅ **간단한 기록 관리** - 클릭 몇 번으로 매매 내역 추가
- ✅ **빠른 데이터 조회** - PostgreSQL 기반의 고성능 데이터베이스
- ✅ **반응형 디자인** - 모바일부터 데스크톱까지 완벽 대응
- ✅ **타입 안정성** - TypeScript로 작성된 안전한 코드베이스

---

## 🛠 기술 스택

<table>
<tr>
<td valign="top" width="50%">

### 🎨 Frontend

- **Framework:** React 18 (Vite)
- **Language:** TypeScript
- **Styling:** Custom CSS
- **HTTP Client:** Fetch API

</td>
<td valign="top" width="50%">

### ⚙️ Backend

- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Language:** TypeScript

</td>
</tr>
</table>

---

## ✨ 주요 기능

| 기능                 | 설명                                       |
| -------------------- | ------------------------------------------ |
| 📝 **CRUD 작업**     | 매매 기록의 생성, 조회, 수정, 삭제         |
| 🎯 **모달 UI**       | 직관적인 모달 기반 입력 폼                 |
| ➕ **플로팅 버튼**   | 빠른 기록 추가를 위한 플로팅 액션 버튼     |
| 📱 **반응형 디자인** | 모든 디바이스에서 완벽한 사용자 경험       |
| 🔌 **API 분리**      | RESTful API를 통한 프론트·백엔드 완전 분리 |

---

## 🚀 시작하기

### 📋 사전 요구사항

```bash
Node.js >= 18.0.0
PostgreSQL >= 14.0
npm or yarn
```

### ⚡️ 빠른 시작

#### 1️⃣ 레포지토리 클론

```bash
git clone https://github.com/Ryu-02/trademate.git
cd trademate
```

#### 2️⃣ Backend 설정

```bash
cd backend
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 수정하여 DATABASE_URL 설정

# Prisma 마이그레이션
npx prisma migrate dev

# 개발 서버 실행
npm run start:dev
```

✅ Backend가 `http://localhost:3000`에서 실행됩니다.

#### 3️⃣ Frontend 설정

```bash
cd ../frontend
npm install

# 개발 서버 실행
npm run dev
```

✅ Frontend가 `http://localhost:5173`에서 실행됩니다.

---

## 🔧 환경 변수 설정

### Backend `.env`

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/trade_db?schema=public"

# Server
PORT=3000
NODE_ENV=development
```

### Frontend `.env` (선택사항)

```env
VITE_API_URL=http://localhost:3000
```

---

## 📡 API 엔드포인트

### Base URL: `http://localhost:3000`

| Method   | Endpoint      | Description         | Request Body                                                       |
| -------- | ------------- | ------------------- | ------------------------------------------------------------------ |
| `GET`    | `/trades`     | 모든 매매 기록 조회 | -                                                                  |
| `POST`   | `/trades`     | 새 매매 기록 생성   | `{ date, type, symbol, name?, quantity, price, fee?, memo? }`      |
| `GET`    | `/trades/:id` | 특정 기록 조회      | -                                                                  |
| `PATCH`  | `/trades/:id` | 기록 수정           | `{ date?, type?, symbol?, name?, quantity?, price?, fee?, memo? }` |
| `DELETE` | `/trades/:id` | 기록 삭제           | -                                                                  |

### 📝 Request 예시

```bash
# 매매 기록 생성
curl -X POST http://localhost:3000/trades \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-01-01",
    "type": "BUY",
    "symbol": "AAPL",
    "name": "애플",
    "quantity": 10,
    "price": 150.25,
    "fee": 0,
    "memo": "테스트 매매"
  }'
```

---

## 📂 프로젝트 구조

```
trademate/
├── 📂 backend/
│   ├── 📂 src/
│   │   ├── 📂 trades/          # Trade 모듈
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── 📂 prisma/
│   │   └── schema.prisma       # DB 스키마
│   ├── .env
│   └── package.json
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/      # React 컴포넌트
│   │   ├── 📂 services/        # API 서비스
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
│
└── 📄 README.md
```

---

## 🌈 스크린샷

<div align="center">

### 메인 화면

_매매 기록 목록을 한눈에 확인_

### 기록 추가 모달

_직관적인 입력 폼으로 빠른 기록 추가_

</div>

---

## 🤝 기여하기

기여는 언제나 환영합니다! 다음 단계를 따라주세요:

1. 이 저장소를 Fork 합니다
2. Feature 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 👨‍💻 개발자

<div align="center">

**유명규 (Yumyeong-gyu)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

</div>

---
