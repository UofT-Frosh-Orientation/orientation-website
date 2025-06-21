import './UzmaLanding.scss';
import MainFroshLogo from '../../../assets/logo/frosh-main-logo-with-bg.svg';
import InstagramLogo from '../../../assets/social/instagram_icon.png';

export const UzmaLanding = () => {
  return (
    <div className="landing-page-uzma-header">
      <div className="landing-page-uzma-header-text">
        <img className="landing-page-uzma-icon" src={MainFroshLogo} alt="frosh logo"></img>
        <h2>Stay tuned...</h2>
        <h3>
          The F!rosh team cannot wait to share this with you! Meanwhile, follow us on Instagram!
        </h3>

        <a href="https://www.instagram.com/froshweek/" target="_blank" rel="noreferrer">
          <img
            src={InstagramLogo}
            className="landing-page-uzma-instagram-logo"
            alt="Instagram logo links to F!rosh Instagram page"
          />
        </a>
        <p>F!rosh Week</p>
        <a href="https://www.instagram.com/froshnomore/" target="_blank" rel="noreferrer">
          <img
            src={InstagramLogo}
            className="landing-page-uzma-instagram-logo"
            alt="Instagram logo links to F!rosh Instagram page"
          />
        </a>
        <p>Leedurs Page</p>
      </div>
    </div>
  );
};
