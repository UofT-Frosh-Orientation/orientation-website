import React, { useEffect, useRef, useState } from 'react';
import './ComingSoon.scss';

import { Minesweeper } from './Minesweeper';
import { useEasterEggs, RecycleBinWindow, NotepadWindow, BlueScreen } from './EasterEggs';

// Committed "coming soon" assets (assets/intial)
import MyComputerIcon from '../../../assets/intial/MyComputer.png';
import StartIcon from '../../../assets/intial/Start.png';
import PaintWindowWide from '../../../assets/intial/Frame_Wide.png';
import PaintWindow from '../../../assets/intial/Frame.png';

// Reused project assets
import DiscordIcon from '../../../assets/social/discord-brands.svg';
import InstagramIcon from '../../../assets/social/instagram_icon.png';
import FroshLogo from '../../../assets/logo/2T6logo_1.png';
import RecyclingBinIcon from '../../../assets/intial/recycling-bin.png';

import { PhotoCarousel } from './PhotoCarousel';

// F!rosh photos for the two "Paint" windows. Each frame has its OWN folder so
// they can show different sets (no duplicates across windows). Every image in a
// folder is collected automatically — just drop files in, no code changes. See
// each folder's README.
const FROSH_PHOTOS_WIDE = Object.values(
  import.meta.glob('../../../assets/intial/frosh-photos-wide/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    import: 'default',
  }),
);
const FROSH_PHOTOS_NARROW = Object.values(
  import.meta.glob('../../../assets/intial/frosh-photos-narrow/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    import: 'default',
  }),
);

// ===========================================================================
// CANVAS + LAYOUT
// ---------------------------------------------------------------------------
// The desktop is drawn on a fixed STAGE_WIDTH x STAGE_HEIGHT canvas, then the
// whole canvas is scaled to fit the browser (contain) and centered above the
// taskbar — so it never crops and the spacing stays balanced at any size.
//
// To ARRANGE the desktop, edit the {x, y} values in LAYOUT below. Each entry is
// the top-left position of that component on the canvas (in canvas pixels, 0,0 =
// top-left). Windows move as a whole — their insides follow their {x, y}.
// ===========================================================================
const STAGE_WIDTH = 1280;
const STAGE_HEIGHT = 790;
const TASKBAR_HEIGHT = 36;

const LAYOUT = {
  // Desktop icons (left column)
  iconMyComputer: { x: -90, y: 30 },
  iconRecyclingBin: { x: -90, y: 120 },
  iconDiscord: { x: -90, y: 210 },
  iconInstagram: { x: -90, y: 300 },

  // Windows / badges (each moves as one unit)
  mainWindow: { x: 210, y: 30 },
  paintWide: { x: 26, y: 456 },
  paintNarrow: { x: 616, y: 487 },
  minesweeper: { x: 1000, y: 416 },
  logo: { x: 1100, y: 20 },
};

// At/below this viewport width, render the dedicated mobile layout instead of
// the scaled desktop.
const MOBILE_BREAKPOINT = 600;

const formatTime = (date) =>
  date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

// Helper: absolute-position style from a LAYOUT entry (+ optional size).
const at = ({ x, y }, width, height) => ({
  position: 'absolute',
  left: x,
  top: y,
  ...(width != null ? { width } : {}),
  ...(height != null ? { height } : {}),
});

const ComingSoon = () => {
  const [scale, setScale] = useState(1);
  const [time, setTime] = useState(formatTime(new Date()));
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false,
  );
  const stageRef = useRef(null);

  // ----- Easter eggs -----
  // XYZZY → Minesweeper reveals mines. A counter (not a boolean) so each XYZZY
  // is a fresh one-shot trigger; the board owns the cheat and clears it on a new
  // game (otherwise a sticky `true` would re-reveal mines every reset).
  const [cheatTrigger, setCheatTrigger] = useState(0);
  const [binOpen, setBinOpen] = useState(false); // Recycle Bin window
  const [fileOpen, setFileOpen] = useState(false); // "do not touch.txt" notepad
  const [bsod, setBsod] = useState(false); // Blue Screen of Death
  const [konami, setKonami] = useState(false); // brief Konami flash

  // Konami payoff: play the sound (drop the file at client/public/konami.mp3)
  // and flash the desktop. Missing/blocked audio fails silently.
  const konamiAudio = useRef(null);
  const fireKonami = () => {
    setKonami(true);
    setTimeout(() => setKonami(false), 1200);
    try {
      if (!konamiAudio.current) konamiAudio.current = new Audio('/audio.mp3');
      konamiAudio.current.currentTime = 0;
      konamiAudio.current.play().catch(() => {});
    } catch (err) {
      /* no-op: audio is optional */
    }
  };

  useEasterEggs({
    onKonami: fireKonami,
    onXyzzy: () => setCheatTrigger((n) => n + 1),
    onCrash: () => setBsod(true),
  });

  // Scale the fixed-size stage to fit the viewport (contain — never crops).
  useEffect(() => {
    const updateScale = () => {
      const next = Math.min(
        window.innerWidth / STAGE_WIDTH,
        (window.innerHeight - TASKBAR_HEIGHT) / STAGE_HEIGHT,
      );
      setScale(next);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Switch between the desktop and mobile layouts on resize.
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Live taskbar clock.
  useEffect(() => {
    const timer = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  const windowButtons = (
    <div className="cs-winbtns">
      <div className="cs-winbtn">_</div>
      <div className="cs-winbtn">▢</div>
      <div className="cs-winbtn">✕</div>
    </div>
  );

  // ----- Draggable windows -----
  // The 4 windows can be dragged around. They live inside the scaled stage, so
  // pointer movement (screen px) is divided by the current scale to convert it
  // to canvas px — otherwise the window drifts away from the cursor.
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const [winPos, setWinPos] = useState({
    mainWindow: LAYOUT.mainWindow,
    paintWide: LAYOUT.paintWide,
    paintNarrow: LAYOUT.paintNarrow,
    minesweeper: LAYOUT.minesweeper,
  });
  const [winZ, setWinZ] = useState({ mainWindow: 1, paintWide: 2, paintNarrow: 3, minesweeper: 4 });
  const [draggingKey, setDraggingKey] = useState(null);
  const zTopRef = useRef(4);

  const startDrag = (key) => (e) => {
    e.preventDefault();
    // Bring this window to the front.
    zTopRef.current += 1;
    setWinZ((z) => ({ ...z, [key]: zTopRef.current }));
    setDraggingKey(key);

    const startX = e.clientX;
    const startY = e.clientY;
    const orig = winPos[key];

    const onMove = (ev) => {
      const s = scaleRef.current || 1;
      setWinPos((p) => ({
        ...p,
        [key]: {
          x: Math.round(orig.x + (ev.clientX - startX) / s),
          y: Math.round(orig.y + (ev.clientY - startY) / s),
        },
      }));
    };
    const onUp = () => {
      setDraggingKey(null);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  // Frame (position + z-index + class) for a window, WITHOUT a drag handler.
  // Used directly when only part of the window should drag (e.g. Minesweeper's
  // title bar), so the body stays interactive.
  const winFrame = (key, width, height, baseClass = '') => ({
    className: `${baseClass} cs-window${draggingKey === key ? ' cs-window--dragging' : ''}`.trim(),
    style: { ...at(winPos[key], width, height), zIndex: winZ[key] },
  });

  // Props for a whole-window drag handle (the whole window moves on drag).
  const winProps = (key, width, height, baseClass = '') => ({
    ...winFrame(key, width, height, `${baseClass} cs-draghandle`.trim()),
    onPointerDown: startDrag(key),
  });

  // ----- Main "F!rosh 2T6.exe" window (positioned as one unit) -----
  // Children are positioned RELATIVE to the window, so moving the window moves
  // everything together.
  const mainWindow = (
    <div {...winProps('mainWindow', 820, 460, 'cs-raised')}>
      {/* title bar */}
      <div
        className="cs-titlebar"
        style={{ position: 'absolute', left: 2, top: 2, width: 816, height: 22, padding: '0 4px' }}
      >
        <span style={{ color: 'var(--cs-gold)', fontSize: 18 }}>F!rosh 2T6.exe</span>
        {windowButtons}
      </div>
      {/* menu bar */}
      <div
        style={{
          position: 'absolute',
          left: 2,
          top: 24,
          width: 816,
          height: 18,
          display: 'flex',
          alignItems: 'center',
          color: '#000',
          fontSize: 15,
          paddingLeft: 9,
        }}
      >
        <span style={{ whiteSpace: 'pre' }}>
          File&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;View&nbsp;&nbsp;&nbsp;&nbsp;Help
        </span>
      </div>

      {/* Properties panel */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 40,
          width: 200,
          height: 420,
          boxShadow: 'inset -1px -1px 0 0 #fff, inset 1px 1px 0 0 #808080',
          background: '#c0c0c0',
        }}
      />
      <div style={{ position: 'absolute', left: 12, top: 48, fontSize: 17, color: '#000' }}>
        Properties
      </div>

      {/* Name */}
      <div style={{ position: 'absolute', left: 12, top: 81, fontSize: 14, color: '#212121' }}>
        Name:
      </div>
      <div
        className="cs-sunken cs-field"
        style={{ position: 'absolute', left: 82, top: 80, width: 108, height: 16 }}
      >
        F!rosh Week 2T6
      </div>

      {/* Theme */}
      <div style={{ position: 'absolute', left: 12, top: 113, fontSize: 14, color: '#212121' }}>
        Theme:
      </div>
      <div
        className="cs-sunken cs-field"
        style={{ position: 'absolute', left: 82, top: 112, width: 108, height: 16 }}
      >
        Retro
      </div>

      {/* ETA */}
      <div style={{ position: 'absolute', left: 12, top: 145, fontSize: 14, color: '#212121' }}>
        ETA:
      </div>
      <div
        className="cs-sunken cs-field"
        style={{ position: 'absolute', left: 82, top: 144, width: 108, height: 16 }}
      >
        31 August 2026
      </div>

      {/* Progress */}
      <div style={{ position: 'absolute', left: 11, top: 200, fontSize: 17, color: '#000' }}>
        Progress:
      </div>
      <div
        className="cs-sunken cs-progress"
        style={{ position: 'absolute', left: 10, top: 218, width: 182, height: 16 }}
      >
        {Array.from({ length: 13 }).map((_, i) => (
          <span key={i} className="cs-progress-block" />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 10,
          top: 238,
          fontSize: 17,
          color: '#212121',
          lineHeight: 1.15,
        }}
      >
        Extracting Hype...
        <br />
        67% complete
      </div>

      {/* Coming Soon dialog */}
      <div
        className="cs-sunken"
        style={{
          position: 'absolute',
          left: 206,
          top: 48,
          width: 604,
          height: 100,
          background: '#fff',
        }}
      />
      <span
        role="img"
        aria-label="warning"
        style={{ position: 'absolute', left: 224, top: 58, fontSize: 32 }}
      >
        ⚠️
      </span>
      <div style={{ position: 'absolute', left: 270, top: 54, fontSize: 40, color: '#000' }}>
        Coming Soon!
      </div>
      <div
        style={{
          position: 'absolute',
          left: 270,
          top: 101,
          fontSize: 20,
          color: '#212121',
          lineHeight: 1.2,
        }}
      >
        The official F!rosh Week 2T6 website is being installed.
        <br />
        Bookmark this page and to join us when registration drops.
      </div>
      <div
        className="cs-button"
        style={{ position: 'absolute', left: 208, top: 158, width: 50, height: 22 }}
      >
        OK
      </div>
      <div
        className="cs-button is-disabled"
        style={{ position: 'absolute', left: 280, top: 158, width: 139, height: 22 }}
      >
        Register (locked)
      </div>

      {/* Hero panel */}
      <div
        className="cs-hero"
        style={{ position: 'absolute', left: 206, top: 192, width: 604, height: 258 }}
      >
        <h1>F!ROSH 2T6</h1>
        <p>U OF T ENGINEERING SKULE™</p>
      </div>
    </div>
  );

  // ----- Desktop layer (icons + windows) -----
  const desktop = (
    <>
      {/* Desktop icons */}
      <div className="cs-desktop-icon" style={at(LAYOUT.iconMyComputer)}>
        <img src={MyComputerIcon} alt="My Computer" />
        <span>My Computer</span>
      </div>
      {/* Recycling Bin — double-click to open it (hides the "do not touch" egg). */}
      <div
        className="cs-desktop-icon cs-icon-button"
        style={at(LAYOUT.iconRecyclingBin)}
        onClick={() => setBinOpen(true)}
        onDoubleClick={() => setBinOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setBinOpen(true)}
      >
        {/* The image has lots of transparent padding, so it gets a bigger box
            (.cs-recycle-icon) to visually match the other icons. */}
        <img className="cs-recycle-icon" src={RecyclingBinIcon} alt="Recycling Bin" />
        <span>Recycling Bin</span>
      </div>
      <a
        className="cs-desktop-icon cs-link"
        href="https://discord.gg/Fnxr7tp34E"
        target="_blank"
        rel="noreferrer"
        style={at(LAYOUT.iconDiscord)}
      >
        <img src={DiscordIcon} alt="" />
        <span>Discord.exe</span>
      </a>
      <a
        className="cs-desktop-icon cs-link"
        href="https://bit.ly/froshig"
        target="_blank"
        rel="noreferrer"
        style={at(LAYOUT.iconInstagram)}
      >
        <img src={InstagramIcon} alt="" />
        <span>Instagram.exe</span>
      </a>

      {/* Main window */}
      {mainWindow}

      {/* Paint window (wide) */}
      <div {...winProps('paintWide', 442, 326)}>
        <img
          src={PaintWindowWide}
          alt="f!rosh - Paint"
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
        <PhotoCarousel
          photos={FROSH_PHOTOS_WIDE}
          emptyHint="assets/intial/frosh-photos-wide"
          style={{ position: 'absolute', left: 12, top: 30, width: 418, height: 286 }}
        />
      </div>

      {/* Paint window (narrow) */}
      <div {...winProps('paintNarrow', 338, 292)}>
        <img
          src={PaintWindow}
          alt="f!rosh - Paint"
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
        <PhotoCarousel
          photos={FROSH_PHOTOS_NARROW}
          emptyHint="assets/intial/frosh-photos-narrow"
          style={{ position: 'absolute', left: 12, top: 28, width: 314, height: 252 }}
        />
      </div>

      {/* Minesweeper (playable; drags from its title bar only) */}
      <Minesweeper
        frame={winFrame('minesweeper', null, null, 'cs-raised')}
        onDragStart={startDrag('minesweeper')}
        cheatTrigger={cheatTrigger}
      />

      {/* Easter-egg windows: Recycle Bin → "do not touch.txt" */}
      {binOpen && (
        <RecycleBinWindow
          style={{ position: 'absolute', left: 360, top: 170, width: 340, zIndex: 100 }}
          onOpenFile={() => setFileOpen(true)}
          onClose={() => setBinOpen(false)}
        />
      )}
      {fileOpen && (
        <NotepadWindow
          style={{ position: 'absolute', left: 470, top: 250, width: 470, zIndex: 110 }}
          onClose={() => setFileOpen(false)}
        />
      )}

      {/* Logo. The two numbers below are its width/height — change them to
          resize. If it clips off the right edge, lower LAYOUT.logo.x. */}
      <div className="cs-logo" style={at(LAYOUT.logo, 160, 160)}>
        <img src={FroshLogo} alt="F!rosh Week logo" />
      </div>
    </>
  );

  return (
    <div
      className={`coming-soon${draggingKey ? ' cs-grabbing' : ''}${konami ? ' cs-konami' : ''}`}
      style={{ '--cs-taskbar-h': `${TASKBAR_HEIGHT}px` }}
    >
      {isMobile ? (
        /* ---- Mobile layout (stacked + readable) ---- */
        <div className="coming-soon__mobile">
          <div className="cs-m-logo">
            <img src={FroshLogo} alt="F!rosh Week logo" />
          </div>

          <div className="cs-m-window cs-raised">
            <div className="cs-m-titlebar cs-titlebar">
              <span className="cs-m-title">F!rosh 2T6.exe</span>
              {windowButtons}
            </div>

            <div className="cs-m-body">
              <div className="cs-m-hero">
                <h1>F!ROSH 2T6</h1>
                <p>U OF T ENGINEERING SKULE™</p>
              </div>

              <div className="cs-m-heading">
                <span role="img" aria-label="warning">
                  ⚠️
                </span>
                Coming Soon!
              </div>
              <p className="cs-m-text">
                The official F!rosh Week 2T6 website is being installed. Bookmark this page to join
                us when registration drops.
              </p>

              <div className="cs-m-eta">ETA: 31 August 2026</div>

              <div className="cs-m-progress-row">
                <div className="cs-sunken cs-progress cs-m-progressbar">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className="cs-progress-block" />
                  ))}
                </div>
                <span className="cs-m-progresslabel">Extracting Hype... 67% complete</span>
              </div>

              <div className="cs-m-socials">
                <a
                  className="cs-m-social cs-raised"
                  href="https://discord.gg/Fnxr7tp34E"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={DiscordIcon} alt="" />
                  Discord
                </a>
                <a
                  className="cs-m-social cs-raised"
                  href="https://bit.ly/froshig"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={InstagramIcon} alt="" />
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="cs-m-credit">Made with 💜 by Parth and Ablah</div>
        </div>
      ) : (
        /* ---- Scaled desktop stage (everything above the taskbar) ---- */
        <div className="coming-soon__stage-wrap">
          <div
            className="coming-soon__stage"
            ref={stageRef}
            style={{ transform: `scale(${scale})`, '--cs-scale': scale }}
          >
            {desktop}
          </div>
        </div>
      )}

      {/* ---- Taskbar (full viewport width, fixed to bottom) ---- */}
      <div className="coming-soon__taskbar cs-raised">
        <img src={StartIcon} alt="" className="cs-taskbtn--start" />
        {!isMobile && (
          <>
            <div className="cs-taskbtn cs-sunken cs-taskbtn--active">📁 F!rosh 2T6.exe</div>
            <div className="cs-taskbtn cs-raised cs-taskbtn--credit">
              Made with 💜 by Parth and Ablah
            </div>
          </>
        )}
        <div className="cs-taskbar-spacer" />
        <div className="cs-clock cs-sunken">
          <span role="img" aria-label="sound">
            🔊
          </span>
          {time}
        </div>
      </div>

      {/* Blue Screen of Death — fires when the decoded secret word is typed. */}
      {bsod && <BlueScreen onDismiss={() => setBsod(false)} />}
    </div>
  );
};

export { ComingSoon };
