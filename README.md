# Steps on how to setup gov survey app

### Pre-requisites
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
git@github.com:mikemusni/govTech-Exam.git
```
## Step 2: Build all the docker files for each folder
```
backEnd-govSG: docker build -t mikemusni/govsg:latest .
```
```
backEnd-survey: docker build -t mikemusni/govsurvey:latest .
```
```
frontEnd-survey: docker build -t mikemusni/govsurvey-fe:latest .
```
```
postgres: docker build -t mikemusni/postgres-sg .
```
* If you have done this correctly, you should have addition 4 images in your docker. You may run the command <kbd> `docker container ls` </kbd> to confirm the images. (or use the docker desktop)

## Step 3: Create a docker network
```
docker network create --driver bridge --subnet 192.168.2.0/24 --gateway 192.168.2.1 gov-sg
```
* Run the command <kbd> `docker network ls` </kbd> you should have a additional network id <kbd>`giv-sg`</kbd> (or use the docker desktop)

## Step 4: Create and start all the docker containers for each folder
Note: postgres must be executed first before everything else the other containers will not be created.
```
postgres: docker run --name postgres-sg --net gov-sg --ip 192.168.2.2 -p 5432:5432 -e POSTGRES_PASSWORD=root -d mikemusni/postgres-sg
```
```
backEnd-govSG: docker run --name govsg --net gov-sg --ip 192.168.2.3 -p 9000:9000 -d mikemusni/govsg
```
```
backEnd-survey: docker run --name govsurvey --net gov-sg --ip 192.168.2.4 -p 9001:9001 -d mikemusni/govsurvey
```
```
frontEnd-survey: docker run --name govsurvey-fe --net gov-sg --ip 192.168.2.5 -p 3000:3000 -d mikemusni/govsurvey-fe
```
* Run the command <kbd> `docker ps` </kbd> you should have a 4 new containers running and able to view the frontend by visiting the page http://localhost:3000
## Step 5: Run the typeorm migration script for backEnd-govSG and backEnd-survey
Note: Doesn't need to be in the specific folder.

```
docker exec -it govsg yarn typeorm:migrate
```
```
docker exec -it govsurvey yarn typeorm:migrate
```
<br><br><br>

# How to operate the application?
Simply create a user for GovAA using postman.\
https://documenter.getpostman.com/view/3620091/2s9YC5xXeg#9abc7b54-4cb6-4ca1-81eb-0b18ad3cd911

Then use the account to login in surgeySG web page.\
http://localhost:3000
