---
title: Getting Started
nav_order: 1
layout: home
---

# Orientation Website

![image](https://user-images.githubusercontent.com/50821962/195210327-87d8570e-d5c1-4704-be5b-eb2a609c0972.png)

Welcome to the University of Toronto's Frosh engineering orientation website, used by more than 1,000 incoming students each year. This website serves as the primary platform for registering and paying for orientation events, and offers a range of features including a main schedule, announcements, a personal profile page with the ability to edit, a Scunt (scavenger hunt) game, sign-up for the Frosh retreat, QR code scanning for automated registration on event day, and more.

This website is built using React, Express, Mongoose, Stripe, Docker, etc, and serves as a valuable resource for incoming students as they prepare for their first year at the University of Toronto. We hope this website helps to make the orientation process as smooth and enjoyable as possible.

This repository holds the source code for UofT Engineering's Orientation Website! This fullstack website is
split into two "packages". First, there is the frontend package, `client`, and second there is the backend
package `server`.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


## The Frosh 2T3 Web Team

- Soon to come!

## The Frosh 2T2 Web Team

### Webmasters

- [James Kokoska](https://github.com/jameskokoska), [Calum Murray](https://github.com/Cali0707), [Natalie Chan](https://github.com/natapokie)

### Associates

- [Farbod M](https://github.com/Freeassassin), [Luke Yang](https://github.com/lukewarmtemp), [Neo Lou](https://github.com/NeoLou), [Emily N](https://github.com/Emily9023)

### External Contributors

- [Matthew Wilson](https://github.com/MatthewGWilson), [Yash Vardhan](https://github.com/VardhanYash), [Akshat Mengi](https://github.com/akshatm2), [Andrew Kim](https://github.com/AndrewMinyoungKim)

## Getting started

**_Note: You will need to contact a project maintainer to get access to the `.env` environment variables and keys._**

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
