import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './EasterEggs.scss';

// ===========================================================================
// EASTER EGGS for the W95 "Coming Soon" desktop.
//
// Three hidden things live here:
//   1. KONAMI CODE  — ↑ ↑ ↓ ↓ ← → ← → B A  → plays a sound + flashes the desktop.
//   2. XYZZY        — type "XYZZY" then press SHIFT+ENTER → Minesweeper reveals
//                     every mine (handled in Minesweeper.jsx via a `cheat` prop;
//                     this hook just fires the trigger).
//   3. THE FILE     — open the Recycling Bin → open "do not touch.txt" → decode
//                     the Caesar cipher → type the secret word → Blue Screen.
//   4. THE HUNT     — open the Recycling Bin → open "hunt.txt" (the notepad
//                     icon) → decode the Caesar cipher → it points at the GitHub
//                     commit messages, where the question "Who holds Ye Olde
//                     Mighty Skule Cannon?" leads to /chief.
//
// The keyboard wiring is in `useEasterEggs`; the windows are the components
// below. Counts/analytics are intentionally NOT wired up yet.
// ===========================================================================

// The classic Konami sequence (lower-cased; arrows keep their full key names).
const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

// The word that, when decoded from the cipher and typed, triggers the BSOD.
const CRASH_WORD = 'crash';
// Typing this then SHIFT+ENTER arms the Minesweeper cheat.
const XYZZY_WORD = 'xyzzy';

/**
 * Global keyboard listener for all three eggs. Pass callbacks for each trigger.
 * Callbacks are read through a ref so the listener is only attached once.
 */
export const useEasterEggs = ({ onKonami, onXyzzy, onCrash }) => {
  const cbs = useRef({ onKonami, onXyzzy, onCrash });
  cbs.current = { onKonami, onXyzzy, onCrash };

  const konami = useRef([]);
  const letters = useRef('');
  const xyzzyArmed = useRef(false);

  useEffect(() => {
    const onKey = (e) => {
      // Don't hijack real typing (e.g. a future search box).
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

      // --- Konami code ---
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konami.current = [...konami.current, k].slice(-KONAMI.length);
      if (
        konami.current.length === KONAMI.length &&
        konami.current.every((v, i) => v === KONAMI[i])
      ) {
        konami.current = [];
        cbs.current.onKonami?.();
      }

      // --- XYZZY: armed by the word, fired by SHIFT+ENTER ---
      if (e.key === 'Enter' && e.shiftKey && xyzzyArmed.current) {
        xyzzyArmed.current = false;
        cbs.current.onXyzzy?.();
        return;
      }

      // --- Rolling letter buffer for typed words ---
      if (/^[a-z]$/i.test(e.key)) {
        letters.current = (letters.current + e.key.toLowerCase()).slice(-16);
        if (letters.current.endsWith(XYZZY_WORD)) xyzzyArmed.current = true;
        if (letters.current.endsWith(CRASH_WORD)) {
          letters.current = '';
          cbs.current.onCrash?.();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
};

// ---------------------------------------------------------------------------
// Recycling Bin window — lists the single forbidden file.
// ---------------------------------------------------------------------------
export const RecycleBinWindow = ({ style, onOpenFile, onOpenHuntFile, onClose, onFocus }) => (
  <div className="cs-window cs-raised cs-egg-window" style={style} onPointerDown={onFocus}>
    <div className="cs-titlebar cs-egg-titlebar">
      <span>Recycle Bin</span>
      <div className="cs-winbtns">
        <div className="cs-winbtn">_</div>
        <div className="cs-winbtn">▢</div>
        <div className="cs-winbtn" onClick={onClose} role="button" aria-label="close">
          ✕
        </div>
      </div>
    </div>
    <div className="cs-egg-menu">
      File&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;View&nbsp;&nbsp;&nbsp;&nbsp;Help
    </div>
    <div className="cs-egg-binbody cs-sunken">
      <button
        type="button"
        className="cs-egg-fileicon"
        onDoubleClick={onOpenFile}
        onClick={onOpenFile}
      >
        <span className="cs-egg-fileglyph" role="img" aria-label="text file">
          📄
        </span>
        <span>do not touch.txt</span>
      </button>
      {/* Skule™ Hunt trail — the notepad icon holds the next clue. */}
      <button
        type="button"
        className="cs-egg-fileicon"
        onDoubleClick={onOpenHuntFile}
        onClick={onOpenHuntFile}
      >
        <span className="cs-egg-fileglyph" role="img" aria-label="notepad">
          📝
        </span>
        <span>hunt.txt</span>
      </button>
    </div>
    <div className="cs-egg-statusbar cs-sunken">2 objects</div>
  </div>
);

RecycleBinWindow.propTypes = {
  style: PropTypes.object.isRequired,
  onOpenFile: PropTypes.func.isRequired,
  onOpenHuntFile: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

RecycleBinWindow.defaultProps = { onFocus: undefined };

// ---------------------------------------------------------------------------
// Notepad window — shows the Caesar-ciphered note.
// Decoded (shift back 3): "You were warned. The word that wakes it is: CRASH.
//                          Type it if you dare. -- C. (shift three, et tu?)"
// ---------------------------------------------------------------------------
const CIPHER_TEXT =
  'Brx zhuh zduqhg. Wkh zrug wkdw zdnhv lw lv: FUDVK. ' +
  'Wbsh lw li brx gduh. -- F. (vkliw wkuhh, hw wx?)';

export const NotepadWindow = ({ style, onClose, onFocus }) => (
  <div
    className="cs-window cs-raised cs-egg-window cs-egg-notepad"
    style={style}
    onPointerDown={onFocus}
  >
    <div className="cs-titlebar cs-egg-titlebar">
      <span>do not touch.txt - Notepad</span>
      <div className="cs-winbtns">
        <div className="cs-winbtn">_</div>
        <div className="cs-winbtn">▢</div>
        <div className="cs-winbtn" onClick={onClose} role="button" aria-label="close">
          ✕
        </div>
      </div>
    </div>
    <div className="cs-egg-menu">
      File&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;&nbsp;Help
    </div>
    <div className="cs-egg-notebody cs-sunken">
      <p className="cs-egg-notehint">; encrypted with the oldest trick in the book</p>
      <p className="cs-egg-notecipher">{CIPHER_TEXT}</p>
    </div>
  </div>
);

NotepadWindow.propTypes = {
  style: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

NotepadWindow.defaultProps = { onFocus: undefined };

// ---------------------------------------------------------------------------
// "hunt.txt" Notepad window — the Skule™ Hunt trail's next step.
// Decoded (shift back 3): "Well spotted. Now go read the github commit messages.
//                          One of them asks a question -- its answer, in
//                          lowercase, is the new page. Go to our url slash that
//                          answer. -- shift three, et tu?"
// The commit in question is "Who holds Ye Olde Mighty Skule Cannon?" → /chief.
// ---------------------------------------------------------------------------
const HUNT_CIPHER_TEXT =
  'Zhoo vsrwwhg. Qrz jr uhdg wkh jlwkxe frpplw phvvdjhv. ' +
  'Rqh ri wkhp dvnv d txhvwlrq -- lwv dqvzhu, lq orzhufdvh, lv wkh qhz sdjh. ' +
  'Jr wr rxu xuo vodvk wkdw dqvzhu. -- vkliw wkuhh, hw wx?';

export const HuntNotepadWindow = ({ style, onClose, onFocus }) => (
  <div
    className="cs-window cs-raised cs-egg-window cs-egg-notepad"
    style={style}
    onPointerDown={onFocus}
  >
    <div className="cs-titlebar cs-egg-titlebar">
      <span>hunt.txt - Notepad</span>
      <div className="cs-winbtns">
        <div className="cs-winbtn">_</div>
        <div className="cs-winbtn">▢</div>
        <div className="cs-winbtn" onClick={onClose} role="button" aria-label="close">
          ✕
        </div>
      </div>
    </div>
    <div className="cs-egg-menu">
      File&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;&nbsp;Help
    </div>
    <div className="cs-egg-notebody cs-sunken">
      <p className="cs-egg-notehint">; encrypted with the oldest trick in the book</p>
      <p className="cs-egg-notecipher">{HUNT_CIPHER_TEXT}</p>
    </div>
  </div>
);

HuntNotepadWindow.propTypes = {
  style: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

HuntNotepadWindow.defaultProps = { onFocus: undefined };

// ---------------------------------------------------------------------------
// Blue Screen of Death — full-viewport overlay. Dismiss with any key / click.
// ---------------------------------------------------------------------------
export const BlueScreen = ({ onDismiss }) => {
  useEffect(() => {
    const dismiss = () => onDismiss();
    window.addEventListener('keydown', dismiss);
    window.addEventListener('pointerdown', dismiss);
    return () => {
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', dismiss);
    };
  }, [onDismiss]);

  return (
    <div className="cs-bsod" role="alertdialog" aria-label="Blue screen of death">
      <div className="cs-bsod-inner">
        <p className="cs-bsod-banner">F!ROSH</p>
        <p>
          A problem has been detected and Windows has been shut down to protect curiosity from being
          rewarded.
        </p>
        <p className="cs-bsod-headline">I TOLD YOU NOT TO TOUCH THE FILE.</p>
        <p>
          If this is the first time you&apos;ve seen this stop error screen, that&apos;s on you. We
          literally named the file &quot;do not touch&quot;.
        </p>
        <p>Technical information:</p>
        <p>*** STOP: 0x000F2056 (0xCURIOSITY, 0xKILLED, 0xTHE, 0xCAT)</p>
        <p className="cs-bsod-press">Press any key to pretend this never happened . . .</p>
      </div>
    </div>
  );
};

BlueScreen.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};
