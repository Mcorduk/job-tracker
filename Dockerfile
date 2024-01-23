FROM node

ENV MONGODB_URI=mongodb://root:VKR2Vb7twQS0nIBL@localhost:27017/ \
    MONGO_INITDB_USERNAME=root \
    MONGO_INITDB_PASSWORD=VKR2Vb7twQS0nIBL

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "/home/app/bin/www"]

