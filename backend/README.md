# Backend (API) — Blog Colaborativo (Laravel + JWT)

API REST para um blog colaborativo com autenticação JWT. Permite registro/login de usuários e operações CRUD em posts. **Autorização por ownership**: apenas o autor de um post pode editá-lo ou excluí-lo.

## Stack e Requisitos

-   PHP 8.2+
-   Composer
-   MySQL 8.0 (via Docker, recomendado) ou SQLite (padrão do `.env.example`)
-   Laravel 12 + tymon/jwt-auth 2.2

## Setup Rápido (com Docker)

```bash
cd backend

# 1. Subir banco de dados (MySQL)
docker compose -f docker/compose.yaml up -d

# 2. Instalar dependências
composer install

# 3. Configurar ambiente
cp .env.example .env
# Editar .env e ajustar:
#   DB_CONNECTION=mysql
#   DB_HOST=127.0.0.1
#   DB_PORT=3306
#   DB_DATABASE=opovo_blog
#   DB_USERNAME=app
#   DB_PASSWORD=app

# 4. Gerar chaves
php artisan key:generate
php artisan jwt:secret

# 5. Rodar migrations e seeders
php artisan migrate
php artisan db:seed

# 6. Iniciar servidor
php artisan serve
# API disponível em: http://localhost:8000
```

## Setup sem Docker

Se não usar Docker, você pode usar SQLite (configuração padrão do `.env.example`).

```bash
cd backend
composer install
cp .env.example .env

# O .env.example já vem configurado com DB_CONNECTION=sqlite
# Criar arquivo de banco:
touch database/database.sqlite

php artisan key:generate
php artisan jwt:secret
php artisan migrate
php artisan db:seed
php artisan serve
```

## Variáveis de Ambiente Importantes

As seguintes variáveis devem estar configuradas no `.env`:

-   `APP_KEY`: Gerado via `php artisan key:generate`
-   `JWT_SECRET`: Gerado via `php artisan jwt:secret` (obrigatório para autenticação)
-   `DB_CONNECTION`: `sqlite` (padrão) ou `mysql`
-   `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` (se usar MySQL)

## Usuário de Teste

O seeder `DevSeeder` (executado via `php artisan db:seed`) cria automaticamente um usuário de teste:

-   **Email**: `teste@opovo.com`
-   **Senha**: `12345678`

Utilize essas credenciais para testar login e obter um token JWT.

## Endpoints

**Base URL (local):** `http://localhost:8000/api`

### Autenticação

#### POST `/auth/register`

Registro de novo usuário.

**Body (JSON):**

```json
{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
}
```

**Validações:**

-   `name`: obrigatório, string, máx. 100 caracteres
-   `email`: obrigatório, e-mail válido, único, máx. 150 caracteres
-   `password`: obrigatório, string, mín. 8, máx. 72 caracteres

**Resposta (201):**

```json
{
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com"
}
```

**Rate Limiting:** máximo 3 requisições por minuto por IP.

---

#### POST `/auth/login`

Login e obtenção de token JWT.

**Body (JSON):**

```json
{
    "email": "teste@opovo.com",
    "password": "12345678"
}
```

**Resposta (200):**

```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "bearer"
}
```

**Resposta (401 — credenciais inválidas):**

```json
{
    "message": "Credenciais inválidas."
}
```

**Rate Limiting:** máximo 5 requisições por minuto por IP.

---

### Posts (Públicos)

#### GET `/posts`

Lista todos os posts (ordenados por criação, descendente).

**Resposta (200):**

```json
[
    {
        "id": 1,
        "title": "Primeiro post",
        "author": "Usuário Teste",
        "created_at": "2026-01-02T18:30:00.000000Z"
    }
]
```

---

#### GET `/posts/{id}`

Obtém um post específico (com conteúdo completo).

**Resposta (200):**

```json
{
    "id": 1,
    "title": "Primeiro post",
    "content": "Conteúdo completo do primeiro post.",
    "author": "Usuário Teste",
    "created_at": "2026-01-02T18:30:00.000000Z",
    "updated_at": "2026-01-02T18:30:00.000000Z"
}
```

**Resposta (404):** Post não encontrado.

---

### Posts (Autenticados)

**Autenticação JWT obrigatória:** adicione o header em todas as requisições abaixo:

```
Authorization: Bearer {token}
```

#### POST `/posts`

Cria um novo post (autor = usuário logado).

**Body (JSON):**

```json
{
    "title": "Meu novo post",
    "content": "Conteúdo detalhado aqui..."
}
```

**Validações:**

-   `title`: obrigatório, string, máx. 180 caracteres
-   `content`: obrigatório, string (texto longo)

**Resposta (201):**

```json
{
    "id": 3,
    "title": "Meu novo post",
    "content": "Conteúdo detalhado aqui...",
    "author": "João Silva",
    "created_at": "2026-01-03T19:00:00.000000Z",
    "updated_at": "2026-01-03T19:00:00.000000Z"
}
```

---

#### PUT `/posts/{id}`

Atualiza um post existente. **Somente o autor pode editar** (`PostPolicy::update`).

**Body (JSON — campos opcionais):**

```json
{
    "title": "Título atualizado",
    "content": "Novo conteúdo do post."
}
```

**Validações:**

-   `title`: opcional, se enviado: obrigatório, string, máx. 180 caracteres
-   `content`: opcional, se enviado: obrigatório, string

**Resposta (200):**

```json
{
    "id": 3,
    "title": "Título atualizado",
    "content": "Novo conteúdo do post.",
    "author": "João Silva",
    "created_at": "2026-01-03T19:00:00.000000Z",
    "updated_at": "2026-01-03T19:05:00.000000Z"
}
```

**Resposta (403 — não autorizado):**

```json
{
    "message": "Você não tem permissão para editar este post."
}
```

---

#### DELETE `/posts/{id}`

Exclui um post existente. **Somente o autor pode excluir** (`PostPolicy::delete`).

**Resposta (204):** Post excluído com sucesso (sem corpo).

**Resposta (403 — não autorizado):**

```json
{
    "message": "Você não tem permissão para excluir este post."
}
```

**Resposta (404):** Post não encontrado.

---

## Autenticação JWT

Após o login, você receberá um token JWT no campo `token` da resposta. Utilize esse token em todas as requisições protegidas adicionando o header:

```
Authorization: Bearer {seu_token_aqui}
```

O guard configurado é `api` (com driver `jwt`), conforme `config/auth.php` (linha 43-46).

## Status HTTP Esperados

| Status | Significado                                           |
| ------ | ----------------------------------------------------- |
| 200    | OK — requisição bem-sucedida (GET/PUT)                |
| 201    | Created — recurso criado (POST register/post)         |
| 204    | No Content — recurso excluído (DELETE)                |
| 401    | Unauthorized — credenciais inválidas ou token ausente |
| 403    | Forbidden — token válido, mas sem permissão (policy)  |
| 404    | Not Found — recurso não encontrado                    |
| 422    | Unprocessable Entity — falha de validação             |
| 429    | Too Many Requests — rate limit excedido               |

## Rate Limiting (Throttle)

Os seguintes limites são aplicados por IP (conforme `AppServiceProvider::boot`):

-   `POST /api/auth/login`: 5 requisições/minuto
-   `POST /api/auth/register`: 3 requisições/minuto

**Observação:** existe também um rate limiter `posts-write` (30 req/min por usuário ou IP) definido no código, mas ele não está aplicado atualmente nas rotas.

## Qualidade de Código (PSR-12)

O projeto utiliza **Laravel Pint** com preset PSR-12 (configurado em `pint.json`).

Para verificar/corrigir código:

```bash
# Corrigir automaticamente
./vendor/bin/pint

# Apenas verificar (dry-run)
./vendor/bin/pint --test
```

## Troubleshooting

### Erro: "The JWT secret is not set"

Execute:

```bash
php artisan jwt:secret
```

Isso irá gerar e adicionar `JWT_SECRET` ao seu `.env`.

### Erro: "Connection refused" ou problemas de DB

Limpe o cache de configuração:

```bash
php artisan config:clear
php artisan cache:clear
```

Se usar Docker, certifique-se de que o container MySQL está rodando:

```bash
docker compose -f docker/compose.yaml ps
```

### Erros de permissão (403) inesperados

Verifique se o token JWT está sendo enviado corretamente no header `Authorization: Bearer {token}`.

Para endpoints `PUT /posts/{id}` e `DELETE /posts/{id}`, confirme que você está autenticado como o autor do post. A regra de autorização está em `app/Policies/PostPolicy.php` e compara `post.author_id` com `user.id`.

---

**Nota:** Este README documenta apenas o **backend** (API Laravel). A aplicação frontend (React) possui documentação própria em `/frontend/README.md`. Para informações gerais do monorepo, consulte `/readme.md` na raiz do projeto.
