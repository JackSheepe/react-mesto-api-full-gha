const { addBabelPlugins } = require("customize-cra");

module.exports = {
  webpack: function (config) {
    return addBabelPlugins([
      "@babel/plugin-proposal-private-property-in-object",
      { loose: true },
    ])(config);
  },
};
