const ShelfItem = require("./shelfItem");
module.exports = class Shelf {
  index;
  $el;
  constructor(shelf) {
    this.index = shelf.index;
    this.$el = shelf.$el;
  }

  async scrollIntoView() {
    await this.$el.scrollIntoView();
  }

  async isVisible() {
    return await this.$el.isDisplayedInViewport();
  }

  async getItemAtIndex(index) {
    let item = await this.$el.$(`li:nth-child(${index + 1})`);
    return new ShelfItem({ index: index, $el: item });
  }

  async getAllItems() {
    let items = await this.$el.$$("li");
    let shelfItems = [];
    for (var i = 0; i < items.length; i++) {
      shelfItems.push(new ShelfItem({ index: i, $el: items[i] }));
    }
    return shelfItems;
  }
};
