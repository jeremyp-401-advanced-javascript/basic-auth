'use strict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

// Testing Requirements

// Assert the following

//     404 on a bad route
//     404 on a bad method
//     The correct status codes and returned data for each REST route
//         Create a record using POST
//         Read a list of records using GET
//         Read a record using GET
//         Update a record using PUT
//         Destroy a record using DELETE

afterEach(() => { 
  jest.clearAllMocks(); 
  jest.resetAllMocks();
});

describe('The web server', () => {
  // Throw 404 on a bad route
  it('gives a 404 on a bad route', async () => {
    const response = await mockRequest.post('/tacos');
    //console.log('Test response:', response);
    expect(response.status).toBe(404);
  });
  // Thrown 404 on a bad method
  it('gives a 404 on a bad CRUD method', async () => {
    const response = await mockRequest.put('/signup');
    expect(response.status).toBe(404);
  });
});

describe('The signup route', () => {
  // Thrown 403 if nothing is sent
  it('gives a 403 if nothing is sent', async () => {
    const response = await mockRequest.post('/signup');
    expect(response.status).toBe(403);
  });
  // Create a user using POST
  it('successfully creates a new user', async () => {
    const postObject = { 'username': 'test', 'password': 'pass' };
    const response = await mockRequest.post('/signup').send(postObject);
    expect(response.status).toBe(201);
    expect(response.body.username).toStrictEqual('test');
  });
  // Throw a exception if the user object sent is malformed
  it('returns an error if the user object sent was malformed', async () => {
    const postObject = { 'username': 'test' };
    const response = await mockRequest.post('/signup').send(postObject);
    expect(response.status).toBe(403);
    expect(response.text).toEqual('Error Creating User');
  });
});

describe('The /signin routes', () => {
  // Sign in a user using POST
  it('correctly signs in a user', async () => {
    // Authorization - username: test, password: pass
    const response = await mockRequest.post('/signin').set('Authorization', 'Basic dGVzdDpwYXNz').send();
    expect(response.status).toBe(200);
    expect(response.body.username).toStrictEqual('test');
  });
  // Sign in a user using POST
  it('fails signs in a user if the wrong credentials are used', async () => {
    // Authorization - username: test, password: pass
    const response = await mockRequest.post('/signin').set('Authorization', 'Basic dGVzdPpwYXNz').send();
    expect(response.status).toBe(403);
    expect(response.text).toEqual('Invalid Login');
  });
  // Throw an exception if the user object sent is malformed
  it('returns an error if the authorization sent was malformed', async () => {
    // Authorization - username: test, password: <none given>
    const response = await mockRequest.post('/signin').set('Authorization', 'Basic dGVzdDo=').send();
    console.log(response.body);
    expect(response.status).toBe(403);
    expect(response.text).toEqual('Invalid Login');
  });
});