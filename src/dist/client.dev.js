"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlFor = exports.client = void 0;

var _client = _interopRequireDefault(require("@sanity/client"));

var _imageUrl = _interopRequireDefault(require("@sanity/image-url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var client = (0, _client["default"])({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-01-30',
  useCdn: false,
  token: process.env.REACT_APP_SANITY_TOKEN
});
exports.client = client;
var builder = (0, _imageUrl["default"])(client);

var urlFor = function urlFor(source) {
  return builder.image(source);
};

exports.urlFor = urlFor;