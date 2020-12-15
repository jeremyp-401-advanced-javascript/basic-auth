# LAB - Class 06

## Project: basic-auth

### Author: Jeremy Penning

### Links and Resources

- [CI/CD](https://github.com/jeremyp-401-advanced-javascript/basic-auth/actions) (GitHub Actions)
- [Back-end Application]()
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

#### Tests

To run tests:

`npm test`
