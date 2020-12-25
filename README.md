# LAB - Class 06

## Project: basic-auth

### Author: Jeremy Penning

### Links and Resources

- [CI/CD](https://github.com/jeremyp-401-advanced-javascript/basic-auth/actions) (GitHub Actions)
- [Back-end Application](https://jeremyp-basic-auth.herokuapp.com/)
- API Endpoints - Relative to Back-end Application URL above.

---

### API Endpoints - Users

#### **POST /signup** - (Create a User)

**Required Parameters:**

>Request Body (JSON or form-data):
>- username - _String_
>- password - _String_ 

#### **POST /signin** - (Authenticate a User)

**Required Parameters:**

>Headers:
>- Authorization: Basic `<hashed username:password>`

---

### Setup

#### `.env` requirements

- `PORT` - Port Number
- `MONGODB_URI` - Mongo DB Connection String

#### How to initialize/run the application

To run application:

`npm start`

### Testing

To run tests:

`npm test`

#### Tests Run

The /signup route:
- gives a 403 if nothing is sent
- successfully creates a new user
- returns an error if the user object sent was malformed

The /signin routes:
- correctly signs in a user
- fails signs in a user if the wrong credentials are used
- returns an error if the authorization sent was malformed

The user authentication middleware:
- fails a login for a user (admin) with the incorrect basic credentials
- logs in an admin user with the right credentials
