#
FROM node:12
#
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
#
RUN npm install
# 
COPY . .
#
ENV PORT=8080
#
EXPOSE 8080
#
CMD [ "npm", "start" ]
