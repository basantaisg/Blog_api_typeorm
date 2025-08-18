# Blog API (NestJS + PostgreSQL)

A fully relational backend API built with **NestJS** and **TypeORM**, demonstrating:

- User management (CRUD)
- Blog posts (CRUD with User relation)
- Comments (CRUD with Post + User relation)
- DTO validation
- Database relations (One-to-Many, Many-to-One)
- Ready for JWT Auth, file uploads, and production deployment

---

## 📦 Project Structure

- `src/users` → Users module (entity, service, controller, DTOs)  
- `src/posts` → Posts module (entity, service, controller, DTOs)  
- `src/comments` → Comments module (entity, service, controller, DTOs)  
- `main.ts` → NestJS bootstrap file  

Entities have relational setup:

- **User → Post (1:N)**  
- **Post → Comment (1:N)**  
- **User → Comment (1:N, optional)**  

---

## ⚡ Features

1. CRUD operations for **Users**, **Posts**, and **Comments**  
2. Relations automatically loaded using TypeORM `relations` option  
3. DTO validation for safe input  
4. Centralized error handling via NestJS exceptions  
5. Ready for Auth and advanced backend features  

---

## 🛠️ Setup & Installation

### 1. Clone the project
```bash
git clone [<your-repo-url>](https://github.com/basantaisg/Blog_api_typeorm)
cd blog-api
npm install



2. Configure PostgreSQL

Install PostgreSQL & pgAdmin

Create database blog_app

Update app.module.ts with your database credentials:

TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '<your-password>',
  database: 'blog_app',
  autoLoadEntities: true,
  synchronize: true,
});


⚠️ synchronize: true is for development only. Disable in production.

🚀 Run Project
npm run start:dev


API will run at http://localhost:3000


📝 API Endpoints
Users
Method	Endpoint	Body	Description
POST	/users	{ name, email, password }	Create a new user
GET	/users	—	Get all users
GET	/users/:id	—	Get user by ID
PUT	/users/:id	{ name?, email?, password? }	Update user
DELETE	/users/:id	—	Delete user
Posts
Method	Endpoint	Body	Description
POST	/posts	{ title, content, userId }	Create a post for a user
GET	/posts	—	Get all posts with author
GET	/posts/:id	—	Get post by ID with author
Comments
Method	Endpoint	Body	Description
POST	/comments	{ text, userId, postId }	Create comment for post
GET	/comments	—	Get all comments with user + post
GET	/comments/:id	—	Get comment by ID with relations
✅ Testing

Use Postman to test endpoints

Make sure users exist before creating posts/comments

Relations auto-load, so GET requests include linked entities

💡 Next Steps

Add JWT Authentication & Guards

Add Pagination & Filtering for posts/comments

Add file uploads for user profile images and post attachments

Error logging & monitoring

⚙️ Notes

This project is development-focused, use synchronize: false in production and migrate DB manually

Relations are eagerly loaded for simplicity; in production, use query builder for performance
