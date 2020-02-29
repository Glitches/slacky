const path = require('path');

module.exports = {
  entry: ['./popup/src/scripts/index.ts'],
  output: {
    filename: 'popup.js',
    path: path.join(__dirname, '../', 'build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsxjsx|js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader']
      }
    ]
  }
};
