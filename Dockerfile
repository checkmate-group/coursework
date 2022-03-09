#
FROM node:16
#
WORKDIR /src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# FROM base as dev
# ENV NODE_ENV=development

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
