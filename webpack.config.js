module.exports = {
  entry: [
    "./source/App.js"
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devServer: {
    inline: true
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015", "react"]
      }
    }]
  }
};
