// webpack.config.js
module.exports = {
  // other webpack configurations...

  module: {
    rules: [
      // Add a rule for handling binary files
      {
        test: /\.node$/,
        use: "file-loader",
      },
    ],
  },
};
