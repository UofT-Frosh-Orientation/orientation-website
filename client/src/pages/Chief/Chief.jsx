import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Chief.scss';

import useAxios from '../../hooks/useAxios';
import { loggedInSelector } from '../../state/user/userSlice';
import FroshLogo from '../../assets/logo/2T6logo_1.png';

const { axios } = useAxios();

// The final stop on the Skule™ Hunt easter-egg trail:
//   /skule-hunt "Where?" → Tech Team bio (hidden text) → /coming-soon →
//   Recycle Bin → hunt.txt (Caesar cipher) → the commit message
//   "Who holds Ye Olde Mighty Skule Cannon?" → /chief (here).
// Hunters must be signed in: the backend takes their name, email and team off
// the session (so there is nothing to type and nothing to fake) and allows one
// submission each. Leedurs with admin:all read them at
// GET /easter-egg/frosh-memory.
const MAX_LENGTH = 2000;

const PageChief = () => {
  const loggedIn = useSelector(loggedInSelector);

  const [memory, setMemory] = useState('');
  // checking → we don't yet know if they've already submitted
  // idle | sending | done | error
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState('');

  // Someone who already answered goes straight to the payoff rather than being
  // offered a form that would only 409.
  useEffect(() => {
    if (!loggedIn) {
      setStatus('idle');
      return;
    }

    let cancelled = false;
    axios
      .get('/easter-egg/frosh-memory/status')
      .then(({ data }) => {
        if (!cancelled) setStatus(data?.submitted ? 'done' : 'idle');
      })
      .catch(() => {
        // Status is only an optimisation — if it fails, show the form and let
        // the submit itself be the source of truth.
        if (!cancelled) setStatus('idle');
      });

    return () => {
      cancelled = true;
    };
  }, [loggedIn]);

  const canSubmit = memory.trim() && status !== 'sending' && status !== 'done';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('sending');
    setError('');
    try {
      await axios.post('/easter-egg/frosh-memory', { memory: memory.trim() });
      setStatus('done');
    } catch (err) {
      // 409 means it's already recorded — that's a success from where they sit.
      if (err?.response?.status === 409) {
        setStatus('done');
        return;
      }
      setStatus('error');
      setError(
        err?.response?.data?.message ??
          'Something broke on our end. Give it a second and try again!',
      );
    }
  };

  const body = () => {
    if (status === 'checking') {
      return <p className="chief-text">Checking your progress...</p>;
    }

    if (status === 'done') {
      return (
        <p className="chief-text chief-text--payoff">
          You completed this easter egg. Good Job Frosh! May the engineering gods bless your
          midterms - Parth &amp; Ablah
        </p>
      );
    }

    if (!loggedIn) {
      return (
        <>
          <h1 className="chief-heading">You found it.</h1>
          <p className="chief-text">
            Ye Olde Mighty Skule™ Cannon is held by the Chief. Sign in first so we know who to give
            the points to, then come back here.
          </p>
          <Link className="chief-submit chief-submit--link" to="/login">
            Sign in
          </Link>
        </>
      );
    }

    return (
      <>
        <h1 className="chief-heading">You found it.</h1>
        <p className="chief-text">
          Ye Olde Mighty Skule™ Cannon is held by the Chief. And you, apparently, hold the patience
          of a saint. One last thing before you go:
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

          <p className="chief-note">
            You only get one shot at this — your name, email and team come from your profile.
          </p>

          <button className="chief-submit" type="submit" disabled={!canSubmit}>
            {status === 'sending' ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </>
    );
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
          {body()}
        </div>
      </div>
    </div>
  );
};

export { PageChief };
