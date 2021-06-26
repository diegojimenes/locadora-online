/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           description: user data.
 *           example: { "id": "fd4bc1fc-79ad-46d4-9639-12526bea1877", "name": "teste12", "email": "teste2", "createdAt": "2021-06-20T18:33:53.162Z", "updatedAt": "2021-06-20T18:33:53.162Z" }
 *         token:
 *           type: string
 *           description: token jwt.
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkNGJjMWZjLTc5YWQtNDZkNC05NjM5LTEyNTI2YmVhMTg3NyIsImV4cCI6MTYyNDI1MDkzOSwiaWF0IjoxNjI0MjE0OTM5fQ.oRqnNn-Judsm5FQ86e7qENs94173oIlkJqy--bCV89c"
 *     user:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: user ID.
 *           example: "fd4bc1fc-79ad-46d4-9639-12526bea1877"
 *         name:
 *           type: string
 *           description: username.
 *           example: "Alan turing"
 *         email:
 *           type: string
 *           description: email.
 *           example: "alan@turing.com" 
 *         createdAt:
 *           type: string
 *           description: date of user creation.
 *           example: "2021-06-20T18:22:49.893Z" 
 *         updatedAt:
 *           type: string
 *           description: last update in user document.
 *           example: "2021-06-20T18:22:49.893Z" 
*/