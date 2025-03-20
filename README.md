# Agent_Task_Distribution
This project is a web-based task management system that includes user authentication, agent management, CSV file upload, and task distribution among agents. It is built using React, Node.js, Express, MongoDB, and TailwindCSS, and is deployed on Render.

**Features**

**Authentication**

    • User registration and login system.
    • Authentication using JSON Web Tokens (JWT).
    • Credentials are securely stored and matched in MongoDB.
    • Redirect users to the dashboard upon successful login.
    • Display appropriate error messages on authentication failure.      
      
**Dashboard**      
      
    • Agent Management
    • Add new agents.
    • Display a list of agents.
    • Delete agents from the system.
    • File Upload
    • Upload CSV files for task management.
    • Accepts only CSV, XLSX, and XLS file formats.
    • Validates the uploaded CSV to ensure correct formatting.
    • Task List
    • Displays the distributed tasks.
    • Filter tasks based on assigned agents.
    • Task Distribution
    • Tasks are distributed equally among agents.
    • If the total number of tasks is not divisible by 5, the remaining tasks are assigned sequentially.
    • Distributed task lists are saved in MongoDB and displayed in the frontend.

**Technologies Used**

    • Frontend: React, TailwindCSS
      
    • Backend: Node.js, Express.js
      
    • Database: MongoDB
      
    • Authentication: JSON Web Token (JWT)
      
    • Deployment: Render




**Setup & Execution**

**Prerequisites**

Make sure you have the following installed on your system:
    • Node.js
    • React
    • Express
    • Tailwnd CSS
    • MongoDB
    • Git
    
**Steps to Run Locally**

    1. Clone the repository:
    2. Navigate to the project directory:
    3. Install dependencies:
    4. Set up environment variables in a .env file:
    5. Start the backend server:
    6. Navigate to the frontend directory and install dependencies:
    7. Start the frontend:
