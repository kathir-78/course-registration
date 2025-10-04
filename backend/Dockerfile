FROM node:18-alpine

WORKDIR /app

# copy code first for cached
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Start the app
CMD ["npm", "start"]
