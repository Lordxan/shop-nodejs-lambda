/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

/** @returns {import('webpack').Configuration} */
module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'class-transformer',
    'class-transformer/storage',
    '@prisma/client',
  ];

  return {
    ...options,
    output: {
      ...options.output,
      path: path.join(__dirname, './dist'),
      libraryTarget: 'commonjs2',
    },
    externals: [],
    plugins: [
      ...options.plugins,
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
      new CopyPlugin({
        patterns: [
          './prisma/schema.prisma',
          {
            from: 'node_modules/**/libquery_engine-rhel-openssl-*',
            to: '[name][ext]',
          },
        ],
      }),
    ],
  };
};
