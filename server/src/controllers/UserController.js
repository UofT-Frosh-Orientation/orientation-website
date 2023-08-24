const UserServices = require('../services/UserServices');
const LeadurServices = require('../services/LeadurServices');
const passport = require('../services/passport');
const passwordResetSubscription = require('../subscribers/passwordResetSubscription');
const announcementSubscription = require('../subscribers/announcementSubscription');
const newUserSubscription = require('../subscribers/newUserSubscription');

const UserController = {
  /**
   * Signs up a new user.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async signup(req, res, next) {
    try {
      const { email, password, firstName, lastName, preferredName, leadur, scuntTeam } = req.body;

      await UserServices.validateUser(email.toLowerCase(), password);

      let user;

      if (leadur) {
        user = await LeadurServices.createLeadur(
          email.toLowerCase(),
          password,
          firstName,
          lastName,
          preferredName,
          scuntTeam,
        );
      } else {
        user = await UserServices.create(
          email.toLowerCase(),
          password,
          firstName,
          lastName,
          preferredName,
        );
      }
      return res.status(200).send({ message: 'Success!', user: user.getResponseObject() });
    } catch (err) {
      req.log.fatal({ message: 'Unable to create user', err });
      next(err);
    }
  },

  /**
   * Gets the info of the currently authenticated user.
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<void>}
   */
  async getInfo(req, res) {
    let user = req.user;

    if (!UserServices.checkScuntToken(user)) {
      user = await UserServices.addScuntToken(user.id);
    }

    res.status(200).send({ user: user.getResponseObject() });
  },

  /**
   * Logs in a user by email and password
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async login(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err || !user) {
        //req.log.info("Incorrect Email and Password entered by user");
        res
          .status(403)
          .send({ errorMessage: 'Please ensure your email and password are correct.' });
      } else if (!user.confirmedEmail) {
        // req.log.error(err, "Attempt to login with unverified email");
        res.status(403).send({ errorMessage: 'Please ensure that you have verified your email.' });
      } else {
        req.logIn(user, (err) => {
          if (err) {
            req.log.fatal({
              msg: 'User Login Failure',
              err,
              // user: user.getResponseObject(),
            });
            next(err);
          } else {
            req.log.info({
              msg: 'Successful login by user ' + user.id,
              user: user.getResponseObject(),
            });
            res.status(200).send({ message: 'Success!', user: user.getResponseObject() });
          }
        });
      }
    })(req, res, next);
  },

  /**
   * Logs out the currently authenticated user.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async logout(req, res, next) {
    const user = req.user;

    try {
      req.logout((err) => {
        if (err) {
          req.log.error({
            msg: 'User Logout Failure: user ' + user.id,
            err,
            user: user.getResponseObject(),
          });
          return next(err);
        } else {
          req.log.info({
            msg: 'Successful Logout by user ' + user.id,
            user: user.getResponseObject(),
          });
          return res.status(200).send({
            message: 'Successful Logout by user ' + user.id,
            user: user.getResponseObject(),
          });
        }
      });
    } catch (error) {
      req.log.error({
        msg: 'User Logout Failure: user ' + user.id,
        error,
        user: user.getResponseObject(),
      });
      next(error);
    }
  },

  async requestPasswordReset(req, res, next) {
    try {
      const { email } = req.body; //TODO: only send this to emails in our db
      const existingUser = await UserServices.getUserByEmail(email);
      if (existingUser) {
        const token = await UserServices.generatePasswordResetToken(email);
        passwordResetSubscription.add({ email, token });
      }
      res.status(202).send({
        message:
          'If we have an account matching your email, we have sent an email to you. Please check there for instructions on how to reset your password',
      });
    } catch (err) {
      req.log.fatal({
        msg: 'User Password Reset Request Failure: user ' + req.body,
        err,
      });
      next(err);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { email, password, token } = req.body;
      const result = await UserServices.validatePasswordResetToken(token);
      const existingUser = await UserServices.getUserByEmail(email);
      if (!existingUser || existingUser.email !== result.email) {
        next(new Error('INVALID_PASSWORD_RESET_EMAIL'));
      } else {
        await UserServices.updatePassword(email, password);
        res.status(200).send({
          message:
            'Successfully updated your password! Please sign in with your email and new password.',
        });
      }
    } catch (err) {
      req.log.fatal({
        msg: 'User Password Reset Request Failure: user ' + req.body,
        err,
      });
      next(err);
    }
  },

  async confirmUser(req, res, next) {
    try {
      const { email, emailToken } = req.body;
      const result = await UserServices.validateEmailConfirmationToken(emailToken);
      const existingUser = await UserServices.getUserByEmail(email);

      if (existingUser.email !== result) {
        next(new Error('INVALID_VERIFICATION_LINK'));
      } else {
        await UserServices.updateUserInfo(existingUser.id, { confirmedEmail: true });
        newUserSubscription.add(existingUser);

        res.status(200).send({
          message:
            'Successfully verified your email! Log in with your email and password to get started.',
        });
      }
    } catch (error) {
      req.log.fatal({
        msg: 'Error with password reset page: user ' + req.body.email,
        error,
        user: req.body,
      });
      next(error);
    }
  },

  async unsubscribeUser(req, res, next) {
    try {
      const { email } = req.body;
      await UserServices.unsubscribeUser(email);
      announcementSubscription.add({ unsubed: true, email });

      res
        .status(200)
        .send({ message: 'You have been successfully unsubscribed from announcement emails.' });
    } catch (error) {
      req.log.error({
        msg: 'User Announcement Unsubscribe Error: user ' + req.body.email,
        error,
        user: req.body,
      });
      next(error);
    }
  },

  async resubscribeUser(req, res, next) {
    try {
      const { email } = req.body;
      await UserServices.resubscribeUser(email);
      res
        .status(200)
        .send({ message: 'You have been successfully resubscribed to announcement emails.' });
    } catch (error) {
      req.log.error({
        msg: 'User Announcement Resubscribe Error: user ' + req?.body?.email,
        error,
        user: req.body,
      });
      next(error);
    }
  },

  async requestAuthScopes(req, res, next) {
    try {
      const user = req.user;
      const { authScopes, froshDataFields } = req.body;
      let updatedUser;
      if (user.userType === 'frosh') {
        // frosh can't get auth scopes
        return next(new Error('UNAUTHORIZED'));
      } else if (user.userType === 'leadur') {
        updatedUser = await LeadurServices.requestScopesAndData(user, froshDataFields, authScopes);
      } else {
        updatedUser = await UserServices.requestAuthScopes(user, authScopes);
      }
      if (!user) {
        return next(new Error('UNABLE_TO_UPDATE_USER'));
      } else {
        return res
          .status(200)
          .send({ message: 'Successfully updated user!', user: updatedUser.getResponseObject() });
      }
    } catch (err) {
      req.log.fatal({
        msg: 'User Request Auth Scope Error: user ' + req.user.id,
        err,
        user: req.user,
      });
      next(err);
    }
  },

  async getUnapprovedUsers(req, res, next) {
    try {
      const unapprovedUsers = await UserServices.getUnapprovedUsers();
      return res.status(200).send({
        message: 'Successfully found users!',
        unapprovedUsers: unapprovedUsers.map((u) => u.getResponseObject()),
      });
    } catch (err) {
      req.log.error({ msg: 'Error Getting Unapproved Users', err });
      next(err);
    }
  },

  async getUsersAuthScopes(req, res, next) {
    try {
      const usersAuthScopes = await UserServices.getUsersAuthScopes();
      return res.status(200).send({
        message: 'Successfully found users!',
        authRequests: usersAuthScopes.map((u) => u.getResponseObject()),
      });
    } catch (err) {
      req.log.error({ msg: 'Error Getting User Auth Scopes', err });
      next(err);
    }
  },

  async updateAccountStatuses(req, res, next) {
    try {
      const { accounts } = req.body;
      const approvedIds = accounts.reduce((prev, curr) => {
        if (curr.approved) {
          prev.push(curr.id);
        }
        return prev;
      }, []);
      const { modifiedCount } = await UserServices.approveAccountsByIds(approvedIds);
      //TODO: send email when accounts are rejected
      if (modifiedCount < approvedIds.length) {
        res.status(400).send({ message: 'Not all users were successfully updated.' });
      } else {
        res.status(200).send({ message: 'Successfully approved users!' });
      }
    } catch (err) {
      req.log.error({ msg: 'Error updating account statuses', err });
      next(err);
    }
  },

  async updateAuthScopes(req, res, next) {
    try {
      const { userAuthScopes } = req.body;
      await UserServices.updateAuthScopes(userAuthScopes);
      return res.status(200).send({ message: 'Auth scopes updated!' });
    } catch (error) {
      req.log.error({
        msg: 'Error Updating Auth Scopes: user ' + req.user.id,
        error,
        user: req.user,
      });
      next(error);
    }
  },

  async getScuntJudgeUsers(req, res, next) {
    try {
      const judgeUsers = await UserServices.getScuntJudgeUsers();
      return res.status(200).send({
        message: 'Successfully found users!',
        authRequests: judgeUsers.map((u) => u.getResponseObject()),
      });
    } catch (e) {
      req.log.error({ msg: 'Error Getting Scunt Judge Users ', e });
      next(e);
    }
  },
  /**
   * Hard deletes a user account from mongo by id.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @async
   * @return {Promise<void>}
   */
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await UserServices.deleteUser(id);
      res.status(200).send({ message: 'Successfully deleted User!', deletedId: id });
    } catch (error) {
      req.log.fatal({ msg: 'Error Deleting User ' + req.id, error });
      next(error);
    }
  },

  /**
   * Checks to see if a user exists with that email
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async userExist(req, res, next) {
    const email = req.body?.email;

    try {
      const existingUser = await UserServices.getUserByEmail(email);
      if (existingUser) {
        return res.status(200).send({
          message: 'User exists',
        });
      } else {
        return res.status(404).send({
          message: 'User does not exist',
        });
      }
    } catch (e) {
      req.log.error({ msg: 'Error Determining if User Exists', e });
      next(e);
    }
  },

  /**
   * Update a users info
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async updateInfo(req, res, next) {
    const userId = req.user.id;
    const updateInfo = req.body;

    try {
      const user = await UserServices.updateUserInfo(userId, updateInfo);
      return res.status(200).send({
        message: 'Successfully updated User Information!',
        user: user.getResponseObject(),
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = UserController;
