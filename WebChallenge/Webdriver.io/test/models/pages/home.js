const Page = require("./page");
const Tabs = require("../components/tabs");
const CartDialog = require("../pages/cartDialog");
const CartWidget = require("../components/cartWidget");

module.exports = class HomePage extends Page {
  open() {
    return super.open("index.php");
  }

  async getTabs() {
    return new Tabs(await $("#home-page-tabs"));
  }

  async getCartDialog() {
    return new CartDialog(await $("#layer_cart"));
  }

  async getCartWidget() {
    return new CartWidget(await $(".shopping_cart"));
  }

  async switchTo() {
    return await browser.switchToFrame(null);
  }
};
