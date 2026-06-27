import { Fragment, useState, useEffect, useRef } from 'react';
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
  const allExecs = [...execInfo.vcs, ...execInfo.ocs];
  const totalCards = allExecs.length;

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const deckRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Deal the cards into the fan once the deck scrolls into view.
  useEffect(() => {
    const node = deckRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Drop the staggered entrance delay after the deal-in finishes so that later
  // hover/flip interactions stay snappy instead of lagging by the stagger time.
  useEffect(() => {
    if (!hasEntered) return undefined;
    const timeout = setTimeout(() => setEntranceDone(true), totalCards * 180 + 800);
    return () => clearTimeout(timeout);
  }, [hasEntered, totalCards]);

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

      <div className="card-deck-instructions">
        <p className="card-deck-instructions-text">
          Click on a card to view the executive&apos;s profile. Click again to flip the card over
          for more information.
        </p>
      </div>

      {/* Card Stacking Container */}
      <div
        ref={deckRef}
        className={`execs-deck-wrapper ${activeIndex !== null ? 'has-active-card' : ''} ${
          hasEntered ? 'is-dealt' : ''
        }`}
        style={{
          '--active-index': activeIndex !== null ? Number(activeIndex) : -1,
        }}
      >
        {allExecs.map((person, index) => {
          const midPoint = (totalCards - 1) / 2;
          const diff = index - midPoint;
          const absDiff = Math.abs(diff);

          const rotateAngle = isMobile ? diff * 5 : diff * 3;
          let translateX = isMobile ? diff * 7.5 : diff * 6.5;
          const translateY = isMobile ? absDiff * 0.25 : absDiff * 0.15;

          const isActive = activeIndex !== null && Number(activeIndex) === Number(index);
          const cardFlipped = isActive && isFlipped;

          // Fan reacts to hover (desktop, deck view only): the hovered card lifts
          // while its neighbours slide outward to make room for it.
          const deckHovered = hoverIndex !== null && activeIndex === null && !isMobile;
          const isHovered = deckHovered && hoverIndex === index;
          if (deckHovered && !isHovered) {
            translateX += Math.sign(index - hoverIndex) * 3.2;
          }

          let transform;
          if (!hasEntered) {
            // Pre-entrance: collapsed low + centred, ready to be dealt out.
            transform = 'rotate(0deg) translateX(0) translateY(18vw) scale(0.6)';
          } else if (isActive) {
            transform = `rotate(0deg) translateX(0) translateY(-6vw) scale(${
              isMobile ? 1.5 : 1.4
            })`;
          } else if (isHovered) {
            transform = `rotate(0deg) translateX(${translateX}vw) translateY(-2.5vw) scale(1.12)`;
          } else {
            transform = `rotate(${rotateAngle}deg) translateX(${translateX}vw) translateY(${translateY}vw)`;
          }

          const fanStyle = {
            '--index': index,
            zIndex: isActive ? 999 : isHovered ? 600 : 10 + index,
            transform,
            opacity: hasEntered ? 1 : 0,
            transitionDelay: entranceDone ? '0ms' : `${index * 180}ms`,
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
              onCardHover={() => setHoverIndex(index)}
              onCardLeave={() => setHoverIndex((current) => (current === index ? null : current))}
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
