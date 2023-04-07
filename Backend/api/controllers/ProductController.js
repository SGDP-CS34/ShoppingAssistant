/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const RecommenderService = require("../../services/RecommenderService");

module.exports = {
  recommendations: async function (req, res) {
    let user = null;
    if (req.header("authorization")) {
      user = await sails.helpers.verifyJwt(req);
    }

    const { gender, masterCategory, season, usePurchaseHistory } = req.body;
    const query = {
      and: [],
    };

    if (gender && gender.length > 0) {
      query.and.push({ gender: { in: gender } })
    }

    if (masterCategory && masterCategory.length > 0) {
      query.and.push({ masterCategory: { in: masterCategory } })
    }

    if (season && season.length > 0) {
      query.and.push({ season: { in: season } })
    }

    let products = []

    // if user is logged in, get products from purchase history and purchase history is true
    if (user && usePurchaseHistory) {
      const purchaseHistory = await PurchaseHistory.find({ buyer: user.id });
      products = await Product.find({ id: purchaseHistory.map((purchase) => purchase.product) });
      // if no products found, get products from query
      if (products.length == 0) {
        products = await Product.find(query);
      }
    } else {
      products = await Product.find(query);
    }

    if (products.length == 0) {
      res.send([]);
      return
    }
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const recommendations = await RecommenderService.getRecommendations(
      randomProduct.id.toString()
    );
    const productIDs = recommendations.map((recommendation) => {
      return recommendation.productID;
    });
    const recommendedProducts = await Product.find({ id: productIDs });
    res.send(recommendedProducts);
  },
  productRecommendations: async function (req, res) {
    const { id } = req.params;
    const recommendations = await RecommenderService.getRecommendations(
      id.toString()
    );
    const productIDs = recommendations.map((recommendation) => {
      return recommendation.productID;
    });
    const products = await Product.find({ id: productIDs });
    res.send(products);
  },
};
