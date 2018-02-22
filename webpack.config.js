var webpack = require("webpack")

module.exports = {
  entry: __dirname + "/client/client.jsx",
  devtool: 'source-map',
  output: {
    path: __dirname + '/public/dist/',
    publicPath: "/dist/",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: [/\.js$/, /\.es6$/, /\.jsx$/], exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'stage-0', 'react'] } },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/,loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+|\?[\=\.a-z0-9]+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./[name].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+|\?[\=\.a-z0-9]+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./[name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+|\?[\=\.a-z0-9]+)?$/, loader: 'file-loader?name=./[name].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+|\?[\=\.a-z0-9]+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=./[name].[ext]' }
    ]
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [__dirname + "/assets/sass"]
        }
      }
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      output: {comments: false},
      sourceMap: false
    })
  )
}
