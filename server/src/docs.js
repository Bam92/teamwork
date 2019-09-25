import { port, endpoint } from '../../config';

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Teamwork',
    description: 'Internal social plateforme API',
  },
  servers: [
    {
      url: `http://localhost:${port}${endpoint}`,
      description: 'Developement server'
    },
    {
      url: `https://teamwork-andela.herokuapp.com${endpoint}`,
      description: 'Production server'
    }
  ],
  // security: [{
  //   tokenAuth: []
  // }],
  tags: [
    {
      name: 'Employee authentification'
    },
    {
      name: 'Articles operations'
    }
  ],
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Employee authentification'],
        description: 'Register a new employee',
        operationId: 'createUsers',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Users'
              }
            }
          },
         // required: true
        },
        responses: {
          '201': {
            description: 'New employee successfully created'
          },
          '400': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'User identificationNumbers 10, 20 already exist',
                  internal_code: 'invalid_parameters'
                }
              }
            }
          }
        }
      }
    },
    '/auth/signin': {
      post: {
        tags: ['Employee authentification'],
        description: 'Sign in users',
        operationId: 'signinUsers',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  email: {
                    $ref: '#/components/schemas/email',
                  },
                  password: {
                    $ref: '#/components/schemas/password',
                  }
                }
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Employee successfully connected'
          },
          '404': {
            description: 'Employee does not exist. Try again',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Employee does not exist. Try again'
                }
              }
            }
          }
        }
      }
    },
    '/articles': {
      post: {
        tags: ['Articles operations'],
        description: 'Create an article',
        operationId: 'newPost',
        security: {
          bearerAuth: []
        },
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                  $ref: '#/components/schemas/Articles',
              }
            }
          },
          required: true
        },
        responses: {
          '201': {
            description: 'new article successfully created'
          },
          '404': {
            description: 'Employee does not exist. Try again',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Employee does not exist. Try again'
                }
              }
            }
          }
        }
      }
    },
    '/feeds': {
      get: {
        tags: ['Articles operations'],
        description: 'Get list of all articles',
        operationId: 'listPosts',
        security: {
          bearerAuth: []
        },
        parameters: [],
        responses: {
          '200': {
            description: 'Employee successfully connected'
          },
          '404': {
            description: 'Employee does not exist. Try again',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Employee does not exist. Try again'
                }
              }
            }
          }
        }
      }
    },
    '/articles/:id': {
      get: {
        tags: ['Articles operations'],
        description: 'View an article detail',
        operationId: 'viewPost',
        parameters: [
          {
            name: 'articleId',
            in: 'header',
            schema: {
              $ref: '#/components/schemas/articleId'
            },
            required: true,
            description: 'Id of the article you want to view detail'
          }
        ],
        responses: {
          '200': {
            description: 'Employee successfully connected'
          },
          '404': {
            description: 'Employee does not exist. Try again',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Employee does not exist. Try again'
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ['Articles operations'],
        description: 'Edit an article',
        operationId: 'editPost',
        parameters: [
          {
            name: 'articleId',
            in: 'header',
            schema: {
              $ref: '#/components/schemas/articleId'
            },
            required: true,
            description: 'Id of the article you want to edit'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  title: {
                    $ref: '#/components/schemas/title',
                  }
                }
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Employee successfully connected'
          },
          '404': {
            description: 'Employee does not exist. Try again',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Employee does not exist. Try again'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Articles operations'],
        description: 'Delete an article',
        operationId: 'delPost',
        parameters: [
          {
            name: 'articleId',
            in: 'header',
            schema: {
              $ref: '#/components/schemas/articleId'
            },
            required: true,
            description: 'Id of the article you want to edit'
          }
        ],
        responses: {
          '200': {
            description: 'Employee successfully connected'
          },
          '404': {
            description: 'Employee does not exist. Try again',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Employee does not exist. Try again'
                }
              }
            }
          }
        }
      }
    },
    '/articles/:id/comments': {
      post: {
        tags: ['Articles operations'],
        description: 'Create an article',
        operationId: 'newPost',
        security: {
          bearerAuth: []
        },
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                  $ref: '#/components/schemas/comment',
              }
            }
          },
          required: true
        },
        responses: {
          '201': {
            description: 'new article successfully created'
          },
          '404': {
            description: 'Employee does not exist. Try again',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Employee does not exist. Try again'
                }
              }
            }
          }
        }
      }
    },
  },
  components: {
    schemas: {
      firstName: {
        type: 'string',
        example: 'Sarah'
      },
      lastName: {
        type: 'string',
        example: 'Lifaefi'
      },
      email: {
        type: 'string',
        example: 'saratila@pm.cd'
      },
      password: {
        type: 'string',
        example: 'S52()-arah'
      },
      articleId: {
        type: 'integer',
        example: 1,
      },
      title: {
        type: 'string',
        example: 'My first title'
      },
      article: {
        type: 'string',
        example: 'Lorem ipsum lorem ipsum'
      },
      comment: {
        type: 'string',
        example: 'This is a comment'
      },

      User: {
        type: 'object',
        properties: {
          firstName: {
            $ref: '#/components/schemas/firstName',
          },
          lastName: {
            $ref: '#/components/schemas/lastName',
          },
          email: {
            $ref: '#/components/schemas/email'
          },
          password: {
            $ref: '#/components/schemas/password'
          }
        }
      },
      Users: {
          $ref: '#/components/schemas/User'
      },
      Article: {
        type: 'object',
        properties: {
          title: {
            $ref: '#/components/schemas/title',
          },
          article: {
            $ref: '#/components/schemas/article',
          },
        }
      },
      Articles: {
        $ref: '#/components/schemas/Article'
    },
      Error: {
        type: 'object',
        properties: {
          status: {
            type: 'integer'
          },
          success: {
            type: 'string'
          },
          error: {
            type: 'string'
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
         in: 'header',
        name: 'token',
        bearerFormat: 'JWT'
      }
    }
  }
};
