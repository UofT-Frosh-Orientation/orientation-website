const Queue = require('bull');
const EmailServices = require('../services/EmailServices');

const passwordResetSubscription = new Queue('passwordReset', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

passwordResetSubscription.process(async (job, done) => {
  console.log('New job');
  console.log(job.data);
  console.log(typeof job.data.token);
  const { token, email } = job.data;
  console.log(email);
  const resetLink = `${process.env.CLIENT_BASE_URL}/password-reset/${token}`;
  try {
    const result = EmailServices.sendRawEmail(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Password Reset</title>
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
              height: 0px;
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
            <img class="frosh-logo-main" src="cid:2T6logo" alt="frosh logo" />
            <div class="text-container">
              <p>
                Please access the following URL to proceed with changing your password.
              </p>
              <p>
                URL: 
                <a href="${resetLink}" style="color: #ffc600; text-decoration: underline;">${resetLink}</a>
              </p>
              <p>
                If you do not know why you have received this e-mail, please delete it.
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
              <a href="https://discord.gg/yZvTXC47n" class="social-link">
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
      'Password Reset',
      [
        {
          type: 'static',
          filePath: 'engineering-society-logo.png',
          contentDisposition: 'inline',
        },
        {
          type: 'static',
          filePath: '2T6logo.png',
          contentDisposition: 'inline',
        },
        { type: 'static', filePath: 'frosh-hard-hat-white.png', contentDisposition: 'inline' },
        // { type: 'static', filePath: 'whatsapp.png', contentDisposition: 'inline' },
        { type: 'static', filePath: 'discord-brands.png', contentDisposition: 'inline' },
        // { type: 'non-static', content: job.data.file, contentDisposition: 'attachment' },
        { type: 'static', filePath: 'instagram-brands.png', contentDisposition: 'inline' },
      ],
      [job.data.email],
      'tech@orientation.skule.ca',
    );

    result.then((response) => {
      console.log('finished passwordResetSubscription');
      console.log('email API response:', response);
    });

    done();
  } catch (error) {
    done(error);
  }
});

module.exports = passwordResetSubscription;
