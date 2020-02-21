FROM node

RUN mkdir -p /srv/app/ibig-admin-client
WORKDIR /srv/app/ibig-admin-client
COPY package.json /srv/app/ibig-admin-client
RUN npm install
COPY . /srv/app/ibig-admin-client

CMD ["npm", "start"]