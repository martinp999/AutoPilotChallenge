class QuickView {
  async switchTo() {
    let iframe = await $(".fancybox-iframe");
    return await browser.switchToFrame(iframe);
  }

  async close() {
    let addToCartBtn = await $("a.fancybox-close");
    return await addToCartBtn.click();
  }

  async clickAddToCartButton() {
    let timeout = 3000;
    let btn = await $("#add_to_cart");
    await btn.waitForClickable({
      timeout: timeout,
      timeoutMsg: `element for AddToCartButton was not clickable within the timeout of ${timeout} ms`,
    });
    return await btn.click();
  }

  async setQuantity(quantity) {
    let timeout = 3000;
    let quantityInput = await $("#quantity_wanted");
    await quantityInput.waitForClickable({
      timeout: timeout,
      timeoutMsg: `input element for quantity was not clickable within the timeout of ${timeout} ms`,
    });
    return await quantityInput.setValue(quantity);
  }
}
module.exports = QuickView;
