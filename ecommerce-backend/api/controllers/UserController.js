/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    let { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.badRequest(
        "Invalid request, email, name and password are required"
      );
    }
    password = await sails.helpers.hashPassword(password);
    await User.create({ email, name, password });
    res.send("User created");
  },
  login: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.badRequest("Invalid request, email and password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.badRequest("User not found");
    }
    const passwordsMatch = await sails.helpers.comparePasswords(
      password,
      user.password
    );
    if (!passwordsMatch) {
      return res.badRequest("Invalid password");
    }
    res.send({
      token: await sails.helpers.generateJwt(user),
      user,
      expiresAt: Date.now() + sails.config.custom.jwtExpiresIn,
    });
  },
};
