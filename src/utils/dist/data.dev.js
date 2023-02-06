"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSavedPinsQuery = exports.userCreatedPinsQuery = exports.userQuery = exports.searchQuery = exports.pinDetailMorePinQuery = exports.pinDetailQuery = exports.feedQuery = exports.categories = void 0;
var categories = [{
  name: 'cars',
  image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg'
}, {
  name: 'fitness',
  image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg'
}, {
  name: 'wallpaper',
  image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg'
}, {
  name: 'websites',
  image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg'
}, {
  name: 'photo',
  image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg'
}, {
  name: 'food',
  image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg'
}, {
  name: 'nature',
  image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg'
}, {
  name: 'art',
  image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg'
}, {
  name: 'travel',
  image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg'
}, {
  name: 'quotes',
  image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg'
}, {
  name: 'cats',
  image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg'
}, {
  name: 'dogs',
  image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg'
}, {
  name: 'other',
  image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg'
}];
exports.categories = categories;
var feedQuery = "*[_type == \"pin\"] | order(_createdAt desc) {\n  image{\n    asset->{\n      url\n    }\n  },\n      _id,\n      destination,\n      postedBy->{\n        _id,\n        userName,\n        image\n      },\n      save[]{\n        _key,\n        postedBy->{\n          _id,\n          userName,\n          image\n        },\n      },\n    } ";
exports.feedQuery = feedQuery;

var pinDetailQuery = function pinDetailQuery(pinId) {
  var query = "*[_type == \"pin\" && _id == '".concat(pinId, "']{\n    image{\n      asset->{\n        url\n      }\n    },\n    _id,\n    title, \n    about,\n    category,\n    destination,\n    postedBy->{\n      _id,\n      userName,\n      image\n    },\n   save[]{\n      postedBy->{\n        _id,\n        userName,\n        image\n      },\n    },\n    comments[]{\n      comment,\n      _key,\n      postedBy->{\n        _id,\n        userName,\n        image\n      },\n    }\n  }");
  return query;
};

exports.pinDetailQuery = pinDetailQuery;

var pinDetailMorePinQuery = function pinDetailMorePinQuery(pin) {
  var query = "*[_type == \"pin\" && category == '".concat(pin.category, "' && _id != '").concat(pin._id, "' ]{\n    image{\n      asset->{\n        url\n      }\n    },\n    _id,\n    destination,\n    postedBy->{\n      _id,\n      userName,\n      image\n    },\n    save[]{\n      _key,\n      postedBy->{\n        _id,\n        userName,\n        image\n      },\n    },\n  }");
  return query;
};

exports.pinDetailMorePinQuery = pinDetailMorePinQuery;

var searchQuery = function searchQuery(searchTerm) {
  var query = "*[_type == \"pin\" && title match '".concat(searchTerm, "*' || category match '").concat(searchTerm, "*' || about match '").concat(searchTerm, "*']{\n        image{\n          asset->{\n            url\n          }\n        },\n            _id,\n            destination,\n            postedBy->{\n              _id,\n              userName,\n              image\n            },\n            save[]{\n              _key,\n              postedBy->{\n                _id,\n                userName,\n                image\n              },\n            },\n          }");
  return query;
};

exports.searchQuery = searchQuery;

var userQuery = function userQuery(userId) {
  var query = "*[_type == \"user\" && _id == '".concat(userId, "']");
  return query;
};

exports.userQuery = userQuery;

var userCreatedPinsQuery = function userCreatedPinsQuery(userId) {
  var query = "*[ _type == 'pin' && userId == '".concat(userId, "'] | order(_createdAt desc){\n    image{\n      asset->{\n        url\n      }\n    },\n    _id,\n    destination,\n    postedBy->{\n      _id,\n      userName,\n      image\n    },\n    save[]{\n      postedBy->{\n        _id,\n        userName,\n        image\n      },\n    },\n  }");
  return query;
};

exports.userCreatedPinsQuery = userCreatedPinsQuery;

var userSavedPinsQuery = function userSavedPinsQuery(userId) {
  var query = "*[_type == 'pin' && '".concat(userId, "' in save[].userId ] | order(_createdAt desc) {\n    image{\n      asset->{\n        url\n      }\n    },\n    _id,\n    destination,\n    postedBy->{\n      _id,\n      userName,\n      image\n    },\n    save[]{\n      postedBy->{\n        _id,\n        userName,\n        image\n      },\n    },\n  }");
  return query;
};

exports.userSavedPinsQuery = userSavedPinsQuery;