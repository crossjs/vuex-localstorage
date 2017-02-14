import { argv } from 'yargs'

const debug = require('debug')('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../../', // project root in relation to bin/karma.js
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    './node_modules/sinon/pkg/sinon.js',
    {
      pattern: './test/unit/index.js',
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha', 'es6-shim'],
  preprocessors: {
    'test/unit/index.js': ['webpack', 'sourcemap']
  },
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
    reporters: [
      { type: 'text-summary' },
      { type: 'lcov', dir: 'coverage' }
    ]
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: ['.js'],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        }
      ]
    }
  },
  webpackMiddleware: {
    noInfo: true
  }
}

export default cfg => cfg.set(karmaConfig)
