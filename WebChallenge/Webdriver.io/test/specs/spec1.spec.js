//async mode in webdriverio not working atm https://webdriver.io/docs/sync-vs-async/

const assert = require("chai").assert;
const HomePage = require("../models/pages/home");
const tabToSelect = "BEST SELLERS";

async function addItemToCart(shelfItem) {
  let name = await shelfItem.getName();
  it(`adding "${name}" to shelf`, async () => {
    let name = await shelfItem.getName();
    console.log(name);
    // await shelfItem.hover();
  });
}

describe("main routine", () => {
  const homePage = new HomePage();

  before(() => {
    homePage.open();
  });

  it(`tabs control should exist`, async () => {
    let tabs = await homePage.getTabs();
    await expect(tabs.$el).toExist();
  });

  it(`clicking on the ${tabToSelect} tab should select it`, async () => {
    let tabs = await homePage.getTabs();
    let tab = await tabs.getTabByDisplayedText(tabToSelect);
    await tab.click();
    let shelf = await tab.getShelf();
    await expect(shelf.$el).toExist();
    await shelf.scrollIntoView();
    let shelfIsVisible = await shelf.isVisible();
    assert.isTrue(
      shelfIsVisible,
      "Shelf related to selected tab is not visible"
    );
  });

  it("iterate through and add items to cart", async () => {
    let tabs = await homePage.getTabs();
    let tab = await tabs.getTabByDisplayedText(tabToSelect);
    await tab.click();
    let shelf = await tab.getShelf();
    let allShelfItems = await shelf.getAllItems();
    for (let i = 0; i < allShelfItems.length; i++) {
      let shelfItem = allShelfItems[i];
      let price = Number(await shelfItem.getPriceString());
      if (price <= 30) {
        await addItemToCart(shelfItem);
      }
    }
  });
});

// describe("Simple test", () => {
//   it("should load the home page", async () => {
//     let homePage = new HomePage();
//     await homePage.open();
//     let tabs = await homePage.getTabs();
//     await expect(tabs.$el).toExist();
//     await expect(tabs.$el.$("a.blockbestsellers")).toExist();
//     await tabs.click();
//     let myTab = await tabs.getTabByDisplayedText("BEST SELLERS");
//     await expect(myTab.$el).toExist();
//     await myTab.click();
//     let shelf = await myTab.getShelf();
//     await expect(shelf.$el).toExist();
//     let shelfItem = await shelf.getItemAtIndex(0);
//     let price = await shelfItem.getPriceString();
//     let name = await shelfItem.getName();
//     console.log("blah");
//     // let allShelfItems = await shelf.getAllItems();
//     // for (let i = 0; i < allShelfItems.length; i++) {
//     //   //       let shelfItem = allShelfItems[i];
//     //   let price = await allShelfItems[i].getPrice();
//     //   if (price <= 30) {
//     //     let name = await allShelfItems[i].getName();
//     //     it(`adding "${name}" to shelf`, async () => {
//     //       await allShelfItems[i].hover();
//     //     });
//     //   }
//     // }
//   });
// });
