# This will be the first instruction that will initialize a new build stage for the base image
FROM node:16

# This instruction sets the working directory for the project
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

# The instruction informs Docker that the container listens on the specified network port
EXPOSE 3000

CMD [ "npm", "start" ]
