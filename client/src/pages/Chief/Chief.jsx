import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Chief.scss';

import useAxios from '../../hooks/useAxios';
import { userSelector } from '../../state/user/userSlice';
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
  // Anyone who solved the trail can submit, logged in or not — but if there IS
  // a session we prefill from it so the details we award points against are
  // less likely to be typo'd.
  const { user } = useSelector(userSelector);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scuntTeam, setScuntTeam] = useState('');
  const [memory, setMemory] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
    if (fullName) setName((prev) => prev || fullName);
    if (user.email) setEmail((prev) => prev || user.email);
    if (user.scuntTeam) setScuntTeam((prev) => prev || String(user.scuntTeam));
  }, [user]);

  const canSubmit =
    name.trim() &&
    email.trim() &&
    scuntTeam.trim() &&
    memory.trim() &&
    status !== 'sending' &&
    status !== 'done';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('sending');
    setError('');
    try {
      await axios.post('/easter-egg/frosh-memory', {
        name: name.trim(),
        email: email.trim(),
        scuntTeam: scuntTeam.trim(),
        memory: memory.trim(),
      });
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
            <p className="chief-text chief-text--payoff">
              You completed this easter egg. Good Job Frosh! May the engineering gods bless your
              midterms - Parth &amp; Ablah
            </p>
          ) : (
            <>
              <h1 className="chief-heading">You found it.</h1>
              <p className="chief-text">
                Ye Olde Mighty Skule™ Cannon is held by the Chief. And you, apparently, hold the
                patience of a saint. One last thing before you go:
              </p>

              <form className="chief-form" onSubmit={onSubmit}>
                <label className="chief-label" htmlFor="chief-name">
                  Name
                </label>
                <input
                  id="chief-name"
                  className="chief-input"
                  type="text"
                  value={name}
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="chief-label" htmlFor="chief-email">
                  Email
                </label>
                <input
                  id="chief-email"
                  className="chief-input"
                  type="email"
                  value={email}
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@mail.utoronto.ca"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="chief-label" htmlFor="chief-team">
                  Skule™ Hunt team number
                </label>
                <input
                  id="chief-team"
                  className="chief-input"
                  type="text"
                  inputMode="numeric"
                  value={scuntTeam}
                  maxLength={50}
                  placeholder="e.g. 7"
                  onChange={(e) => setScuntTeam(e.target.value)}
                />

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
