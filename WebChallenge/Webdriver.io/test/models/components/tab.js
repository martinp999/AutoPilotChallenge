const Shelf = require("./shelf");
module.exports = class Tab {
  index;
  $el;

  constructor(tab) {
    this.index = tab.index;
    this.$el = tab.$el;
  }

  async click() {
    return await this.$el.click();
  }

  async getShelf() {
    let shelves = await $$("div.tab-content ul");
    return new Shelf({ $el: shelves[this.index], index: this.index });
  }
};
