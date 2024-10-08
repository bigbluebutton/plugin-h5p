module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'H5pPlugin.js',
    library: 'H5pPlugin',
    libraryTarget: 'umd',
    publicPath: '/static/',
    globalObject: 'this',
  },
  devServer: {
    allowedHosts: 'all',
    port: 4701,
    host: 'localhost',
    hot: false,
    liveReload: false,
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|lib\/h5p-standalone|lib\/h5p-standalone-from-tunapanda/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules|lib\/h5p-standalone|lib\/h5p-standalone-from-tunapanda/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
};
