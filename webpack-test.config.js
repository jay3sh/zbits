
const path = require('path');

module.exports = {
  entry : "./test/index",
  output : {
    path : path.resolve(__dirname, "build"),
    filename : "zbits-test.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
