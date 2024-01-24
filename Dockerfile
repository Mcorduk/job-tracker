FROM node

ENV MONGODB_URI=mongodb://localhost:27017/job_tracker

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "/home/app/bin/www"]

