#FROM node:7.7.2-alpine
FROM node:alpine
WORKDIR /usr/app
ADD package.json /usr/app/package.json
RUN npm install --quiet
COPY . .
EXPOSE 3000