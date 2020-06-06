"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _init = _interopRequireDefault(require("./routes/init"));

var _forms = _interopRequireDefault(require("./routes/forms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 5000;
var app = (0, _express["default"])();
var realm;
main(realm, app);
app.use(_bodyParser["default"].json());
app.on('ready', function () {
  app.listen(PORT, function () {
    return console.log("App listening on port ".concat(PORT, "!"));
  });
});
app.use('/:organizationId/init', _init["default"]);
app.use('/:organizationId/forms', _forms["default"]);
var _default = app;
exports["default"] = _default;