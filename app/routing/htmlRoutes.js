var path = require("path");

module.exports = function(app) {

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  app.get('/api/friends', function(req, res) {
    var file = path.resolve(__dirname, '/../data/friends.json');
    res.sendFile(file);
  });
};
