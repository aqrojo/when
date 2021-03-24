export default (function() {
  const fn = function({ debug = false, unique = false } = {}) {
    this.result = false;
    this.caseCounter = 0;
    this.matchedCase = null;
    this.unique = unique;
    this.debug = debug;
  };

  fn.prototype.init = function({ debug = false } = {}) {
    console.log('se crea nueva instancia');
    return new fn({ debug, unique: true });
  };

  fn.prototype.reset = function() {
    this.result = false;
    this.caseCounter = 0;
    this.matchedCase = null;
  };

  fn.prototype.case = function(x, value) {
    const instance = fn.unique ? fn : fn.init({debug: fn.debug})
    instance.caseCounter += 1;
    if (instance.result) return instance;
    if (x) {
      instance.result = value;
      instance.matchedCase = instance.caseCounter;
    }
    return instance;
  };

  fn.prototype.trace = function() {
    const r = typeof this.result === 'function' ? this.result() : this.result;
    console.log('result ::: ', r);
    console.log('matched case ::: ', this.matchedCase);
    return this;
  };

  fn.prototype.resolve = function() {
    const value = arguments.length > 0 ? arguments[0] : false;
    const returned = this.result !== false ? this.result : value;
    if (this.debug) this.trace();
    this.reset();
    return typeof returned === 'function' ? returned() : returned;
  };

  return new fn({})
})();
