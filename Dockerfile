# Set the baseImage to use for subsequent instructions. 
FROM node:12
# Set the working directory for any subsequent
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Execute any commands on top of the current image as a new layer and commit the results.
RUN npm install
#  Bundle app source
COPY . .
# Set the environment variable key to the value which is 8080
ENV PORT=8080
# Define the network ports that this container will listen on at runtime.
EXPOSE 8080
# Provide defaults for an executing container.
CMD [ "npm", "start" ]
