const bcrypt = require("bcrypt");

module.exports = {
  friendlyName: "Compare passwords",
  description:
    "Compare a plain-text password with a hashed password to see if they match.",
  inputs: {
    password: {
      type: "string",
      friendlyName: "Password",
      description: "A plain-text password to compare.",
      required: true,
    },
    hashedPassword: {
      type: "string",
      friendlyName: "Hashed password",
      description: "A hashed password to compare.",
      required: true,
    },
  },
  fn: async function (inputs, exits) {
    const match = await bcrypt.compare(inputs.password, inputs.hashedPassword);
    return exits.success(match);
  },
};
