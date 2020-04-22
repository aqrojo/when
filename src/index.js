module.exports = (function() {
  var result = false;
  var fn = function() {};

  fn.prototype.case = function(x, pred) {
    if (result) return this;
    if (x) result = pred;
    return this;
  };

  fn.prototype.resolve = function(pred) {
    var value = result || pred || false;
    result = false;
    return typeof value === 'function' ? value() : value;
  };

  return new fn();
})();
