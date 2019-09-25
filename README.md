# TEAMWORK
[![Build Status](https://travis-ci.com/Bam92/teamwork.svg?branch=develop)](https://travis-ci.com/Bam92/teamwork)
[![Coverage Status](https://coveralls.io/repos/github/Bam92/teamwork/badge.svg?branch=develop)](https://coveralls.io/github/Bam92/teamwork?branch=develop)

Teamwork is an ​ internal social network for organizations’ employees. The goal of this
application is to facilitate more interaction between colleagues and facilitate team boarding

* UI template: https://bam92.github.io/teamwork/UI/
* API: https://teamwork-andela.herokuapp.com$/api/v1/
* API documentation: https://teamwork-andela.herokuapp.com/api/v1/docs/
* Pivotal Tracker: https://www.pivotaltracker.com/n/projects/2395147

# Get Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
Here are the environment prerequisites for the web app

- NodeJS at least v10

## Installing
Clone the repository
Run `yarn install` to install packages
Run `yarn start` to start the server

# Run the tests
`yarn test`

## Endpoints
Make sure you have Postman or other tool that can handle http request. Please refer to the docs for more explanation.

| Endpoint | Method | Functionality |
| ---------| -------| --------------|
| /api/v1/auth/signin | POST | Login registered employee |
| /api/v1/auth/signup | POST | Register a new employee |
| /api/v1/articles | POST | Create an article |
| /api/v1/feeds | GET | Get list of all articles |
| /api/v1/articles/`<:triarticleId>` | GET | Get a specific article |
| /api/v1/articles/`<:triarticleId>` | PATCH | Update a specific article |
| /api/v1/articles/`<:triarticleId>` | DELETE | Delete a specific article |
| /api/v1/articles/`<:triarticleId>`/comments | POST | Post a comment on a specific article |

# Built with
* HTML
* CSS
* Javascript
* NodeJS / Express

# Versioning
We use [SemVer](http://semver.org/) for versioning.

# Author
**Abel L Mbula**
 * [https://twitter.com/abelmbula](https://twitter.com/abelmbula)

# Copyright and license
Code and documentation copyright 2019 Abel and Andela. Code released under the [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE). Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).
