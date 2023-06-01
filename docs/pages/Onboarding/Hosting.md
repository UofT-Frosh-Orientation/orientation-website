---
layout: default
title: Hosting & Deployment
parent: Onboarding
nav_order: 6
---

# Hosting & Deployment

To get the website up and running fully on the World Wide Web you need to configure the hosting environment and deployment pipeline. For hosting needs we use [DigitalOcean](https://www.digitalocean.com/) and our development pipeline is set up through [GitHub Actions](https://docs.github.com/en/actions) and [Docker](https://www.docker.com/get-started/). 

## Hosting

Hosting on DigitalOcean can be both super simple and chaotic. If you know what to do, implementation of the hosting environment can be very straight forward. Here we'll attempt to outline all the steps taken to get to a valid hosting environment set up on DigitalOcean. 

### DigitalOcean Droplet

The Orientation website is hosted on a droplet with the marketplace Docker+Ubuntu image and on the Toronto servers. We used the $7/month performance level, however, we "resize" our droplet to have more processing power during heavy traffic times such as registration and the duration of F!rosh Week. This bumps it up to the $21/month subscription. Additionally, make sure to set up at least a couple SSH Keys to access your droplet.

After creating the droplet you need to get a reserved IP address for it. This should be free with the purchase of the droplet. The reserved IP can be configured to point to different droplets which can be useful by letting you by pass the timely DNS change process.

### DNS Records

The DNS Records are owned by the Engineering Society and are managed through Google Domains. However, the orientation.skule.ca hostname has been configured to be fully managed by DigitalOcean. This helps minimize the need to communicate with the EngSoc Webmaster / Sys Admin as you can fully manage everything from DigitalOcean. However, this can be a double edged sword as you might mess up the DNS records and cause the Email service to go down for 2 days. Totally didn't happen to me.

Here is a quick overview of the DNS records in use:

- `A`   records are used to point a hostname to an IP address. These should be configured to point to the reserved IPs from above.
- `MX`  records are used to navigate the email service. They should point to the Gmail servers. These records are standard and usually nothing will need to change. 
- `CNAME`   records can be used to create an alias. Basically when you make a call to an aliased hostname it will actually go to a different one.
- `NS`  records are used to determine which servers are in charge of managing the records for a hostname. These should be pointing to the DigitalOcean nameservers to make sure that our records are valid.
### Nginx

Nginx is used to direct traffic within the DigitalOcean droplet. You can use it to ensure that different services are mapped properly. Additionally, you can use it to create a secure connection using HTTPS. The setup procedure is very simple just follow these articles written by the DigitalOcean staff. 

- [Initial Server Setup](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04#if-the-root-account-uses-ssh-key-authentication)

- [How To Install Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04#step-5-setting-up-server-blocks-recommended)

- [How To Secure Nginx with Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)


{: .new-important }
The Nginx setup guide shows you how to set it up to serve static content. However we use Nginx to direct to proper ports and applications. You will be able to find the necessary Nginx config files in the `deployment-environments` repository.

## Deployment

To deploy the project to the DigitalOcean server you will need to create production ready forms of the codebase and then upload them. To do this in a streamlined fashion we use Docker to containerize our code and then upload it to a registry on DigitalOcean. This is all done through GitHub Actions which help run all of the processes in the background.

### GitHub Actions

The GitHub Actions are all the files under `./github/workflows`. They are configured to do things such as:

- Run tests
- Deploy code to hosting
- Update the GitHub Pages website

The deployment actions create productions builds of the codebase and upload it to the Docker Registry. From there a deployment script is called to run the `docker-compose` commands needed to start the project.

### Docker Registry

The Docker Registry holds all the Docker images that are created by the GitHub actions. It is hosted by DigitalOcean and is a private registry that requires access keys to read/write to. We use the $5/month version that gives us enough space and repositories to hold all of our data.

{: .new-important }
Be sure to delete older images as they will build up and fill up the storage which can use you to not be able to update the website.