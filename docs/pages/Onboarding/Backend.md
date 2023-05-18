---
layout: default
title: Backend
parent: Onboarding
---

# Backend

The backend is comprised of a variety of systems and technologies. The application is a REST API created using Express.js that communicates with services such as a MongoDB for data storage, stripe for payments, and AWS (Amazon Web Services) Simple Email Service (SES)for sending dynamic emails to users. Additionally, Redis is used to hold session data to and to perform asynchronous tasks on the server side. The following will expand on the require skill set to use each of these technologies.

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

Express.js is a Node.js framework that allows users to create a "REST API". This means that the backend API will respond to HTTP requests such as `GET, POST, EDIT, DELETE` to specific routes such as `/users, /info, /announcement/create, ...`

### Middlewares

When a request is sent to a specific route it needs to be properly processed until the server can identify what the request is asking for to then provide it with the correct response or in the case of an invalid request, an error. The processing of the data is done through `middlewares`. These are functions that take the request data and modify it in specific ways so that a response can be formed. Some middlewares are pre-made and can be used installed through Node.js packages, for example, the `bodyParser` middleware is a package that takes the request data and parses the body of the request or the data that was sent along with it and places it into a JSON object. However you can also create your own middlewares, any function that takes in `(request, response, next)` as arguments can be a middleware. These functions will execute some code and either modify the `request` object and then call `next()` which will then pass that information to the next middleware. The `request` object continues to get modified by different middlewares until the final middleware terminates the request by changing the `status()` of the `response` object, The final middleware can also send along data or information back to the user by using `send()`.

Example middleware and usage:

```jsx
/**
 * Checks whether the user is signed in.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {*}
 */
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res
      .status(403)
      .send({ message: "Please sign in to access this route!" });
  }
};

app.get("/", checkLoggedIn, otherMiddleware, finalMiddleware);
```

You can see how in the above message the response is a `403` error if the user is not logged in. However, if the user is logged in the `next()` function is called to send the data to the next middleware.

### Routes & Routers

Each set of routes get their own router file. Inside each router file a specific route and HTTP request type are mapped to a certain service. To make the codebase more dynamic the connection between the routes and the services are expanded to go through a `controller`.

Example router:

```jsx
const express = require("express");
const { getTimeline } = require("../controllers/TimelineController");
const router = express.Router();

/**
 * @swagger
 * /timeline:
 *   get:
 *     summary: Get all the timeline events
 *     responses:
 *       '200':
 *         description: Successfully retrieved the timeline events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timelines:
 *                   type: array
 *                   items:
 *                     $ref: '#components/schemas/Timeline'
 */
router.get("/", getTimeline);

app.use("/timeline", router);
```

### Controllers

Controllers are specific middlewares used to perform some processing on the HTTP requests before they are sent to `services`. In the above example, `getTimeline` is one middleware from the timeline controller.

Example controller:

```jsx
const AnnouncementServices = require("../services/AnnouncementServices");

const AnnouncementController = {
  /**
   * Gets all announcements
   */
  async getAnnouncement(req, res, next) {
    try {
      const allAnnouncements = await AnnouncementServices.getAllAnnouncements();
      return res.status(200).send({ announcements: allAnnouncements });
    } catch (e) {
      next(e);
    }
  },

  /**
   * Gets all completed announcements of a user
   */
  async getCompletedAnnouncements(req, res, next) {
    const currentUser = req.user;
    try {
      const completedAnnouncements =
        await AnnouncementServices.getCompletedAnnouncements(currentUser);
      return res.status(200).send({ announcements: completedAnnouncements });
    } catch (e) {
      next(e);
    }
  },

  async otherMiddleware (req, res, next) {...},
};

module.exports = AnnouncementController;

```

### Services

Each service gets one or more file which directly works with the particular technology. However, although MongoDB is one service the majority of the service files use it since different parts of the website have their own section of the database. Each service file contains functions that communicate with their service without any interaction with the HTTP request. The functions return key pieces of information that was received from the service back to the controller.

Example service file:

```jsx
const SES = new SESv2Client({ region: "ca-central-1" });

const EmailServices = {
  /**
   * Create and save an email template
   * @param {String} templateName name of the new template
   * @param {String} html html body
   * @param {String} subject subject of the email
   * @param {String} text text body
   * @see {@link https://aws.amazon.com/blogs/messaging-and-targeting/introducing-email-templates-and-bulk-sending/} for the filling of `html` and `text`
   * @returns {Promise} promise
   */
  async createTemplate(templateName, html, subject, text) {
    const params = {
      TemplateContent: {
        Html: html,
        Subject: subject,
        Text: text,
      },
      TemplateName: templateName,
    };

    const command = new CreateEmailTemplateCommand(params);

    return SES.send(command);
  },

  /**
   * Send bulk personalized template emails
   * @param {Object[]} bulkEmailEntries an array containing arrays of email addresses
   * @param {String} templateName name of template used
   * @param {Object} defaultTemplateData defult data to be filled in the template
   * @param {String} fromAddress the email adress the email is being sent from
   * @returns {Promise} promise
   */
  async sendBulkTemplateEmail(
    bulkEmailEntries,
    templateName,
    defaultTemplateData,
    fromAddress
  ) {
    const params = {
      BulkEmailEntries: bulkEmailEntries.map((entry) => {
        return {
          Destination: {
            ToAddresses: [...entry],
          },
        };
      }),
      DefaultContent: {
        Template: {
          TemplateData: JSON.stringify(defaultTemplateData),
          TemplateName: templateName,
        },
      },

      FromEmailAddress: fromAddress,
    };

    const command = new SendBulkEmailCommand(params);

    return SES.send(command);
  },
};

module.exports = EmailServices;
```


## Redis 

### Bull


### Subscribers

## MongoDB

### Mongoose

### Models

## AWS SES

## Stripe
