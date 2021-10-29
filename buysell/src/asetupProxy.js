const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/dealer/findAllDealers", { target: "http://localhost:3050/" }));
  // app.use(proxy("/api/", { target: "http://localhost:5000/" }));
  // app.use(proxy("/profile/", { target: "http://localhost:5000/" }));
  // app.use(proxy("/posts/", { target: "http://localhost:5000/" }));
};
