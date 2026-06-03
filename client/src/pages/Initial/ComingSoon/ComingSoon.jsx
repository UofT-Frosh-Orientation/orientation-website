import React, { useEffect, useRef, useState } from 'react';
import './ComingSoon.scss';

// Committed "coming soon" assets (assets/intial)
import MyComputerIcon from '../../../assets/intial/MyComputer.png';
import StartIcon from '../../../assets/intial/Start.png';
import MinesweeperWindow from '../../../assets/intial/minesweeper.png';
import PaintWindowWide from '../../../assets/intial/Frame_Wide.png';
import PaintWindow from '../../../assets/intial/Frame.png';

// Reused project assets
import DiscordIcon from '../../../assets/social/discord-brands.svg';
import InstagramIcon from '../../../assets/social/instagram_icon.png';
import FroshLogo from '../../../assets/logo/main-logo-2T5.png';

// The desktop is authored on a fixed 1280x790 canvas (the area above the
// taskbar); everything inside the stage is positioned with the exact Figma
// coordinates and the whole stage is scaled to fit the viewport. The taskbar
// lives outside the stage so it can always span the full screen width.
const STAGE_WIDTH = 1280;
const STAGE_HEIGHT = 790;
const TASKBAR_HEIGHT = 36;

// Vertical position of the whole desktop, in screen pixels. Positive pushes it
// DOWN, negative pulls it UP (past the empty top of the canvas). The canvas has
// ~60px of empty space above the first elements, so negative values are the way
// to tighten the top gap. Tweak to taste.
const STAGE_OFFSET_Y = -30;

const formatTime = (date) =>
  date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

const ComingSoon = () => {
  const [scale, setScale] = useState(1);
  const [time, setTime] = useState(formatTime(new Date()));
  const stageRef = useRef(null);

  // Scale the fixed-size stage to fit the viewport (contain — never crops).
  useEffect(() => {
    const updateScale = () => {
      // Only reserve extra height for a positive (downward) offset.
      const reserved = TASKBAR_HEIGHT + Math.max(0, STAGE_OFFSET_Y);
      const next = Math.min(
        window.innerWidth / STAGE_WIDTH,
        (window.innerHeight - reserved) / STAGE_HEIGHT,
      );
      setScale(next);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
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

  return (
    <div className="coming-soon" style={{ '--cs-taskbar-h': `${TASKBAR_HEIGHT}px` }}>
      {/* ---- Scaled desktop stage (everything above the taskbar) ---- */}
      <div className="coming-soon__stage-wrap">
        <div
          className="coming-soon__stage"
          ref={stageRef}
          style={{ transform: `scale(${scale})`, marginTop: STAGE_OFFSET_Y }}
        >
          {/* ---- Desktop icons ---- */}
          <div className="cs-desktop-icon" style={{ left: 18, top: 76 }}>
            <img src={MyComputerIcon} alt="My Computer" />
            <span>My Computer</span>
          </div>
          <div className="cs-desktop-icon" style={{ left: 18, top: 162 }}>
            <span className="cs-emoji" role="img" aria-label="Recycling Bin">
              🗑
            </span>
            <span>Recycling Bin</span>
          </div>
          <a
            className="cs-desktop-icon cs-link"
            href="https://discord.gg/Fnxr7tp34E"
            target="_blank"
            rel="noreferrer"
            style={{ left: 18, top: 250 }}
          >
            <img src={DiscordIcon} alt="" />
            <span>Discord.exe</span>
          </a>
          <a
            className="cs-desktop-icon cs-link"
            href="https://bit.ly/froshig"
            target="_blank"
            rel="noreferrer"
            style={{ left: 18, top: 340 }}
          >
            <img src={InstagramIcon} alt="" />
            <span>Instagram.exe</span>
          </a>

          {/* ---- Main window: F!rosh 2T6.exe ---- */}
          {/* window body */}
          <div
            className="cs-raised cs-abs"
            style={{ left: 210, top: 70, width: 820, height: 460 }}
          />
          {/* title bar */}
          <div
            className="cs-titlebar cs-abs"
            style={{ left: 212, top: 72, width: 816, height: 22, padding: '0 4px' }}
          >
            <span style={{ color: 'var(--cs-gold)', fontSize: 18 }}>F!rosh 2T6.exe</span>
            {windowButtons}
          </div>
          {/* menu bar */}
          <div
            className="cs-abs"
            style={{
              left: 212,
              top: 94,
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

          {/* Properties panel (left) */}
          <div
            className="cs-abs"
            style={{
              left: 210,
              top: 110,
              width: 200,
              height: 420,
              boxShadow: 'inset -1px -1px 0 0 #fff, inset 1px 1px 0 0 #808080',
              background: '#c0c0c0',
            }}
          />
          <div className="cs-abs" style={{ left: 222, top: 118, fontSize: 17, color: '#000' }}>
            Properties
          </div>

          {/* Name */}
          <div className="cs-abs" style={{ left: 222, top: 151, fontSize: 14, color: '#212121' }}>
            Name:
          </div>
          <div
            className="cs-sunken cs-field cs-abs"
            style={{ left: 292, top: 150, width: 108, height: 16 }}
          >
            F!rosh Week 2T6
          </div>

          {/* Theme */}
          <div className="cs-abs" style={{ left: 222, top: 183, fontSize: 14, color: '#212121' }}>
            Theme:
          </div>
          <div
            className="cs-sunken cs-field cs-abs"
            style={{ left: 292, top: 182, width: 108, height: 16 }}
          >
            Retro
          </div>

          {/* ETA */}
          <div className="cs-abs" style={{ left: 222, top: 215, fontSize: 14, color: '#212121' }}>
            ETA:
          </div>
          <div
            className="cs-sunken cs-field cs-abs"
            style={{ left: 292, top: 214, width: 108, height: 16 }}
          >
            31 August 2026
          </div>

          {/* Progress */}
          <div className="cs-abs" style={{ left: 221, top: 270, fontSize: 17, color: '#000' }}>
            Progress:
          </div>
          <div
            className="cs-sunken cs-progress cs-abs"
            style={{ left: 220, top: 288, width: 182, height: 16 }}
          >
            {Array.from({ length: 13 }).map((_, i) => (
              <span key={i} className="cs-progress-block" />
            ))}
          </div>
          <div
            className="cs-abs"
            style={{ left: 220, top: 308, fontSize: 17, color: '#212121', lineHeight: 1.15 }}
          >
            Extracting Hype...
            <br />
            67% complete
          </div>

          {/* Coming Soon dialog (right, top) */}
          <div
            className="cs-sunken cs-abs"
            style={{ left: 416, top: 118, width: 604, height: 100, background: '#fff' }}
          />
          <span
            className="cs-abs"
            role="img"
            aria-label="warning"
            style={{ left: 434, top: 128, fontSize: 32 }}
          >
            ⚠️
          </span>
          <div className="cs-abs" style={{ left: 480, top: 124, fontSize: 40, color: '#000' }}>
            Coming Soon!
          </div>
          <div
            className="cs-abs"
            style={{ left: 480, top: 171, fontSize: 20, color: '#212121', lineHeight: 1.2 }}
          >
            The official F!rosh Week 2T6 website is being installed.
            <br />
            Bookmark this page and to join us when registration drops.
          </div>
          <div className="cs-button cs-abs" style={{ left: 418, top: 228, width: 50, height: 22 }}>
            OK
          </div>
          <div
            className="cs-button is-disabled cs-abs"
            style={{ left: 490, top: 228, width: 139, height: 22 }}
          >
            Register (locked)
          </div>

          {/* Hero panel */}
          <div className="cs-hero cs-abs" style={{ left: 416, top: 262, width: 604, height: 258 }}>
            <h1>F!ROSH 2T6</h1>
            <p>U OF T ENGINEERING SKULE™</p>
          </div>

          {/* ---- Paint window (wide, left) ---- */}
          <img
            className="cs-abs"
            src={PaintWindowWide}
            alt="f!rosh - Paint"
            style={{ left: 26, top: 456, width: 442, height: 326 }}
          />
          {/* TODO(assets): drop the real F!rosh photo over this canvas */}
          <div
            className="cs-photo-placeholder"
            style={{ left: 38, top: 486, width: 418, height: 286 }}
          >
            Add F!rosh photo
          </div>

          {/* ---- Paint window (narrow, middle) ---- */}
          <img
            className="cs-abs"
            src={PaintWindow}
            alt="f!rosh - Paint"
            style={{ left: 616, top: 487, width: 338, height: 292 }}
          />
          {/* TODO(assets): drop the real F!rosh photo over this canvas */}
          <div
            className="cs-photo-placeholder"
            style={{ left: 628, top: 515, width: 314, height: 252 }}
          >
            Add F!rosh photo
          </div>

          {/* ---- Minesweeper ---- */}
          <img
            className="cs-abs"
            src={MinesweeperWindow}
            alt="Minesweeper"
            style={{ left: 1000, top: 416, width: 236, height: 357 }}
          />

          {/* ---- Logo badge (top-right) ---- */}
          <div className="cs-logo" style={{ left: 1108, top: 60, width: 100, height: 100 }}>
            <img src={FroshLogo} alt="F!rosh Week logo" />
          </div>
        </div>
      </div>

      {/* ---- Taskbar (full viewport width, fixed to bottom) ---- */}
      <div className="coming-soon__taskbar cs-raised">
        <div className="cs-taskbtn cs-raised cs-taskbtn--start">
          <img src={StartIcon} alt="" />
          Start
        </div>
        <div className="cs-taskbtn cs-sunken cs-taskbtn--active">📁 F!rosh 2T6.exe</div>
        <div className="cs-taskbtn cs-raised cs-taskbtn--credit">
          Made with 💜 by Parth and Ablah
        </div>
        <div className="cs-taskbar-spacer" />
        <div className="cs-clock cs-sunken">
          <span role="img" aria-label="sound">
            🔊
          </span>
          {time}
        </div>
      </div>
    </div>
  );
};

export { ComingSoon };
