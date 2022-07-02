class Checkbox {
  constructor(selector) {
    this.selector = selector;
  }

  set(value) {
    $(this.selector).click();
    $(this.selector).isSelected();
  }
}

module.exports = { Checkbox };
