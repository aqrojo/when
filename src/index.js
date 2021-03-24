export default (function() {
  const fn = function({ debug = false } = {}) {
    this.result = false;
    this.caseCounter = 0;
    this.matchedCase = null;
    this.debug = debug;
  };

  fn.prototype.reset = function() {
    this.result = false;
    this.caseCounter = 0;
    this.matchedCase = null;
  };

  fn.prototype.case = function(x, value) {
    this.caseCounter += 1;
    if (this.result) return this;
    if (x) {
      this.result = value;
      this.matchedCase = this.caseCounter;
    }
    return this;
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

  return (props) => new fn(props)
})();
