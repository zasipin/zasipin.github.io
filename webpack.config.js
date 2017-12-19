var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

var NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  entry: {
    vendor: ['react', 'react-redux', 'react-dom', 'react-router-dom'],
    app: './app/app.jsx'
  },
  // entry: [
  //   './app/app.jsx'
  // ],
  externals: {
    // jquery: 'jQuery'
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
        // exclude:  ['index.html']
      }
    ),

    new ExtractTextPlugin("[hash].styles.css"),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      path: path.resolve(__dirname, 'public'),
      filename: "[hash].vendor.js"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app') + '/index.html',
      filename: 'index.html',
      inject: 'body'
    }),    
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new ManifestPlugin({
      fileName: 'assets-manifest.json'
    })
    // new webpack.ProvidePlugin({
    //  '$': 'jquery',
    //  'jQuery': 'jquery'      
    // })
    // ,

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "common",
    //   path: path.resolve(__dirname, 'public'),
    //   filename: "common.js"
    // //   // (Give the chunk a different name)

    // //   minChunks: Infinity,
    // //   // (with more entries, this ensures that no other module
    // //   //  goes into the vendor chunk)
    // })
  ],
  output: {
    //path: __dirname,
    path: path.resolve(__dirname, 'public'),
    filename: '[hash].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  resolve: {
    // root: __dirname,
    modules: [
      'node_modules',
      path.resolve(__dirname, "app/components"),
      path.resolve(__dirname, "app/api"),
      './app/components',
      './app/api'
    ],
    // extensions: [".js", ".json", ".jsx", ".css", ".scss"],
    // extensions that are used

    alias: {
      // Main: 'app/components/Main.jsx',
      app: path.resolve(__dirname, 'app'),
      applicationStyles: path.resolve(__dirname, 'app/styles/app.scss'),
      actions: path.resolve(__dirname, 'app/actions/actions.jsx'),
      reducers: path.resolve(__dirname, 'app/reducers/reducers.jsx'),
      configureStore: path.resolve(__dirname, 'app/store/configureStore.jsx'),
      AnnuitetCredit: path.resolve(__dirname, 'app/models/AnnuitetCredit.jsx'),
      AnnuitetMonthlyPayment: path.resolve(__dirname, 'app/models/AnnuitetMonthlyPayment.jsx')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    // rules: [

    // ],
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use:  [
                  {
                        loader :"css-loader",
                        options: { minimize: true }
                  },
                  {
                    loader :"sass-loader"
                  }
                ]
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
                  loader :"css-loader",
                  options: { minimize: true }
              }
        })
      },
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/        
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)$/,
      //   loader: 'file-loader?name=public/fonts/[name].[ext]'
      // },

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=40000&mimetype=application/font-woff&name=public/fonts/[name].[ext]",
         },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=public/fonts/[name].[ext]" }


      // {
      //   loader: 'sass-loader',
      //   test: /\.scss?$/,
      //   include: [
      //     path.resolve(__dirname, './node_modules/foundation-sites/scss')
      //   ]
      // }
    ],
    noParse: /(jquery)/, 
  },
  //noParse: /(jquery)/, 
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};

if(NODE_ENV == 'production'){

  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  )
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      // warnings: false,
      // drop_console: true,
      compress: {
        warnings: false,
        drop_console: false,
        unsafe: true,
      }
    })
  );
}