FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN [ -f .env ] || cp .env.example .env

EXPOSE 5173

CMD ["npm", "run", "serve"]
