FROM node:10-alpine
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT ["/usr/local/bin/node", "index.js"]
