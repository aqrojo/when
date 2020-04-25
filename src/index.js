export default (function() {
  let result = false;
  const fn = function() {};

  fn.prototype.case = function(x, value) {
    if (result) return this;
    if (x) result = value;
    return this;
  };

  fn.prototype.resolve = function() {
    const value = arguments.length > 0 ? arguments[0] : false
    const returned = result !== false ? result : value
    result = false;
    return typeof returned === 'function' ? returned() : returned;
  };

  return new fn();
})();
