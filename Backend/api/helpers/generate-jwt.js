const jwt = require("jsonwebtoken");

// generates a JWT token for the user
module.exports = {
  friendlyName: "Generate JWT",
  description: "Generate a JWT token for the user.",
  inputs: {
    user: {
      type: "ref",
      description: "The user object.",
      required: true,
    },
  },
  fn: function (inputs, exits) {
    const token = jwt.sign(
      {
        id: inputs.user.id,
        email: inputs.user.email,
        name: inputs.user.name,
      },
      sails.config.custom.jwtSecret,
      {
        expiresIn: sails.config.custom.jwtExpiresIn,
      }
    );
    return exits.success(token);
  },
};
