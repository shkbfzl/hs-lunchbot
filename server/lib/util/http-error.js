'use strict';

function httpError(code, message) {
  var error = new Error(message);
  error.status =code;
  return error;
}

function badRequest(message) {
  return httpError(400, message || 'Bad request');
}

function notFound(message) {
  return httpError(404, message || 'Not found');
}

function internalServerError(message) {
  return httpError(500, message || 'Internal server error');
}

module.exports = {
  badRequest: badRequest,
  notFound: notFound,
  httpError: httpError,
  internalServerError: internalServerError,
  NOT_FOUND: notFound(),
  BAD_REQUEST: badRequest(),
  INTERNAL_SERVER_ERROR: internalServerError()
};
