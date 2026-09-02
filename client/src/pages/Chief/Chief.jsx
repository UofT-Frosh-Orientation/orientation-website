import React, { useState } from 'react';
import './Chief.scss';

import useAxios from '../../hooks/useAxios';
import FroshLogo from '../../assets/logo/2T6logo_1.png';

const { axios } = useAxios();

// The final stop on the Skule™ Hunt easter-egg trail:
//   /skule-hunt "Where?" → Tech Team bio (hidden text) → /coming-soon →
//   Recycle Bin → hunt.txt (Caesar cipher) → the commit message
//   "Who holds Ye Olde Mighty Skule Cannon?" → /chief (here).
// Responses land in the `EasterEggSubmission` collection; leedurs with
// admin:all can read them at GET /easter-egg/frosh-memory.
const MAX_LENGTH = 2000;

const PageChief = () => {
  const [memory, setMemory] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  const trimmed = memory.trim();
  const canSubmit = trimmed.length > 0 && status !== 'sending';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('sending');
    setError('');
    try {
      await axios.post('/easter-egg/frosh-memory', { memory: trimmed });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(
        err?.response?.data?.message ??
          'Something broke on our end. Give it a second and try again!',
      );
    }
  };

  return (
    <div className="chief-page">
      <div className="chief-window">
        <div className="chief-titlebar">
          <span>chief.exe</span>
          <div className="chief-winbtns">
            <span>_</span>
            <span>▢</span>
            <span>✕</span>
          </div>
        </div>

        <div className="chief-body">
          <img className="chief-logo" src={FroshLogo} alt="F!rosh Week logo" />

          {status === 'done' ? (
            <>
              <h1 className="chief-heading">Transmission received.</h1>
              <p className="chief-text">
                You found the cannon, you found the page, and now we have your story. Nicely hunted.
                Go tell a judge you made it all the way here. 🏆
              </p>
            </>
          ) : (
            <>
              <h1 className="chief-heading">You found it.</h1>
              <p className="chief-text">
                Ye Olde Mighty Skule™ Cannon is held by the Chief. And you, apparently, hold the
                patience of a saint. One last thing before you go:
              </p>

              <form className="chief-form" onSubmit={onSubmit}>
                <label className="chief-label" htmlFor="chief-memory">
                  Describe your funniest F!rosh memory
                </label>
                <textarea
                  id="chief-memory"
                  className="chief-textarea"
                  value={memory}
                  maxLength={MAX_LENGTH}
                  rows={7}
                  placeholder="Tell us everything..."
                  onChange={(e) => setMemory(e.target.value)}
                />
                <div className="chief-counter">
                  {memory.length} / {MAX_LENGTH}
                </div>

                {status === 'error' && <p className="chief-error">{error}</p>}

                <button className="chief-submit" type="submit" disabled={!canSubmit}>
                  {status === 'sending' ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { PageChief };
