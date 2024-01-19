`# Job Reminder App

**Overview:**
This is a simple Job Reminder App that allows users to register jobs and set reminder dates for those jobs. Notifications are sent to the user when the reminder dates are reached.

**Requirements:**
- Node.js and npm installed
- MongoDB installed locally
- Docker and Docker Compose installed (optional for MongoDB setup)

**Setup:**
1. Install Dependencies:
   ```bash
   npm install `

1.  MongoDB Setup:

    -   Docker Compose : Use Docker Compose to set up MongoDB. Make sure Docker and Docker Compose are installed.

    bash

    -   -   `docker-compose up -d`

        -   Configure Environment Variables: Copy the `.env.example` file to `.env` and update the values accordingly.

    bash

    -   `cp .env.example .env`

    -   Run the App:

    bash

1.  `npm start`

**Usage:**

1.  Open your browser and navigate to http://localhost:3000.
2.  Register your jobs and set reminder dates.

**Notes:**

-   Notifications are currently set to print. For email notifications, additional configuration is required (not implemented in this version).
-   Authentication is not implemented as the app assumes a single user scenario.
-   MongoDB can be set up either locally or using Docker Compose. Choose the option that suits your preference.
-   The app is designed to run locally. No API is exposed externally.
-   CI/CD tools can be integrated based on your preference, but they are optional for this task.

**Author:** Muhammet Corduk

**License:** This project is licensed under the MIT License - see the LICENSE file for details.
