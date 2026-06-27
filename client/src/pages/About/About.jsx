import { Fragment, useState, useEffect } from 'react';
import './About.scss';

import { aboutUsInfo } from '../../util/about/aboutus';
import { execInfo } from '../../util/about/execs';

import newAboutLogo from '../../assets/about/F! Purple.png';
import { Header } from '../../components/text/Header/Header';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ExecProfile } from './ExecProfile/ExecProfile';

const PageAbout = () => {
  return (
    <>
      <div className="aboutus-page-components">
        <AboutUsSection className="header-section-top" />
        <AboutUsTextSection />
        <AboutUsExecCardDeck />
      </div>
    </>
  );
};

const AboutUsSection = () => {
  // Simple layout mapping for the yellow grid layout (1 = yellow, 0 = purple)
  const yellowGridPattern = [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0];

  return (
    <Header>
      <div className="aboutus-hero">
        <div className="aboutus-hero-title">
          <p className="aboutus-hero-subtitle">What is...</p>
          <h1 className="aboutus-hero-main">
            <span className="script-font">F!rosh</span>
            <span className="block-font">WEEK?</span>
          </h1>
        </div>

        {/* Simplified background grid container */}
        <div className="aboutus-checkerboard-container">
          {/* The framed yellow accent block overlay */}
          <div className="yellow-accent-grid">
            {yellowGridPattern.map((isYellow, index) => (
              <div key={index} className={`yellow-tile ${isYellow ? 'yellow' : 'purple'}`} />
            ))}
          </div>
        </div>
      </div>
    </Header>
  );
};

const AboutUsTextSection = () => {
  return (
    <div className="aboutus-text-section">
      {aboutUsInfo.map((info, index) => (
        <Fragment key={info.title}>
          <div className="aboutus-text-column">
            <p className="aboutus-text-heading">{info.title}</p>
            <p className="aboutus-text-paragraph">{info.description}</p>
          </div>
          {index < aboutUsInfo.length - 1 && <div className="aboutus-text-divider" />}
        </Fragment>
      ))}
    </div>
  );
};

const AboutUsExecCardDeck = () => {
  const allExecs = [...execInfo.ocs, ...execInfo.vcs];
  const totalCards = allExecs.length;

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (index) => {
    if (activeIndex === index) {
      if (isFlipped) {
        // 💡 NEW LOGIC: If the card is already active AND flipped,
        // clicking it again returns it to the default unselected deck view!
        setActiveIndex(null);
        setIsFlipped(false);
      } else {
        // First click on an already active card flips it over
        setIsFlipped(true);
      }
    } else {
      // Clicking an unselected card pulls it to the center foreground in front view
      setActiveIndex(index);
      setIsFlipped(false);
    }
  };

  const closeDeckZoom = () => {
    setActiveIndex(null);
    setIsFlipped(false);
  };

  return (
    <div className="exec-carousel-section">
      <div className="exec-carousel-checker-row">
        <div className="exec-carousel-checker-strip" />
        <div className="exec-carousel-title-wrapper">
          <h1 className="exec-carousel-title script-font">The</h1>
          <h1 className="exec-carousel-title script-font">Executives</h1>
          <span className="exec-carousel-sparkle-title">✦</span>
          <span className="exec-carousel-sparkle-title exec-carousel-sparkle-title-2">✦</span>
        </div>
        <div className="exec-carousel-checker-strip" />
      </div>

      {/* Card Stacking Container */}
      <div
        className={`execs-deck-wrapper ${activeIndex !== null ? 'has-active-card' : ''}`}
        style={{
          '--active-index': activeIndex !== null ? Number(activeIndex) : -1,
        }}
      >
        {allExecs.map((person, index) => {
          const midPoint = (totalCards - 1) / 2;
          const diff = index - midPoint;
          const absDiff = Math.abs(diff);

          const rotateAngle = isMobile ? diff * 5 : diff * 3;
          const translateX = isMobile ? diff * 7.5 : diff * 6.5;
          const translateY = isMobile ? absDiff * 0.25 : absDiff * 0.15;

          const isActive = activeIndex !== null && Number(activeIndex) === Number(index);
          const cardFlipped = isActive && isFlipped;

          const fanStyle = {
            '--index': index,
            zIndex: isActive ? 999 : 10 + index,
            transform: isActive
              ? `rotate(0deg) translateX(0) translateY(-6vw) scale(${isMobile ? 1.5 : 1.4})`
              : `rotate(${rotateAngle}deg) translateX(${translateX}vw) translateY(${translateY}vw)`,
          };

          return (
            <ExecProfile
              key={person.name + index}
              style={fanStyle}
              image={person.image}
              name={person.name}
              role={person.role}
              discipline={person.discipline}
              roleDescription={person.description || person.roleDescription}
              exec={true}
              isActiveCard={isActive}
              isCardFlipped={cardFlipped}
              onCardSelect={() => handleCardClick(index)}
            />
          );
        })}
      </div>

      {activeIndex !== null && <div className="deck-backdrop-overlay" onClick={closeDeckZoom} />}

      <div className="exec-carousel-checker-strip exec-carousel-checker-strip-full" />
    </div>
  );
};

export { PageAbout };
