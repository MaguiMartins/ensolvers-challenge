# 📝 Full-Stack Note-Taking Application

Full stack implementation of a Note-taking application. The app allows users to create, edit, archive, and delete notes, as well as tag them for filtering.

## 🚀 Project Overview

This project was built following a layered architecture in the backend and a component-based approach in the frontend.

**Key Features:**
- **Secure Access**: Simple login interface to protect your notes.
- **Create & Edit**: CRUD for note content.
- **Archive System**: Keep your workspace clean by archiving old notes.
- **Tagging & Filtering**: Assign multiple tags to notes and filter them instantly via the search bar.
- **Zero-Config Database**: Uses SQLite, so no external database installation (like MySQL or Postgres) is required.

## 🔐 Login Credentials

To access the application, use the following credentials:
* **User**: `admin`
* **Password**: `123456`

## 🛠️ Technology Stack

* **Backend**: NestJS (Node.js framework), TypeORM, SQLite.
* **Frontend**: React (Vite), TypeScript, Bootstrap 5.
* **API Documentation**: Swagger UI.

## 📋 Prerequisites

To run this application locally, you need:
- **Node.js**: v18 or higher.
* **Git**
* **Bash Terminal** (Git Bash is recommended for Windows users)

> **Note:** Unlike other implementations using Docker/PostgreSQL, this project uses **SQLite**. This means you **do not** need to install Docker or run complex container setups. The database is a self-contained file generated automatically.

## ⚙️ How to Run (One-Command Setup)

I have included a `start.sh` script that automates the installation of dependencies and starts both the Backend and Frontend servers.

1.  Open your terminal in the project root folder.
2.  Run the script:

    ```bash
    sh start-app.sh
    ```

3.  The script will:
    * Install Backend dependencies.
    * Start the Backend server.
    * Install Frontend dependencies.
    * Launch the Frontend.

4.  **Access the App:** Click the link in the terminal (should be `http://localhost:5173`), and for backend (should be `http://localhost:3000/notes`) .



## 📖 API Documentation (Swagger)

Once the backend is running, you can explore the REST API endpoints via the Swagger interface:

* **URL:** `http://localhost:3000/api`

## 🏗️ Architecture Decisions

* **Backend Layers:** Implemented Controllers, Services, and Entities to separate concerns, adhering to the requirements.
* **Persistence:** Used TypeORM with SQLite to ensure relational data persistence without the overhead of a dedicated database server setup for the reviewer.
* **SPA:** The frontend is completely decoupled from the backend, communicating strictly via REST API calls.

## ✉️ To Ensolvers

Finally, I want to express that I enjoyed the challenge of migrating my knowledge to a full-stack implementation using NestJS and React. I am truly thankfull the opportunity to do this project for the assesment.

Thank you for reviewing my code! 😊