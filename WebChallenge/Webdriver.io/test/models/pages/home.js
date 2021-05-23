const Page = require("./page");
const Tabs = require("../components/tabs");

class HomePage extends Page {
  open() {
    return super.open("index.php");
  }

  async getTabs() {
    return new Tabs(await $("#home-page-tabs"));
  }
}

// module.exports = new HomePage();
module.exports = HomePage;
