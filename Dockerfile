FROM node:12-alpine
WORKDIR /tic-tac-toe-react
COPY . .
RUN npm i --production
CMD ["node", "/tic-tac-toe-react/build/index.html"]