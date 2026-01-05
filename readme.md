## Projeto
Aplicacao FullStack dividida em dois diretorios:
- `backend` (Laravel + JWT)
- `frontend` (Next.js)

## Requisitos
- PHP 8.2+ e Composer
- Node.js 20+ e pnpm
- Docker (para o banco MySQL)

## Backend
```bash
cd backend
cp .env.example .env
composer install
cd ..\docker
docker compose up -d
cd ..\backend
php artisan key:generate
php artisan jwt:secret
php artisan migrate
php artisan db:seed
php artisan serve
```

API base URL: `http://localhost:8000/api`

## Frontend
```bash
cd frontend
pnpm install
```

Crie o arquivo `frontend/.env.local` com:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Execute:
```bash
pnpm dev
```

Frontend: `http://localhost:3000`

## Usuario de teste
- Email: `teste@opovo.com`
- Senha: `12345678`
