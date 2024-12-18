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



###  ** API Document**
https://testing-2113.postman.co/workspace/Recipe-App~08726d63-bca7-4d21-9bad-1e66bdd4f494/documentation/39928894-16922fbf-6f48-4512-a6f4-73048ba453d7?entity=folder-0e3e866c-16ff-4042-a0b8-96d372ff3ffc
