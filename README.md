# Welcome to the Gov Survey App

### Prerequisites
* Docker
* Terminal
* Postman

### API documentation
https://documenter.getpostman.com/view/3620091/2s9YC5xXeg
<br>

### Follow the 5 simple steps
It is <u>important</u> to follow the sequence of each steps to setup all the environment properly.
<br>
## Step 1: Download or clone the repository
```
git clone git@github.com:mikemusni/govTech-Exam.git
```
## Step 2: Build Docker Images for Each Folder
/backEnd-govSG:
```
docker build -t mikemusni/govsg:latest ./backEnd-govSG
```
/backEnd-survey:
```
docker build -t mikemusni/govsurvey:latest ./backEnd-survey
```
/frontEnd-survey:
```
docker build -t mikemusni/govsurvey-fe:latest ./frontEnd-survey
```
/postgres:
```
docker build -t mikemusni/postgres-sg ./postgres
```
* If you have done this correctly, you should have addition 4 images in your Docker. You may run the command `docker container ls` to confirm the images. (or use the docker desktop)

## Step 3: Create a Docker Network
```
docker network create --driver bridge --subnet 192.168.2.0/24 --gateway 192.168.2.1 gov-sg
```
* Run the command `docker network ls`, and you should have an additional network ID called `giv-sg`

## Step 4: Run All Docker Containers for Each Folder
Note: Postgres must be executed first before everything else; otherwise, the other containers will not be created.\
<br>
/postgres:
```
docker run --name postgres-sg --net gov-sg --ip 192.168.2.2 -p 5432:5432 -e POSTGRES_PASSWORD=root -d mikemusni/postgres-sg
```
/backEnd-govSG:
```
docker run --name govsg --net gov-sg --ip 192.168.2.3 -p 9000:9000 -d mikemusni/govsg
```
/backEnd-survey:
```
docker run --name govsurvey --net gov-sg --ip 192.168.2.4 -p 9001:9001 -d mikemusni/govsurvey
```
/frontEnd-survey:
```
docker run --name govsurvey-fe --net gov-sg --ip 192.168.2.5 -p 3000:3000 -d mikemusni/govsurvey-fe
```
* Run the command `docker ps` and you should see 4 new containers running. You can view the frontend by visiting the page http://localhost:3000
## Step 5: Run the TypeORM Migration Script for BackEnd-govSG and BackEnd-survey
```
docker exec -it govsg yarn typeorm:migrate
```
```
docker exec -it govsurvey yarn typeorm:migrate
```
<br>

# How to Operate the Application?
Simply create a user for GovAA using Postman.\
[API Documentation - User Creation](https://documenter.getpostman.com/view/3620091/2s9YC5xXeg#9abc7b54-4cb6-4ca1-81eb-0b18ad3cd911)

Then use the account to log in to the SurgeySG web page.\
[SurgeySG Web Page](http://localhost:3000)