import { HomePageTabShelfItem } from "./homePageTabShelfItem";
export class HomePageTabShelfItems {
  parent;

  constructor(parent) {
    this.parent = parent;
  }

  getContainerElement() {
    return this.parent.getContainerElement();
  }

  itemAtIndex(index) {
    return new HomePageTabShelfItem(
      this.getContainerElement().children("li").eq(index)
    );
  }

  allItems() {
    return this.getContainerElement().children("li");
  }

  numbItems() {
    return this.allItems().then(($items) => {
      return $items.length;
    });
  }

  /**
   * Not sure that this one is worth the effort.  If you do anything with promises
   * (e.g. a "then"), the each loop ends before you hit the callback for the "then",
   * and then item and index are out of context and you can't access them (you have
   * no access to item or the index that the item was at, so you can't really do
   * anything with the item that was the purpose of the iteration :-( )
   *
   */
  // each(fn, args) {
  //   return this.getContainerElement()
  //     .children("li")
  //     .each(($el, index) => {
  //       let item = new HomePageTabShelfItem($el);
  //       fn(item, index, ...args); //args can be accessed from within the lambda as arguments[(2 onwards)]
  //     });
  // }
  //
  //  EXAMPLE
  //
  // var itemIndexes = [];
  // homePage.tabs
  //   .getTabByLabel("Best Sellers")
  //   .click()
  //   .getShelf()
  //   .getShelfItems()
  //   .each(
  //     (item, index, itemIndexes) => {
  //       item.getPrice().then((res) => {
  //         if (Number(res.price) < 30) {
  //           // item.click(); // can't do this, no access to item here
  //           // itemIndexes.add(index); //can't do this, no access to itemIndexes or index
  //         }
  //       });
  //     },
  //     [itemIndexes]
  //   );
}
