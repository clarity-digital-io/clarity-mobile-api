"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openRealm = exports.main = void 0;

var _realm = _interopRequireDefault(require("realm"));

var _schema = require("./schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SERVER_URL = 'https://clarity-forms-development.us2a.cloud.realm.io';
var REALM_URL = 'realms://clarity-forms-development.us2a.cloud.realm.io';

var main = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(realm, app) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return openRealm();

          case 3:
            realm = _context.sent;
            app.emit('ready');
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log('error', _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function main(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.main = main;

var openRealm = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
    var idToken, adminUser, config;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            idToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFqUXpNVUl6T0RNd09FWXlORFZCUlVFek1UaEdOMFZDTXprM04wWkVOa1UxUmpBME16azBNUSJ9.eyJodHRwczovL2NsYXJpdHlmb3Jtcy5pby9vcmciOiIwMEQ4QTAwMDAwMENLclpVQVciLCJodHRwczovL2NsYXJpdHlmb3Jtcy5pby9pbnN0YW5jZSI6Imh0dHBzOi8vbm9zb2Z0d2FyZS1hYmlsaXR5LTg3NC1kZXYtZWQuY3M0NS5teS5zYWxlc2ZvcmNlLmNvbSIsImlzcyI6Imh0dHBzOi8vZGV2LWd6Y291NXNnLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJzYWxlc2ZvcmNlLXNhbmRib3h8MDA1OEEwMDAwMDRhMWtmUUFBIiwiYXVkIjoiY2xtMlRkU3liT2M2aE05MUNzSmpUc1Y2bFFhemlUM3AiLCJpYXQiOjE1OTEzODM4NDIsImV4cCI6MTU5MTQxOTg0Mn0.pem0cVYu4w7rxOumRU8EFL4zMmxxDeDebsSasyg4PTEDhSKOFeFEm4JlZK0PQrjzQN2jmb8wLe3l8H430EMYdxqurziYIPuWGhQ8dTqG7Lg_ypMAJTYHmrtVJWpq9_0iBuqzvIwImT2lXjDiGUSzT0ogPb4W5K5AC6AzxkHjhb2FzICQhf3tQXwzK-0B7Uymcqop6hIes42RgXjtQISJDpUv9Ly9zRAnu7UgY1F0t93KBxr5WK5rM3woztWBNaYsyVIh22M7ClBI5rlZm5xW_h7WS19wDxl6nNE6-83E0y_SO3HJ5IE7tguTrAek3plSHwyC148IP6iCLcUlaeGwGw';
            _context2.next = 4;
            return _realm["default"].Sync.User.login(SERVER_URL, _realm["default"].Sync.Credentials.custom('jwt', idToken));

          case 4:
            adminUser = _context2.sent;
            config = {
              sync: {
                user: adminUser,
                url: REALM_URL + '/~/userRealm',
                fullSynchronization: true,
                validate_ssl: false
              },
              schema: [_schema.FormSchema, _schema.ResponseSchema]
            };
            return _context2.abrupt("return", _realm["default"].open(config).progress(function (transferred, transferable) {
              console.log('progress', transferred, transferable);
            }).then(function (realm) {
              return realm;
            })["catch"](function (e) {
              console.log('trying to open', e);
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log('error', _context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function openRealm(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.openRealm = openRealm;