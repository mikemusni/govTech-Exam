FROM node:16-alpine
WORKDIR /govSG
COPY . .
RUN yarn install
ENV PORT=9001
ENV DB_HOST=192.168.2.2
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=root
ENV DB_DATABASE=survey
ENV GOV_SG_URL=http://192.168.2.3:9000
ENV GOV_SG_SECURED_TOKEN=secretToken
EXPOSE 9001
RUN yarn build
CMD yarn start
