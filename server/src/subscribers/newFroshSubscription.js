const Queue = require('bull');
const EmailServices = require('../services/EmailServices');

const newFroshSubscription = new Queue('newFrosh', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

newFroshSubscription.process((job, done) => {
  console.log('started newFroshSubscription', job.data);
  try {
    // sending user creation email
    const result = EmailServices.sendRawEmail(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Congratulations!</title>
            <style>
            body {
              padding: 0;
              margin: 0;
            }
            header {
              background-color: #3d0f58;
              height: 40px;
            }
            .space-bar {
              background-color: #a77ad7;
              height: 10px;
            }
            footer {
              display: flex;
              background-color: #3d0f58;
              height: 100px;
              padding: 20px 7.5vw;
            }
            .social-icon {
              color: white;
              height: 3vw;
              padding: 0 5px;
            }
            .engsoc-logo {
              margin: auto 0;
              height: 5vw;
            }
            .frosh-logo {
              margin: auto 0;
              height: 5vw;
            }
            .content {
              padding: 0 7.5vw;
              background: radial-gradient(
                50% 42.09% at 50% 57.91%,
                rgba(113, 31, 139, 0.9) 43.23%,
                rgba(61, 15, 88, 0.75) 100%
              );
              color: white;
              overflow: hidden;
            }
            .text-container p {
              font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
              font-size: 20px;
              color: white;
            }
            a {
              color: #a77ad7;
            }
            .frosh-logo-main {
              display: block;
              margin: 0 auto;
              height: 25vh;
            }
            .socials-container {
              margin: auto;
            }
          </style>
        </head>
        <body>
          <header></header>
          <div class="space-bar"></div>
          <div class="content">
            <img
              class="frosh-logo-main"
              src="cid:froshmainlogooutline"
              alt="frosh logo"
            />
            <br />
            <div class="text-container">
              <h1>Hi ${job.data.preferredName ? job.data.preferredName : job.data.firstName},</h1>
              <p><b>Thank you for inputting your information on your Frosh Week 2T4 account!!</b></p>
              <p>
                This email is <b>NOT A CONFIRMATION OF REGISTRATION</b>. To confirm that you have registered (filled out your information AND paid the registration fee) 
                you will see your <b>group name and a QR code on your profile</b> when you login to your profile on <a href="http://orientation.skule.ca">orientation.skule.ca</a>. 
                This QR code will be important for signing into numerous events during F!rosh Week.
              </p>
              <br />
              <p>If you do not see these two items (group name and QR code), make sure you complete your payment to secure your spot at F!rosh Week 2T4! This can be found on the 
                payment page when you hit “Pay Now.”
              </p>
              <br />
              <p>
                To keep up to date with all the info you need to know before you arrive here for
                orientation, and to learn more about our meetup events running over the summer make sure
                to follow our Instagram page <a href="https://bit.ly/froshig">@froshweek</a> and <a href="https://discord.gg/RQrPQMYrHw">join our Discord community</a>!
              </p>
              <br />
              <p>
                If you have any questions or want to learn more feel free to email us at
                <a href="mailto:marketing@orientation.skule.ca">marketing@orientation.skule.ca!</a>
              </p>
              <br />
              <p>With HYPE, <br />F!rosh Week Orientation Committee</p>
            </div>
          </div>
          <div class="space-bar"></div>
          <footer>
            <img
              class="engsoc-logo"
              src="cid:engineeringsocietylogo"
              alt="University of Toronto Engineering Society Logo"
            />
            <div class="socials-container">
              <a href="https://bit.ly/froshig" class="social-link"
                ><img
                  src="cid:instagrambrands"
                  alt="instagram logo"
                  class="social-icon" /></a
              ><a href="https://discord.gg/RQrPQMYrHw" class="social-link"
                ><img src="cid:discordbrands" alt="discord logo" class="social-icon" /></a
              >
            </div>
            <img
              class="frosh-logo"
              src="cid:froshhardhatwhite"
              alt="F!rosh Week Hardhat Logo"
            />
          </footer>
        </body>
      </html>`,
      ' ',
      'Thank you for registering!',
      [
        {
          type: 'static',
          filePath: 'engineering-society-logo.png',
          contentDisposition: 'inline',
        },
        {
          type: 'static',
          filePath: 'frosh-main-logo-outline.png',
          contentDisposition: 'inline',
        },
        { type: 'static', filePath: 'frosh-hard-hat-white.png', contentDisposition: 'inline' },
        { type: 'static', filePath: 'whatsapp.png', contentDisposition: 'inline' },
        { type: 'static', filePath: 'discord-brands.png', contentDisposition: 'inline' },
        { type: 'non-static', content: job.data.file, contentDisposition: 'attachment' },
        { type: 'static', filePath: 'instagram-brands.png', contentDisposition: 'inline' },
      ],
      [job.data.email],
      'tech@orientation.skule.ca',
    );

    result.then((response) => {
      console.log('finished newFroshSubscription');
      console.log('email API response:', response);
    });

    done();
  } catch (error) {
    done(error);
  }
});

module.exports = newFroshSubscription;
