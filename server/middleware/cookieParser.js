const parseCookies = (req, res, next) => {
  var cooky = req.headers.cookie;
  req.cookies = {};

  if (cooky !== undefined) {
    cooky = cooky.split('; ');
    for (var i = 0; i < cooky.length; i++) {
      var baking = cooky[i].split('=');
      req.cookies[baking[0]] = baking[1];
    }
  }
  next();
};

module.exports = parseCookies;