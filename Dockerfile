From node

# Create app dir
WORKDIR /usr/src/app

# We install app dependencies. We copy both package.json and package-loc.json (so
# we use a wildcard)
COPY package*.json ./

RUN npm install
# Code for production is run with npm ci --only=production

#Bundle app source code: 
COPY . .

# Binding port to docker daemon
EXPOSE 3000

CMD [ "node", "server.js" ]