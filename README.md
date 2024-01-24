# Job Reminder App

**Overview:**
This is a simple Job Reminder App that allows users to register jobs and set reminder dates for those jobs. Notifications are sent to the user when the reminder dates are reached.

**Requirements:**

- Node.js and npm installed
- Docker and Docker Compose installed
- MongoDB installed (optional if using docker compose)
- Ports: Make sure ports 3000 and 27017 is not used by a different process.

### Setup:

1. Install Dependencies:

   ```bash
   npm install

   ```

2. MongoDB Setup:

   - Docker Compose : Use Docker Compose to set up MongoDB.
   - Local MongoDB : Optionally use MongoDB locally.

   ```bash
   docker-compose up -d
   ```

3. Run the App:

   bash

   ```bash
   npm start

   ```

### Usage:

1.  Open your browser and navigate to http://localhost:3000.
2.  Register your jobs and set reminder dates.

**Notes:**

- Notifications are currently set to print on server console as well as alert in browser.
- Authentication is not implemented as the app assumes a single user scenario.
- MongoDB can be set up either locally or using Docker Compose. Choose the option that suits your preference.
- The app is designed to run locally. No API is exposed externally.

#### General troubleshooting:

1. Make sure Docker engine is running:

   On macOS and Linux, run docker ps to check if the Docker daemon is running.
   On Windows, check the Docker Desktop icon in the system tray. If it's not running, start it and then try again.

2. Verify ports are available:

   Ensure ports 3000 and 27017 are not used by other processes.
   Close any applications using these ports before running the app.

3. Check application logs:

   For errors related to the Node.js application, check the app.log file located in the root directory of the project.
   For Docker-related errors, check the container logs using docker logs job-reminder-app.

4. Verify MongoDB connection:

   If using Docker Compose, run docker-compose logs to check the MongoDB container logs for any errors.
   If using local MongoDB, ensure it's running and accessible on port 27017.

**Author:** Muhammet Corduk

**License:** This project is licensed under the MIT License - see the LICENSE file for details.
