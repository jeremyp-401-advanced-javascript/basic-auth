'use strict';

require('@code-fellows/supergoose');
const middleware = require('../src/auth/signInMiddleware');
const Users = require('../src/auth/userModel');

let users = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async (done) => {
  await new Users(users.admin).save();
  done();
});

describe('Auth Middleware', () => {
  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('User Authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {

      // Change the request to match this test case
      // admin:foo: YWRtaW46Zm9v
      req.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });
    });

    it('logs in an admin user with the right credentials', () => {
      // Change the request to match this test case
      // admin:password: YWRtaW46cGFzc3dvcmQ=
      req.headers = {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });
    });

  });
});
