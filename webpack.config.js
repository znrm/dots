const path = require('path');

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map'
};
