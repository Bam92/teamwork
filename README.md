# TEAMWORK
[![Build Status](https://travis-ci.com/Bam92/teamwork.svg?branch=develop)](https://travis-ci.com/Bam92/teamwork)
[![Coverage Status](https://coveralls.io/repos/github/Bam92/teamwork/badge.svg?branch=develop)](https://coveralls.io/github/Bam92/teamwork?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6e322a366ad4c4c68128/maintainability)](https://codeclimate.com/github/Bam92/teamwork/maintainability)
![David](https://img.shields.io/david/bam92/teamwork)
![Abel](https://img.shields.io/badge/andela-btcamp-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Teamwork is an ​ internal social network for organizations’ employees. The goal of this
application is to facilitate more interaction between colleagues and facilitate team boarding

# Links

* [Front end](https://bam92.github.io/teamwork/UI/)
* [Back end](https://teamwork-andela.herokuapp.com/api/v1/)
* [Documentation](https://teamwork-andela.herokuapp.com/api/v1/docs/)
* [User stories](https://www.pivotaltracker.com/n/projects/2395147)

# Get Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
Here are the environment prerequisites for the web app

- NodeJS at least v10

## Installing
Make sure you have `yarn` installed already (`yarn --version` to test)
Clone the repository
- Run `yarn install` to install packages
- Run `yarn start` to start the server

## Running the tests
`yarn test`

# API endpoints
Make sure you have `Postman` or other tool that can handle http request. Please refer to the docs for more explanation.
**For base url refer to back end link**

## GET
* `feeds`
* `/articles/categories/:id`
* `/articles/:id`

## POST 
* `auth/signup`
* `auth/signin`
* `articles`
* `articles/:id/comments`
* `articles/:id/flag`
* `comments/:id/flag`

## PATCH
* `articles/:id`

## DELETE
* `articles/:id`

| Endpoint | Method | Functionality |
| ---------| -------| --------------|
| `auth/signin` | POST | Login registered employee |
| `auth/signup `| POST | Register a new employee |
| `articles `| POST | Create an article |
| `feeds `| GET | Get list of all articles |
| `articles/<:articleId>` | GET | Get a specific article |
| `articles/<:articleId>` | PATCH | Update a specific article |
| `articles/<:articleId>` | DELETE | Delete a specific article |
| `articles/<:articleId>/comments` | POST | Post a comment on a specific article |
| `articles/categories/<:categoryId>` | GET | Filter articles by category |
| `articles/<:articleId>/flag` | POST | Flag an article |
| `articles/<:commentId>/flag` | POST | Flag a comment |

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
