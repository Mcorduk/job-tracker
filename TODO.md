# TODO List

## High Priority

- [ ] ~~Create Back End connection with MongoDB~~
- [ ] ~~Create models for Jobs and Reminders~~
- [ ] <=> Create CRUD API for Job Creation
- [ ] ~~Solve Job Frequency~~
- [ ] Understand Cron Jobs Persistence between resets and etc (!)
- [ ] Implement Job Listing Functionality
- [ ] ~~Learn how to use timers to schedule notifs.~~
- [ ] ~~Handle notification to users via Reminders (node-schedule?) (node-notifier)~~
- [ ] Learn How to Lift up MongoDB with Docker compose (MOOC - Docker Section)
- [ ] Dockerize Your Application
- [ ] Debug and Optimize
- [ ] Work on additional features using different branches

## Medium Priority

- [ ] ~~Add indication that Job was submitted to db cia form or encountered an error~~
- [ ] Add a url to Reminder, ("notes" key?), redirecting to job its reminding
- [ ] Recheck indexing for best possible optimization
- [ ] Decide notification channel: Print(default), desktop notif, alert, email?
- [ ] Add "custom" pane to repeating jobs:
      https://support.microsoft.com/en-gb/office/recurring-tasks-in-planner-9f2561ee-45ee-4834-955b-c457f8bb0490

## Low Priority

- [ ] Fix code duplication at `getCronExpressions`
- [ ] Add Time (Hour, minute, second) validation for `form/`
- [ ] Improve HTML Semantics and accessibility for `form.ejs`
- [ ] ~~Adjust cron for daylight savings (No daylight savings in Turkey)~~
- [ ] Ignored invalid cron expressions, do come back to tests later
- [ ] Restructure utils

## General

- [ ] Update README with better markdown
- [ ] Add (express) unit tests for `app.js`
- [ ] ~~Test POST requests saving jobs and reminders to db~~
- [ ] Learn what virtuals in mongoose does _properly_

## Optional

- [ ] ~~Add a "created at" key value to jobs~~
- [ ] ~~A library to handle job frequency feature~~
- [ ] Add Edit Job functionality, if you do Add modifiedAt to Job Schema

## Wishful Thinking

- [ ] Rebuild front end with React (I think it's possible, maybe not)
- [ ] Rewrite project with Typescript
- [ ] Make a kanban board for the view of jobs
