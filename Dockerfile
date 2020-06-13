FROM node:13.13.0-alpine

WORKDIR '/app'

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install -g serve

COPY . ./

RUN CI=true npm test
RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]