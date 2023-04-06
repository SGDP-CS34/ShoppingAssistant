/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const products = require("../utils/products.json");

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // seed test user if there are none
  if ((await User.count()) == 0) {
    const password = await sails.helpers.hashPassword("test123");
    await User.create({
      name: 'John Doe',
      email: "test@gmail.com",
      password,
    });
  }

  // seed products if there are none
  if ((await Product.count()) == 0) {
    await Product.createEach(products);
  }
};
