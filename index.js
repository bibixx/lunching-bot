require('dotenv').config();
const getProduct = require('./getCurrentProduct');

const order = require("./order");

(async () => {
  const [place, product] = await getProduct();

  if (!place || !product) {
    return console.log("There are no more products to order!");
  }
  console.log(`Ordering „${product}” from „${place}”`);

  await order(place, product);
  console.log(`Ordered „${product}” from „${place}” successfully`);
})();
