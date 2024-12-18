# User Management API Endpoints

### 1. **User Registration**
   - **Endpoint**: `POST /users/register`
   - **Functionality**: Allows new users to register by providing their name, email, password, and role.
   - **Required Fields**: `name`, `email`, `password`, `role`
   - **Validation**: 
     - Ensures all required fields are present.
     - Validates email format.
     - Checks for duplicate email entries.
   - **Response**: 
     - Success: "User registered successfully"
     - Error: Appropriate error message

---

### 2. **User Login**
   - **Endpoint**: `POST /users/login`
   - **Functionality**: Allows registered users to log in by providing email and password.
   - **Required Fields**: `email`, `password`
   - **Response**: 
     - Success: Returns a JWT token for authentication.
     - Error: "Invalid password" or "User not found"

---

### 3. **Forgot Password**
   - **Endpoint**: `POST /users/forget-password`
   - **Functionality**: Sends a password reset link to the user's email.
   - **Required Fields**: `email`
   - **Response**: 
     - Success: "Password reset link sent to your email"
     - Error: "User not found, please register" or SMTP-related errors

---

### 4. **Reset Password**
   - **Endpoint**: `POST /users/reset-password/:token`
   - **Functionality**: Resets the user's password using the token sent in the password reset email.
   - **Required Fields**: `password`
   - **Route Parameter**: `:token` (JWT token from the reset link)
   - **Response**: 
     - Success: "Password reset successfully"
     - Error: "Invalid token or user not found" or "Token has expired"

---



# Recipe Management API Endpoints

### 1. **Create a Recipe**
   - **Endpoint**: `POST /recipes/create`
   - **Functionality**: Allows users to create a new recipe by providing the title, ingredients, instructions, cuisine type, and an optional image.
   - **Required Fields**: `title`, `ingredients`, `instructions`, `cuisineType`
   - **Middleware**: `auth.middleware.js`, `roleCheck.middleware.js`, `upload_image.middleware.js`

---

### 2. **Get All Recipes**
   - **Endpoint**: `GET /recipes/all`
   - **Functionality**: Retrieves all recipes with pagination. Includes information about the user who created the recipe.
   - **Query Parameters**: 
     - `page` (optional): Page number for pagination (default: 1)
     - `limit` (optional): Number of recipes per page (default: 10)
   - **Middleware**: `auth.middleware.js`, `roleCheck.middleware.js`

---

### 3. **Get Recipe Details**
   - **Endpoint**: `GET /recipes/details/:id`
   - **Functionality**: Fetches detailed information about a specific recipe by its ID. Includes creator details.
   - **Middleware**: `auth.middleware.js`, `roleCheck.middleware.js`, `upload_image.middleware.js`

---

### 4. **Update a Recipe**
   - **Endpoint**: `PATCH /recipes/update/:id`
   - **Functionality**: Updates a specific recipe’s details. Only the user who created the recipe can update it.
   - **Allowed Fields for Update**: `title`, `ingredients`, `instructions`, `cuisineType`, `image`
   - **Middleware**: `auth.middleware.js`, `roleCheck.middleware.js`, `upload_image.middleware.js`

---

### 5. **Delete a Recipe**
   - **Endpoint**: `DELETE /recipes/delete/:id`
   - **Functionality**: Deletes a specific recipe. Only the user who created the recipe can delete it.
   - **Middleware**: `auth.middleware.js`, `roleCheck.middleware.js`

---

### 6. **Search Recipes**
   - **Endpoint**: `GET /recipes/search`
   - **Functionality**: Searches for recipes based on the provided cuisine type (case-insensitive).
   - **Query Parameter**:
     - `cuisineType` (required): Type of cuisine to search for.
   - **Middleware**: `auth.middleware.js`, `roleCheck.middleware.js`

---


{
	"info": {
		"_postman_id": "16922fbf-6f48-4512-a6f4-73048ba453d7",
		"name": "New Collection",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "39928894",
		"_collection_link": "https://testing-2113.postman.co/workspace/08726d63-bca7-4d21-9bad-1e66bdd4f494/collection/39928894-16922fbf-6f48-4512-a6f4-73048ba453d7?action=share&source=collection_link&creator=39928894"
	},
	"item": [
		{
			"name": "Recipe API",
			"item": [
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/auth/register",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"kartik\",\r\n    \"email\":\"kartikhirpara800@gmail.com\",\r\n    \"password\":\"olduser123\",\r\n    \"nationality\":\"indian\",\r\n    \"role\":\"user\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/auth/register",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"auth",
								"register"
							]
						}
					},
					"response": []
				},
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/auth/login",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \r\n    \"email\":\"kartikhirpara800@gmail.com\",\r\n    \"password\":\"olduser123\"\r\n   \r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/auth/login",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"auth",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/auth/forget-password",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \r\n    \"email\":\"kartikhirpara800@gmail.com\"\r\n   \r\n   \r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/auth/forget-password",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"auth",
								"forget-password"
							]
						}
					},
					"response": []
				},
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/auth/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcnRpa2hpcnBhcmE4MDBAZ21haWwuY29tIiwiaWF0IjoxNzM0NDM5MjIwLCJleHAiOjE3MzQ0NDI4MjB9.JT4mxW5Nb2tTYvEt5OhZlhqdE6uOVUCjtq6Hn1KKgSk",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"password\" : \"newuser123\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/auth/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcnRpa2hpcnBhcmE4MDBAZ21haWwuY29tIiwiaWF0IjoxNzM0NDM5MjIwLCJleHAiOjE3MzQ0NDI4MjB9.JT4mxW5Nb2tTYvEt5OhZlhqdE6uOVUCjtq6Hn1KKgSk",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"auth",
								"reset-password",
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcnRpa2hpcnBhcmE4MDBAZ21haWwuY29tIiwiaWF0IjoxNzM0NDM5MjIwLCJleHAiOjE3MzQ0NDI4MjB9.JT4mxW5Nb2tTYvEt5OhZlhqdE6uOVUCjtq6Hn1KKgSk"
							]
						}
					},
					"response": []
				},
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/auth/login",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \r\n    \"email\":\"kartikhirpara800@gmail.com\",\r\n    \"password\" : \"newuser123\"\r\n   \r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/auth/login",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"auth",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/auth/register",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"kartik Hirapara\",\r\n    \"email\":\"kartikhirapara800@gmail.com\",\r\n    \"password\":\"olduser123\",\r\n    \"nationality\":\"indian\",\r\n    \"role\":\"admin\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/auth/register",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"auth",
								"register"
							]
						}
					},
					"response": []
				},
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/auth/login",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\":\"kartikhirapara800@gmail.com\",\r\n    \"password\":\"olduser123\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/auth/login",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"auth",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/recipes/create",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE3MzZlMmNjMmUzMjA4ZTIzZTNlMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNDUxMDE5NywiZXhwIjoxNzM0NTEzNzk3fQ.0XSLBezWep6G8K4Wh007cA6WNT74LvHJ73kESpZsEMY",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "multipart/form-data",
								"type": "text"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "title",
									"value": "Spaghetti Bolognese",
									"type": "text"
								},
								{
									"key": "ingredients",
									"value": "spaghetti,tomato sauce,ground beef,garlic,olive oil",
									"type": "text"
								},
								{
									"key": "instructions",
									"value": "Cook spaghetti and prepare sauce. Combine",
									"type": "text"
								},
								{
									"key": "cuisineType",
									"value": "Italian",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": "/C:/Users/Kartik/Downloads/Spaghetti Bolognese.jpg"
								}
							]
						},
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/recipes/create",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"recipes",
								"create"
							]
						}
					},
					"response": []
				},
				{
					"name": "https://recipe-management-backend-1pni.onrender.com/recipes/details/67628c7b7d1db9ca493ba323",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjE3MzZlMmNjMmUzMjA4ZTIzZTNlMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNDUxMDE5NywiZXhwIjoxNzM0NTEzNzk3fQ.0XSLBezWep6G8K4Wh007cA6WNT74LvHJ73kESpZsEMY",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "",
								"value": "",
								"type": "text"
							}
						],
						"url": {
							"raw": "https://recipe-management-backend-1pni.onrender.com/recipes/details/67628c7b7d1db9ca493ba323",
							"protocol": "https",
							"host": [
								"recipe-management-backend-1pni",
								"onrender",
								"com"
							],
							"path": [
								"recipes",
								"details",
								"67628c7b7d1db9ca493ba323"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}