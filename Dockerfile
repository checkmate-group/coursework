# Set the baseImage to use for subsequent instructions. 
FROM node:16 as base
# Set the working directory for any subsequent
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Execute any commands on top of the current image as a new layer and commit the results.
RUN npm install
#  Bundle app source
COPY . .
# Define the network ports that this container will listen on at runtime.
EXPOSE 3000
# Provide defaults for an executing container.
CMD [ "npm", "start" ]
