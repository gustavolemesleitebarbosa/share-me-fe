"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUserId = exports.fetchUser = void 0;

var fetchUser = function fetchUser() {
  return localStorage.getItem('user') !== undefined ? localStorage.getItem('user') : localStorage.clear();
};

exports.fetchUser = fetchUser;

var fetchUserId = function fetchUserId() {
  return localStorage.getItem('client_id') !== undefined ? localStorage.getItem('client_id') : localStorage.clear();
};

exports.fetchUserId = fetchUserId;