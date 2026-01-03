# RekrootDesk Backend

Express + MongoDB backend with JWT auth and REST APIs for profile and skills.

## Setup

### Local Development

1. Install MongoDB locally or use MongoDB Atlas cloud:
   ```bash
   # Local: https://docs.mongodb.com/manual/installation/
   # Cloud: https://www.mongodb.com/cloud/atlas
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. Update `.env` with your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/rekrootdesk
   # OR for MongoDB Atlas:
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rekrootdesk
   JWT_SECRET=your-secret-key
   CORS_ORIGIN=http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Endpoints

- `POST /api/auth/signup` — create account `{ email, password, name, role }`
- `POST /api/auth/login` — get JWT `{ token }`
- `GET /api/profile/me` — current user profile (Bearer token)
- `PUT /api/profile/me` — update `{ jobTitle, location, bio, linkedin, website }` (Bearer token)
- `GET /api/skills` — list skills (Bearer token)
- `POST /api/skills` — add skill `{ name, category, proficiency }` (Bearer token)
- `DELETE /api/skills/:id` — delete skill (Bearer token)

## Render Deployment

1. Create a MongoDB cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get the connection string (e.g., `mongodb+srv://...`)
3. Create a Render Web Service:
   - Connect repo, set root directory to `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Add environment variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = strong secret
   - `CORS_ORIGIN` = client URL (e.g., `https://your-app.onrender.com`)
5. Deploy!

## Notes

- Mongoose handles MongoDB connection pooling and schema validation.
- For production, use MongoDB Atlas or a managed MongoDB service.
- Render automatically assigns PORT; you don't need to set it.
