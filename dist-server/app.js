"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import bodyParser from 'body-parser';
// import initRouter from './routes/init';
// import formsRouter from './routes/forms';
var PORT = process.env.PORT || 5000;
var app = (0, _express["default"])();
var realm;
app.listen(PORT, function () {
  return console.log("App listening on port ".concat(PORT, "!"));
}); // app.use('/:organizationId/init', initRouter);
// app.use('/:organizationId/forms', formsRouter);
// export default app;