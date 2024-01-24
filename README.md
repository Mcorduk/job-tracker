# Job Reminder App

**Overview:**
This is a simple Job Reminder App that allows users to register jobs and set reminder dates for those jobs. Notifications are sent to the user when the reminder dates are reached.

**Requirements:**

- Node.js and npm installed
- Docker and Docker Compose installed
- MongoDB installed (optional if using docker compose)
- Ports: Make sure ports 3000 and 27017 is not used by a different process.

**Setup:**

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

**Usage:**

1.  Open your browser and navigate to http://localhost:3000.
2.  Register your jobs and set reminder dates.

**Notes:**

- Notifications are currently set to print on server console as well as alert in browser.
- Authentication is not implemented as the app assumes a single user scenario.
- MongoDB can be set up either locally or using Docker Compose. Choose the option that suits your preference.
- The app is designed to run locally. No API is exposed externally.

**Author:** Muhammet Corduk

**License:** This project is licensed under the MIT License - see the LICENSE file for details.
