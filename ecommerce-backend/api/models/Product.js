/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: "string",
      required: true,
      isNotEmptyString: true,
    },
    price: {
      type: "number",
      required: true,
    },
    color: {
      type: "string",
      defaultsTo: "N/A",
    },
    gender: {
      type: "string",
      required: true,
      isIn: ["Men", "Women", "Unisex", "Boys", "Girls"],
    },
    masterCategory: {
      type: "string",
      required: true,
      isIn: ["Apparel", "Footwear", "Accessories", "Personal Care", "Free Items"],
    },
    subCategory: {
      type: "string",
      required: true,
    },
    articleType: {
      type: "string",
      required: true,
    },
    season: {
      type: "string",
      defaultsTo: "Summer",
      isIn: ["Summer", "Winter", "Spring", "Fall"],
    },
    year: {
      type: "number",
      required: true,
    },
    productImageURL: {
      type: "string",
      required: true,
      isURL: true,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    buyers: {
      collection: "user",
      via: "product",
      through: "purchasehistory",
    },
  },
};
