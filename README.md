## Project Setup Summary

### Technologies Used
- **Backend**: Node.js + Express
- **Authentication**: Clerk
- **Database**: PostgreSQL (via Knex.js)
- **Deployment**: Render (backend + database), Vercel or Render (frontend)

---

## Backend Highlights

- ✅ `@clerk/express` used for middleware authentication
- ✅ Role-based access using `publicMetadata.role`
- ✅ Knex configuration uses `pg-connection-string` to parse DATABASE_URL
- ✅ Booking routes: GET, PUT, DELETE protected with `requireAuth()` and `verifyAdmin`
- ✅ Proper handling of `NODE_ENV` for env-specific behavior
- ✅ PostgreSQL error resolved: `password must be a string` via parsing

---

## Critical Debug Fixes
- 🛠️ PostgreSQL connection failure → fixed with proper parsing of `DATABASE_URL` and SSL handling
- 🛠️ Clarified deployment order: DB → Backend → Frontend