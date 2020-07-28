FROM  node:carbon

# Create app directory
WORKDIR /usr/src/app

# set timezone to IST
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#RUN npm run build

ARG PORT
ENV PORT=$PORT

EXPOSE 3000

CMD [ "npm", "start" ]
