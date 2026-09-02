const EasterEggServices = require('../services/EasterEggServices');

// Identifier for the "describe your funniest F!rosh memory" prompt on /chief.
const FROSH_MEMORY_PROMPT = 'frosh-memory';
const MAX_RESPONSE_LENGTH = 2000;

// The submit endpoint is deliberately public (the whole point of the easter egg
// is that anyone who solves the trail can answer, logged in or not), so it gets
// a light per-IP throttle to keep it from being used as a free write endpoint.
// In-memory on purpose: it resets on restart and is per-instance, which is all
// this needs — it is a speed bump, not an access control.
const SUBMIT_WINDOW_MS = 10 * 60 * 1000;
const SUBMIT_LIMIT_PER_WINDOW = 5;
const submitHistory = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (submitHistory.get(ip) ?? []).filter((t) => now - t < SUBMIT_WINDOW_MS);

  if (recent.length >= SUBMIT_LIMIT_PER_WINDOW) {
    submitHistory.set(ip, recent);
    return true;
  }

  recent.push(now);
  submitHistory.set(ip, recent);

  // Drop stale IPs so the map cannot grow without bound.
  for (const [key, times] of submitHistory) {
    if (times.every((t) => now - t >= SUBMIT_WINDOW_MS)) submitHistory.delete(key);
  }
  return false;
};

const EasterEggController = {
  /**
   * Records a funniest-F!rosh-memory submission from the hidden /chief page.
   */
  async submitFroshMemory(req, res, next) {
    const { memory } = req.body;

    if (typeof memory !== 'string' || memory.trim().length === 0) {
      return res.status(400).send({ message: 'Please write something first!' });
    }

    const response = memory.trim();
    if (response.length > MAX_RESPONSE_LENGTH) {
      return res
        .status(400)
        .send({ message: `Keep it under ${MAX_RESPONSE_LENGTH} characters please!` });
    }

    if (isRateLimited(req.ip)) {
      return res.status(429).send({ message: 'Slow down there — try again in a few minutes.' });
    }

    try {
      await EasterEggServices.create(FROSH_MEMORY_PROMPT, response);
      return res.status(200).send({ message: 'Submission received!' });
    } catch (e) {
      req.log.error({ msg: 'Unable to save easter egg submission', e });
      next(e);
    }
  },

  /**
   * Reads back every funniest-F!rosh-memory submission (admins only).
   */
  async getFroshMemories(req, res, next) {
    try {
      const submissions = await EasterEggServices.getAllByPrompt(FROSH_MEMORY_PROMPT);
      return res.status(200).send({ submissions });
    } catch (e) {
      req.log.error({ msg: 'Unable to get easter egg submissions', e });
      next(e);
    }
  },
};

module.exports = EasterEggController;
