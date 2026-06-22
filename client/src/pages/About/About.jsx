import { Fragment, useState } from 'react';
import './About.scss';

import { aboutUsInfo } from '../../util/about/aboutus';
import { execInfo } from '../../util/about/execs';

import newAboutLogo from '../../assets/about/F! Purple.png';
import { Header } from '../../components/text/Header/Header';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const PageAbout = () => {
  return (
    <>
      <div className="aboutus-page-components">
        <AboutUsSection className="header-section-top" />
        <AboutUsTextSection />
        <AboutUsExecCarousel />
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

const AboutUsExecCarousel = () => {
  const allExecs = [...execInfo.ocs, ...execInfo.vcs];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [animClass, setAnimClass] = useState(''); // Handles dynamic slide states
  const [displayIndex, setDisplayIndex] = useState(0);

  const currentExec = allExecs[displayIndex];

  // ➡️ Smooth Next Transition
  const handleNext = () => {
    if (sliding) return;
    setSliding(true);
    setIsFlipped(false);
    setAnimClass('slide-next-exit');

    setTimeout(() => {
      const next = (currentIndex + 1) % allExecs.length;
      setCurrentIndex(next);
      setDisplayIndex(next);
      setAnimClass('slide-next-enter');

      setTimeout(() => {
        setAnimClass('');
        setSliding(false);
      }, 350);
    }, 350);
  };

  // ⬅️ Smooth Prev Transition
  const handlePrev = () => {
    if (sliding) return;
    setSliding(true);
    setIsFlipped(false);
    setAnimClass('slide-prev-exit');

    setTimeout(() => {
      const prev = (currentIndex - 1 + allExecs.length) % allExecs.length;
      setCurrentIndex(prev);
      setDisplayIndex(prev);
      setAnimClass('slide-prev-enter');

      setTimeout(() => {
        setAnimClass('');
        setSliding(false);
      }, 350);
    }, 350);
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

      <div className="exec-carousel-stage">
        {/* Left Arrow */}
        <button
          className="exec-carousel-arrow exec-carousel-arrow-left"
          onClick={handlePrev}
          disabled={sliding}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path d="M16 19l-8-7 8-7" fill="#aaa" />
          </svg>
        </button>

        {/* Left Card Peek */}
        <div className="exec-carousel-side-card exec-carousel-side-card-left">
          <div className="exec-carousel-side-card-inner is-flipped-static">
            <div className="exec-carousel-side-back">
              <p className="exec-carousel-card-back-role">
                {allExecs[
                  (currentIndex - 1 + allExecs.length) % allExecs.length
                ].role.toUpperCase()}
              </p>
              <LazyLoadImage
                className="exec-carousel-card-image"
                alt={allExecs[(currentIndex - 1 + allExecs.length) % allExecs.length].name}
                effect="opacity"
                src={allExecs[(currentIndex - 1 + allExecs.length) % allExecs.length].image}
              />
              <div className="exec-carousel-name-band">
                <h3 className="exec-carousel-card-back-name script-font">
                  {allExecs[(currentIndex - 1 + allExecs.length) % allExecs.length].name}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Center Card Track */}
        <div className="exec-carousel-track">
          <div
            key={displayIndex}
            className={`exec-carousel-card ${isFlipped ? 'is-flipped' : ''} ${animClass}`}
            onClick={() => !sliding && setIsFlipped((f) => !f)}
          >
            <div className="exec-carousel-card-inner">
              {/* FRONT */}
              <div className="exec-carousel-card-front">
                <LazyLoadImage
                  className="exec-carousel-card-image"
                  alt={currentExec.name}
                  effect="opacity"
                  src={currentExec.image}
                />
                <div className="exec-carousel-name-band">
                  <h3 className="exec-carousel-card-back-name script-font">{currentExec.name}</h3>
                </div>
                <div className="exec-carousel-card-front-info">
                  <p className="exec-carousel-card-role-label">{currentExec.role.toUpperCase()}</p>
                  <p className="exec-carousel-card-discipline-label">{currentExec.discipline}</p>
                </div>
                <p className="exec-carousel-card-prompt">[Click to flip for bio]</p>
              </div>

              {/* BACK */}
              <div className="exec-carousel-card-back">
                <div className="exec-carousel-card-back-content">
                  <p className="exec-carousel-card-back-role">{currentExec.role.toUpperCase()}</p>
                  <LazyLoadImage
                    className="exec-carousel-card-image exec-carousel-card-image-small"
                    alt={currentExec.name}
                    effect="opacity"
                    src={currentExec.image}
                  />
                  <div className="exec-carousel-card-back-bio">
                    <p>{currentExec.description}</p>
                  </div>
                  <div className="exec-carousel-name-band">
                    <h3 className="exec-carousel-card-back-name script-font">{currentExec.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card Peek */}
        <div className="exec-carousel-side-card exec-carousel-side-card-right">
          <div className="exec-carousel-side-card-inner">
            <div className="exec-carousel-side-back">
              <p className="exec-carousel-card-back-role">
                {allExecs[(currentIndex + 1) % allExecs.length].role.toUpperCase()}
              </p>
              <LazyLoadImage
                className="exec-carousel-card-image"
                alt={allExecs[(currentIndex + 1) % allExecs.length].name}
                effect="opacity"
                src={allExecs[(currentIndex + 1) % allExecs.length].image}
              />
              <div className="exec-carousel-name-band">
                <h3 className="exec-carousel-card-back-name script-font">
                  {allExecs[(currentIndex + 1) % allExecs.length].name}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="exec-carousel-arrow exec-carousel-arrow-right"
          onClick={handleNext}
          disabled={sliding}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path d="M8 5l8 7-8 7" fill="#aaa" />
          </svg>
        </button>
      </div>

      <div className="exec-carousel-checker-strip exec-carousel-checker-strip-full" />
    </div>
  );
};

export { PageAbout };
