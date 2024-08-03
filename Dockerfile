FROM node:21

RUN apt-get update && apt-get install -y --no-install-recommends nano vim  

RUN npm install -g serve

WORKDIR /app

COPY dist /app/dist

CMD ["serve", "-s", "dist", "-l", "8080"]
