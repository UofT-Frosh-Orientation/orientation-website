import './LandingPageUzma.scss';
import MainFroshLogo from '../assets/logo/frosh-main-logo-with-bg.svg';

const LandingPageUzma = () => {
  return (
    <div className="landing-page-header">
      <div className="landing-page-header-text">
        <img className="icon-logo" src={MainFroshLogo} alt="frosh logo"></img>
        <h2>Stay tuned...</h2>
        <h3>The F!rosh team cannot wait to share this with you! </h3>
      </div>
    </div>
  );
};

export default LandingPageUzma;
