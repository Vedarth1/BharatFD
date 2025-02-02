# FAQ Management System

This backend application is designed to manage frequently asked questions (FAQs) with support for multi-language translations in English, Hindi, and Bengali. The project utilizes Node.js, Express, MongoDB, and Redis for efficient caching and faster data retrieval. The Admin Panel built using AdminJS provides an easy-to-use interface for managing the FAQs and automating translations.

---

## Key Features

- **Multi-language Support**: FAQs are primarily stored in English and automatically translated into Hindi and Bengali.
- **Admin Panel**: A web-based interface for adding, updating, and deleting FAQs.
- **Caching**: Redis is integrated to cache FAQs, providing quicker access to frequently requested data.
- **REST API**: Expose FAQ data in multiple languages using query parameters to specify language preference.
- **Unit Tests**: Comprehensive unit tests to ensure API functionality and translation accuracy.

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Caching**: Redis
- **Admin Panel**: AdminJS
- **Translation**: Google Translate API
- **Testing**: Mocha, Chai, Supertest

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Install Node.js (v16 or higher) from [nodejs.org](https://nodejs.org/).
2. **MongoDB**: Install MongoDB locally or use a cloud service like MongoDB Atlas.
3. **Redis**: Install Redis locally or use a cloud service like Redis Labs.
4. **Docker** (optional): Install Docker for containerized deployment.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Vedarth1/BharatFD
cd BharatFD
```
### Step 2: Install Dependencies
- Install the required Node.js packages:

```bash
npm install
```
### Step 3: Set Up Environment Variables
- Create a .env file in the root directory and add the following variables:
``` bash
MONGODB_URI= your-mongourl
REDIS_URL= your-redis-url
SECRET=vedarth
PORT=3000
```
### Step 4: Start MongoDB and Redis
- MongoDB: Start MongoDB locally or use a cloud connection string.
- Redis: Start Redis locally or use a cloud connection string.

## Step 5: Run the Application
- Start the server:

```bash
npm run dev
```
- Open your browser and navigate to [http://localhost:3000](http://localhost:300)

### Step 6: Access the Admin Panel
- Open your browser and go to [http://localhost:3000/admin](http://localhost:3000/admin)
- Log in with the following credentials: 
- default hardcoded values are used store secreactly in a keyvault like Azurekeyvault or any other container
```
Email: admin 
Password: admin
```

### Running Tests
- To run the unit tests:

```bash
npm test
```

## Build the Docker Image
Run the following command to build the Docker image for the application:

```bash
docker-compose up --build -d
```

## Acknowledgements
- Thank you for checking out this project. Feel free to contribute and improve the functionality.

## Thank You