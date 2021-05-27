//async mode in webdriverio not working atm https://webdriver.io/docs/sync-vs-async/

const assert = require("chai").assert;
const HomePage = require("../models/pages/home");
const QuickView = require("../models/pages/quickview_overlay");
const ShoppingCartPage = require("../models/pages/shoppingCartPage");

describe("main routine", () => {
  const homePage = new HomePage();
  const tabToSelect = "BEST SELLERS";
  const addToCartThreshold = 30;
  const addTwoToCartThreshold = 20;

  let cartWidgetQuantityActual;
  let cartItemsExpected = [];
  let cartSubTotalActual;
  let cartItemsActual = [];
  let cartIsEmpty;

  before(async function () {
    this.timeout = 3600000; //1 hour
    homePage.open();
    let tabs = await homePage.getTabs();
    let tab = await tabs.getTabByDisplayedText(tabToSelect);
    await tab.click();
    let shelf = await tab.getShelf();
    let allShelfItems = await shelf.getAllItems();

    for (let i = 0; i < allShelfItems.length; i++) {
      let shelfItem = allShelfItems[i];
      let price = await shelfItem.getPrice();
      let name = await shelfItem.getName();
      console.log(price);
      if (price <= addToCartThreshold) {
        let cartItemExpected = { name: name, price: price, quantity: 1 };
        await shelfItem.hover();

        let btn = await shelfItem.getClickableElement();
        await btn.click();

        let quickview = new QuickView();
        await quickview.switchTo();
        if (price < addTwoToCartThreshold) {
          await quickview.setQuantity(2);
          cartItemExpected.quantity = 2;
        }
        await quickview.clickAddToCartButton();

        await homePage.switchTo();
        let cartDialog = await homePage.getCartDialog();
        await cartDialog.clickContinueShoppingButton();

        cartItemsExpected.push(cartItemExpected);
      }
    }
    let cartWidget = await homePage.getCartWidget();
    cartWidgetQuantityActual = await cartWidget.getQuantity();
    await cartWidget.click();
    let shoppingCartPage = new ShoppingCartPage();
    let cartSummary = await shoppingCartPage.getCartSummary();
    cartSubTotalActual = await cartSummary.getSubTotal();
    let cartItems = await cartSummary.getCartItems();
    let waitTimeForDelete = 1000;
    for (cartItem of cartItems) {
      let cartItemName = await cartItem.getProductName();
      let cartItemPrice = await cartItem.getPrice();
      let cartItemQuantity = await cartItem.getQuantity();
      cartItemsActual.push({
        name: cartItemName,
        price: cartItemPrice,
        quantity: cartItemQuantity,
      });
      waitTimeForDelete += 1000;
    }
    for (cartItem of cartItems) {
      await cartItem.clickDeleteButton();
    }
    await browser.pause(waitTimeForDelete);
    cartIsEmpty = await shoppingCartPage.isCartEmpty();
  });

  it("validate expected quantity in cart widget", () => {
    let cartWidgetQuantityExpected = cartItemsExpected.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    assert.isTrue(
      cartWidgetQuantityActual == cartWidgetQuantityExpected,
      `quantity in cart widget is not correct.  actual: ${cartWidgetQuantityActual}, expected: ${cartWidgetQuantityExpected}`
    );
  });

  it("validate cart subtotal", () => {
    let cartSubTotalExpected = cartItemsExpected.reduce((total, item) => {
      let cost = item.price * item.quantity;
      return total + cost;
    }, 0);
    assert.isTrue(
      cartSubTotalActual == cartSubTotalExpected,
      `cart subtotal is not correct.  actual: ${cartSubTotalActual}, expected: ${cartSubTotalExpected}`
    );
  });

  it("validate all cart contents", () => {
    let success = true;
    let strErrors = "";
    for (expectedItem of cartItemsExpected) {
      let item = cartItemsActual.find((i) => {
        return i.name === expectedItem.name;
      });
      if (!item) {
        success = false;
        strErrors += `item ${expectedItem.name} was not in the cart`;
        return;
      }
      if (item.price != expectedItem.price) {
        success = false;
        strErrors += `price for item ${expectedItem.name} was not correct.  actual: ${item.price}, expected: ${expectedItem.price}`;
      }
      if (item.quantity != expectedItem.quantity) {
        success = false;
        strErrors += `quantity for item ${expectedItem.name} was not correct.  actual: ${item.quantity}, expected: ${expectedItem.quantity}`;
      }
    }
    assert.isTrue(success, strErrors);
  });

  it("validate that all cart items have been deleted", () => {
    assert.isTrue(cartIsEmpty, `actual: ${cartIsEmpty}, expected: true`);
  });
});
