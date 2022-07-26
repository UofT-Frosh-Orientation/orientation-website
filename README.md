# Orientation Website
This repository holds the source code for UofT Engineering's Orientation Website! This fullstack website is 
split into two "packages". First, there is the frontend package, `client`, and second there is the backend
package `server`.
## Getting started
To get started, you need to install all the necessary dependencies, and then you need to install docker. This project uses yarn
for dependency management, so the first step is to install yarn.
### Installing yarn
 ```shell
 npm install -g yarn
```
After installing yarn, we are now ready to install the remaining dependencies.
### Installing root dependencies
First, we will install the dependencies in the root directory. To do this, navigate to the root directory of
the repository in your terminal and run:
```shell
yarn install
```
### Installing frontend dependencies
Next, we will install the frontend dependencies. To do this, navigate to the `client` directory in your 
terminal and run:
```shell
yarn install
```
### Installing backend dependencies
Finally, we need to install the backend dependencies. To do this, navigate to the `server` directory in 
your terminal and run:
```shell
yarn install
```
### Installing docker
The easiest way to install docker is to follow the instructions at https://www.docker.com/products/docker-desktop/
## Running the code
When running the code, you can choose whether you want to run just the frontend, just the backend, or both
at the same time. For most purposes, it is recommended to run both. Another common way to run the code is 
run all the stories for the frontend React components. All of these scenarios are explained below.
### Running both the frontend and the backend
To run both the frontend and the backend, you will need docker installed. With docker installed,
navigate to the **root directory** of the repository, then run:
```shell
docker-compose up --build
```
### Running just the frontend
To run just the frontend, navigate to the `client` directory in your terminal and run:
```shell
yarn dev
```
### Running just the backend
To run just the backend, navigate to the `server` directory in your terminal and run:
```shell
yarn start:dev
```
### View all the component stories
To view the stories, navigate to the `client` directory in your terminal and run:
```shell
yarn storybook
```
