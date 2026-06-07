import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Minesweeper.scss';

// Classic "Beginner" board.
const ROWS = 9;
const COLS = 9;
const MINES = 10;

// Classic Minesweeper number colours.
const NUM_COLORS = {
  1: '#0000ff',
  2: '#008000',
  3: '#ff0000',
  4: '#000080',
  5: '#800000',
  6: '#008080',
  7: '#000000',
  8: '#808080',
};

const makeGrid = () =>
  Array.from({ length: ROWS * COLS }, () => ({
    mine: false,
    revealed: false,
    flagged: false,
    exploded: false,
    adj: 0,
  }));

const neighbors = (i) => {
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  const out = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push(nr * COLS + nc);
    }
  }
  return out;
};

// Place mines after the first click so the first reveal is never a mine (and
// opens up an area — the clicked cell and its neighbours are kept mine-free).
const placeMines = (grid, safe) => {
  const next = grid.map((cell) => ({ ...cell, mine: false, adj: 0 }));
  const blocked = new Set([safe, ...neighbors(safe)]);
  const candidates = [];
  for (let i = 0; i < next.length; i += 1) if (!blocked.has(i)) candidates.push(i);
  for (let m = 0; m < MINES && candidates.length; m += 1) {
    const pick = Math.floor(Math.random() * candidates.length);
    next[candidates.splice(pick, 1)[0]].mine = true;
  }
  for (let i = 0; i < next.length; i += 1) {
    if (!next[i].mine) next[i].adj = neighbors(i).filter((n) => next[n].mine).length;
  }
  return next;
};

// Reveal a cell, flood-filling outward through empty (0-adjacent) cells.
const floodReveal = (grid, start) => {
  const next = grid.map((c) => ({ ...c }));
  const stack = [start];
  while (stack.length) {
    const i = stack.pop();
    const cell = next[i];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.adj === 0 && !cell.mine) {
      neighbors(i).forEach((n) => {
        if (!next[n].revealed) stack.push(n);
      });
    }
  }
  return next;
};

const lcd = (n) => {
  const v = Math.max(-99, Math.min(999, n));
  return v < 0 ? `-${String(Math.abs(v)).padStart(2, '0')}` : String(v).padStart(3, '0');
};

export const Minesweeper = ({ frame, onDragStart, cheatTrigger }) => {
  const [grid, setGrid] = useState(makeGrid);
  const [status, setStatus] = useState('ready'); // ready | playing | won | lost
  const [time, setTime] = useState(0);
  // Once mines exist on the board (after first click OR the XYZZY cheat seeds
  // them), don't re-place them — otherwise the cheat's revealed positions would
  // shift out from under the player.
  const [seeded, setSeeded] = useState(false);
  // XYZZY cheat is owned here so a new game clears it. The parent bumps
  // `cheatTrigger` (a counter) each time XYZZY fires; we turn the cheat on when
  // it changes, and off again on reset().
  const [cheat, setCheat] = useState(false);

  useEffect(() => {
    if (cheatTrigger > 0) setCheat(true);
  }, [cheatTrigger]);

  // Timer runs while playing.
  useEffect(() => {
    if (status !== 'playing') return undefined;
    const id = setInterval(() => setTime((t) => Math.min(999, t + 1)), 1000);
    return () => clearInterval(id);
  }, [status]);

  // XYZZY cheat: if the board hasn't been seeded yet, drop the mines in now so
  // there's something to reveal. (Relaxes the first-click-safe guarantee — fair,
  // since you can now see every mine.)
  useEffect(() => {
    if (!cheat || seeded || status === 'won' || status === 'lost') return;
    const safe = Math.floor(Math.random() * ROWS * COLS);
    setGrid((g) => placeMines(g, safe));
    setSeeded(true);
  }, [cheat, seeded, status]);

  const reset = () => {
    setGrid(makeGrid());
    setStatus('ready');
    setTime(0);
    setSeeded(false);
    setCheat(false);
  };

  const revealCell = (i) => {
    if (status === 'won' || status === 'lost') return;
    if (grid[i].revealed || grid[i].flagged) return;

    // First click: seed the mines around the safe cell (unless already seeded).
    const working = seeded ? grid : placeMines(grid, i);
    if (!seeded) setSeeded(true);

    if (working[i].mine) {
      const next = working.map((c) => ({ ...c, revealed: c.mine ? true : c.revealed }));
      next[i] = { ...next[i], revealed: true, exploded: true };
      setGrid(next);
      setStatus('lost');
      return;
    }

    const next = floodReveal(working, i);
    const won = next.every((c) => c.mine || c.revealed);
    setGrid(next);
    setStatus(won ? 'won' : 'playing');
  };

  const toggleFlag = (e, i) => {
    e.preventDefault();
    if (status === 'won' || status === 'lost') return;
    if (grid[i].revealed) return;
    setGrid((g) => g.map((c, idx) => (idx === i ? { ...c, flagged: !c.flagged } : c)));
  };

  const minesLeft = MINES - grid.filter((c) => c.flagged).length;
  const face = status === 'won' ? '😎' : status === 'lost' ? '😵' : '🙂';

  return (
    <div {...frame}>
      {/* Title bar is the ONLY drag handle, so cells stay clickable. */}
      <div className="cs-titlebar cs-draghandle cs-ms-titlebar" onPointerDown={onDragStart}>
        <span>Minesweeper</span>
        <div className="cs-winbtns">
          <div className="cs-winbtn">_</div>
          <div className="cs-winbtn">▢</div>
          <div className="cs-winbtn">✕</div>
        </div>
      </div>
      <div className="cs-ms-menu">Game&nbsp;&nbsp;&nbsp;&nbsp;Help</div>

      <div className="cs-ms-panel">
        <div className="cs-ms-header cs-sunken">
          <div className="cs-ms-lcd">{lcd(minesLeft)}</div>
          <button type="button" className="cs-ms-face cs-raised" onClick={reset} aria-label="reset">
            {face}
          </button>
          <div className="cs-ms-lcd">{lcd(time)}</div>
        </div>

        <div className="cs-ms-board cs-sunken">
          {grid.map((cell, i) => {
            const classes = ['cs-ms-cell'];
            classes.push(cell.revealed ? 'is-revealed' : 'cs-raised');
            if (cell.exploded) classes.push('is-exploded');

            let content = '';
            if (cell.flagged && !cell.revealed) content = '🚩';
            else if (cell.revealed && cell.mine) content = '💣';
            else if (cell.revealed && cell.adj > 0) content = cell.adj;

            // XYZZY cheat: light up unrevealed, unflagged mines so they're obvious.
            if (cheat && cell.mine && !cell.revealed && !cell.flagged) {
              classes.push('is-cheat');
              content = '💣';
            }

            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={classes.join(' ')}
                style={cell.revealed && cell.adj > 0 ? { color: NUM_COLORS[cell.adj] } : undefined}
                onClick={() => revealCell(i)}
                onContextMenu={(e) => toggleFlag(e, i)}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Minesweeper.propTypes = {
  // Positioning/className props from the parent's draggable-window helper.
  frame: PropTypes.object.isRequired,
  // Pointer-down handler wired to the title bar to start a drag.
  onDragStart: PropTypes.func.isRequired,
  // XYZZY easter egg: a counter the parent bumps to (re)activate the reveal.
  cheatTrigger: PropTypes.number,
};

Minesweeper.defaultProps = {
  cheatTrigger: 0,
};
