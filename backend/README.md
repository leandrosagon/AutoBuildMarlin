## SurpriseDelivery Backend (Node + Express + TypeScript)

APIs para usuários, restaurantes, pedidos, assinaturas e recomendações, com placeholders para Firebase Auth e Stripe.

### Scripts
- dev: desenvolvimento com ts-node-dev
- build: transpila TypeScript para `dist`
- start: roda versão compilada

### Endpoints principais
- GET `/health` — healthcheck
- CRUD `/users`
- CRUD `/restaurants`
- CRUD `/orders`
- CRUD `/subscriptions`
- GET `/recommendations` — recomendações para usuário

### Exemplo de resposta padrão
```json
{
  "success": true,
  "message": "Users fetched",
  "data": [],
  "meta": { "page": 1, "perPage": 20, "total": 0 }
}
```

### Auth (placeholder)
- Enviar `Authorization: Bearer <FIREBASE_ID_TOKEN>` (se Firebase configurado)
- Alternativamente, para desenvolvimento: `x-user-id: <USER_ID>`

### Stripe (placeholder)
- Variáveis `STRIPE_SECRET_KEY` e `STRIPE_WEBHOOK_SECRET` habilitam integração real
- Sem chaves, os endpoints retornam objetos simulados

