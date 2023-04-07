FROM node:14

WORKDIR /myfolder/

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install

COPY . /myfolder/
ENV NODE_ENV production
CMD yarn dev