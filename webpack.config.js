const path = require('path');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const UnusedWebpackPlugin = require('unused-webpack-plugin');

const enableWebPackBundleAnalyzer = false;

const webpackOpts = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: `[name].chunk.js`,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new UnusedWebpackPlugin({
      // Source directories
      directories: [path.join(__dirname, 'src')],
      // Exclude patterns
      exclude: [
        '/graphql/**',
        '/stories/**',
        '*.stories.*',
        '*.test.*',
        '*.d.ts',
      ],
      root: __dirname,
    }),
    new CopyPlugin({
      patterns: [{ from: 'static', to: 'static' }],
    }),
  ],
};

const webpackDevOpts = {
  ...webpackOpts,
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
  },
};

const webpackProdOpts = {
  ...webpackOpts,
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: { ascii_only: true },
        },
      }),
    ],
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
};

module.exports = (env, args) => {
  const config = args.mode === 'production' ? webpackProdOpts : webpackDevOpts;

  if (enableWebPackBundleAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
