# Dicoding Personal Tracking Dashboard

This repository is part of the AI Learning Insight Capstone Project, which forms a vital component of an end-to-end web-based solution to deliver insightful data to learners through advanced AI-powered learning analytics.

## Tech Stack

This project uses the following technologies:

### Front-End
- **JavaScript**: Core programming language for creating dynamic and interactive web content.
- **CSS**: Stylesheets for designing a visually appealing user interface.
- **HTML**: Markup language forming the backbone of web page structure.
- **Vite**: A modern, fast front-end build tool optimized for development with HMR (Hot Module Replacement) support.
- **React**: A robust JavaScript library for building user interfaces based on components.

### Back-End
- **Node.js**: High-performance JavaScript runtime environment that enables server-side application development.
- **Express.js**: Lightweight and flexible web application framework for Node.js.
- **Prisma**: Modern database toolkit and ORM that offers type-safe database access.
- **PostgreSQL**: Powerful, open-source relational database management system known for its reliability and robustness.
- Additional tools for secure and scalable deployment.

### Language Composition

The language composition indicates a strong focus on front-end development:
- **JavaScript**: 88.7%
- **CSS**: 10.8%
- **HTML**: 0.5%

These statistics emphasize the repository's dedication to creating highly interactive and stylistically rich web interfaces.

---

## Model Assets

Model files and related artifacts are available on Google Drive:
- [AI Learning Insight Model Folder](https://drive.google.com/drive/folders/1UkInxV8vyzI3I9OApQ5I3o6jJqN15pxW?usp=drive_link)

Download the required model files from the link above and place them in the appropriate directory as specified by your service configuration (e.g., `Back-End/models` or a path referenced in environment variables).

---

## Local Development Setup

### 1. Setting Up the Repository

1. **Clone the repository**:
   ```bash
   git clone https://github.com/demosaguardy/AILearningInsight_CapstoneProject.git
   ```
2. Navigate to the project directory:
   ```bash
   cd AILearningInsight_CapstoneProject
   ```

---

### 2. Setting Up the Front-End

1. Navigate to the frontend directory:
   ```bash
   cd Front-End
   ```
2. Install front-end dependencies:
   ```bash
   npm install
   ```
3. Start the front-end development server:
   ```bash
   npm run dev
   ```
4. Once the server is running, navigate to `http://localhost:3000/` in your web browser to view the front-end application.

---

### 3. Setting Up the Back-End

1. Navigate to the backend directory:
   ```bash
   cd ../Back-End
   ```
2. Install back-end dependencies:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Ensure you have PostgreSQL installed on your system. You can install it [here](https://www.postgresql.org/download/).
   - Create a new PostgreSQL database:
     ```sql
     CREATE DATABASE ail_project;
     ```
   - Update the `.env` file in the backend directory with your database connection details:
     ```env
     DATABASE_URL=postgresql://<username>:<password>@localhost:5432/ail_project
     ```
   - Run the database migrations (to set up the schema):
     ```bash
     npx prisma migrate dev
     ```

4. Start the back-end development server:
   ```bash
   npm run start
   ```
5. By default, the back-end server will run on `http://localhost:5000/`. Make sure the `.env` configuration matches your setup.

---

### Contributors 

| Name                | ID ASAH       | Path         |
|---------------------|---------------|--------------|
| Muhammad Rafly Pratama Olanda       | R269D5Y1345      | React & Back-End with AI|
| Farhan Imannudin       | M269D5Y0596      | Machine Learning |
| Khalil Pradipta Lee       | M269D5Y0964      | Machine Learning|
| Dimas Raditya Permana       | R269D5Y0491      | React & Back-End with AI |
| Demosa Guardy Nugroho       | R269D5Y0448      | React & Back-End with AI|
