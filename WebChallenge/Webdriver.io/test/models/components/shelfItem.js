module.exports = class ShelfItem {
  index;
  $el;

  constructor(shelfItem) {
    this.index = shelfItem.index;
    this.$el = shelfItem.$el;
  }

  async scrollIntoView() {
    await this.$el.scrollIntoView();
  }

  async getSize() {
    return await this.$el.getSize();
  }

  async hover() {
    let size = await this.getSize();
    await this.scrollIntoView();
    await this.$el.moveTo({
      xOffset: size.width / 2,
      yOffset: size.height / 2,
    });
  }

  async getPrice() {
    let $el = await this.$el.$("[itemprop='price']");
    let text = await $el.getHTML(false);
    let res = text.match(/(\d)*\.(\d){2}/);
    let strPrice = res[0];
    return new Promise((resolve) => resolve(Number(strPrice)));
  }

  async getName() {
    let $el = await this.$el.$("[itemprop='name'] a");
    let text = await $el.getAttribute("title");
    return text;
  }

  async getClickableElement() {
    return await this.$el.$(".product-image-container");
  }
};
