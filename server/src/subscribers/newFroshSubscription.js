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
          <title>Thank you for registering!</title>
          <style>
            body {
              padding: 0;
              margin: 0;
            }
            header {
              background-color: #382159;
              height: 40px;
            }
            .space-bar {
              background-color: #382159;
              height: 10px;
            }
            footer {
              display: flex;
              background-color: #1f1033;
              height: 100px;
              padding: 20px 7.5vw;
            }
            .social-icon {
              height: 32px;
              padding: 0 5px;
            }
            .social-link {
              margin-left: 25px;
            }
            .engsoc-logo {
              margin: auto 0;
              height: 50px;
            }
            .frosh-logo {
              margin: auto 0;
              height: 50px;
            }
            .content {
              padding: 60px 7.5vw;
              background-color: #382159;
              color: #dfcdf3;
              overflow: hidden;
              font-family: Arial, sans-serif;
            }
            .text-container p {
              font-size: 16px;
              color: #dfcdf3;
              line-height: 1.6;
            }
            a {
              color: #ffc600;
            }
            .frosh-logo-main {
              display: block;
              margin: 0 auto 30px;
              height: 180px;
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
            <img class="frosh-logo-main" src="cid:froshmainlogooutline" alt="frosh logo" />
            <div class="text-container">
              <p>Hi ${job.data.preferredName ? job.data.preferredName : job.data.firstName},</p>
              <p>
                Thank you for inputting your information on your F!rosh Week 2T5 account.
              </p>
              <p>
                This email is <b>not</b> a confirmation that your registration is complete.
                To confirm that you have completed registration (i.e. filled out your
                information <u>and</u> paid the registration fee), make sure you see your
                <b>group name and a QR code on your profile</b> when you log in to
                <a href="http://orientation.skule.ca" style="color: #ffc600; text-decoration: underline;">orientation.skule.ca</a>.
                This QR code will be important for signing into numerous events during
                F!rosh Week.
              </p>
              <p>
                If you do not see these two items (group name and QR code), make sure you complete your payment to secure your spot at F!rosh Week 2T5! If you have not yet paid,
                the payment button will be at the top of your profile page. If you are having trouble finding this button, please let us know at
                <a href="mailto:tech@orientation.skule.ca" style="color: #ffc600; text-decoration: underline;">tech@orientation.skule.ca</a>.
              </p>
              <p>
                To stay up to date on all the info you need before you arrive, and to learn more about UofT, make sure to follow our
                <a href="https://bit.ly/froshig" style="color: #ffc600; text-decoration: underline;">Instagram page</a> and
                <a href="https://discord.gg/RQrPQMYrHw" style="color: #ffc600; text-decoration: underline;">join our Discord community</a>!
              </p>
              <p>
                If you have any questions or want to learn more, feel free to email us at
                <a href="mailto:relations@orientation.skule.ca" style="color: #ffc600; text-decoration: underline;">relations@orientation.skule.ca</a>.
              </p>
              <p>
                With HYPE,<br />
                F!rosh Week Orientation Committee
              </p>
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
              <a href="https://bit.ly/froshig" class="social-link">
                <img src="cid:instagrambrands" alt="instagram logo" class="social-icon" />
              </a>
              <a href="https://discord.gg/RQrPQMYrHw" class="social-link">
                <img src="cid:discordbrands" alt="discord logo" class="social-icon" />
              </a>
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
        // { type: 'static', filePath: 'whatsapp.png', contentDisposition: 'inline' },
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
