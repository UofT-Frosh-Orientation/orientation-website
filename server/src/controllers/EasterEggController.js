const EasterEggServices = require('../services/EasterEggServices');

// Identifier for the "describe your funniest F!rosh memory" prompt on /chief.
const FROSH_MEMORY_PROMPT = 'frosh-memory';
const MAX_RESPONSE_LENGTH = 2000;

const EasterEggController = {
  /**
   * Records a funniest-F!rosh-memory submission from the hidden /chief page.
   *
   * The route is behind `checkLoggedIn`, so the hunter's identity comes off the
   * session rather than the request body — nothing about who they are is
   * client-supplied, and one submission each is enforced both here and by the
   * unique index on the collection.
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

    try {
      const alreadySubmitted = await EasterEggServices.hasSubmitted(
        FROSH_MEMORY_PROMPT,
        req.user._id,
      );
      if (alreadySubmitted) {
        return res.status(409).send({ message: 'You have already submitted this one!' });
      }

      await EasterEggServices.create(FROSH_MEMORY_PROMPT, {
        userId: req.user._id,
        name: [req.user.firstName, req.user.lastName].filter(Boolean).join(' '),
        email: req.user.email,
        // Only frosh carry a team; leedurs testing the trail just get a blank.
        scuntTeam: req.user.scuntTeam ? String(req.user.scuntTeam) : '',
        response,
      });
      return res.status(200).send({ message: 'Submission received!' });
    } catch (e) {
      // Lost the race against another tab: the unique index caught it.
      if (e.message === 'EASTER_EGG_ALREADY_SUBMITTED') {
        return res.status(409).send({ message: 'You have already submitted this one!' });
      }
      req.log.error({ msg: 'Unable to save easter egg submission', e });
      next(e);
    }
  },

  /**
   * Tells the /chief page whether this user has already answered, so it can go
   * straight to the congratulations message instead of re-showing the form.
   */
  async getFroshMemoryStatus(req, res, next) {
    try {
      const submitted = await EasterEggServices.hasSubmitted(FROSH_MEMORY_PROMPT, req.user._id);
      return res.status(200).send({ submitted });
    } catch (e) {
      req.log.error({ msg: 'Unable to check easter egg submission', e });
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
