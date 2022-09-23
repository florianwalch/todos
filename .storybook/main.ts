import type { StorybookConfig } from '@storybook/core-common';

const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

// storybook config
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-coverage',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        transcludeMarkdown: true,
      },
    },
  ],

  framework: '@storybook/react',

  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true,
    enableCrashReports: false,
  },

  // enable features
  features: {
    babelModeV7: true,
    interactionsDebugger: true,
  },

  typescript: {},

  // add custom webpack config
  webpackFinal: async (config) => {
    return {
      ...config,

      resolve: {
        ...config.resolve,
        plugins: [
          ...(config.resolve?.plugins || []),
          new TsconfigPathsPlugin(),
        ],
      },
    };
  },
};

module.exports = config;
