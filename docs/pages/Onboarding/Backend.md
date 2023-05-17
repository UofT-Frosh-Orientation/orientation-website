---
layout: default
title: Backend
parent: Onboarding
---

# Backend

The backend is comprised of a variety of systems and technologies. The application is a REST API created using Express.js that communicates with services such as a MongoDB for data storage, stripe for payments, and AWS (Amazon Web Services) Simple Email Service (SES)for sending dynamic emails to users. The following will expand on the require skill set to use each of these technologies. 

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


## Express.js

#### **To Get a solid understanding of Express.js and its inner workings watch the following videos**

- [35 Minute Express.js Tutorial](https://www.youtube.com/watch?v=SccSCuHhOw0)
- [REST API Explainer Video through Express.js](https://www.youtube.com/watch?v=-MTSQjw5DrM)
- [Middleware Explainer Video](https://www.youtube.com/watch?v=lY6icfhap2o)

Express.js is a Node.js framework that allows users to create a "REST API". This means that the backend API will respond to HTTP requests such as `GET, POST, EDIT,DELETE` to specific routes such as `/users, /info, ...`

Additionally, Redis is used to create `Subscribers` to perform asynchronous tasks on the server side.

### Routes & Routers

Each set of routes get their own router file. These are stored in `server/src/routes`. Inside each router file a specific route and HTTP request type are mapped to a certain service. However, to make the codebase more dynamic the connection between the routes and the services are expanded to go through a `controller`.

### Controllers 

Controllers are specific [middlewares](#to-get-a-solid-understanding-of-expressjs-and-its-inner-workings-watch-the-following-videos) used to perform some processing on the HTTP request before they are sent to [`services`](#services). 

### Services

Each service gets one or more file which directly works with the particular technology. For example, although MongoDB is one part of the tech stack   

### Subscribers 




## MongoDB

## AWS SES

## Stripe
