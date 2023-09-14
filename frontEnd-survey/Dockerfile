FROM node:16-alpine
WORKDIR /govSurvey-fe
COPY . .
RUN yarn install
ENV REACT_APP_GOVSG_API=http://localhost:9000
ENV REACT_APP_SURVEY_API=http://localhost:9001
EXPOSE 3000
RUN yarn build
RUN yarn global add serve
CMD serve -s build