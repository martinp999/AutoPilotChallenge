const Tab = require("./tab");
module.exports = class Tabs {
  $el;

  constructor(el) {
    this.$el = el;
  }

  async click() {
    return await this.$el.click();
  }

  async getTabByDisplayedText(text) {
    let tabs = await this.getAllTabs();
    return tabs[text];
  }

  async getAllTabs() {
    let items = await this.$el.$$("li");
    let tabs = {};
    for (var i = 0; i < items.length; i++) {
      let label = await items[i].getText();
      tabs[label] = new Tab({
        index: i,
        $el: items[i],
      });
    }
    return tabs;
  }
};
