const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, "css-loader"];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: filename("js"),
    path: path.join(__dirname, "/dist"),
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: cssLoaders("postcss-loader"),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
      },
    ],
  },
};
