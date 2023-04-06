const bcrypt = require("bcrypt");

module.exports = {
  friendlyName: "Hash password",
  description: "Hash a password using bcrypt.",
  inputs: {
    password: {
      type: "string",
      friendlyName: "Password",
      description: "A plain-text password to hash.",
      required: true,
    },
  },
  fn: async function (inputs, exits) {
    const hashedPassword = await bcrypt.hash(inputs.password, 10);
    return exits.success(hashedPassword);
  },
};
