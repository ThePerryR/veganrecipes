module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          include: ['@babel/plugin-proposal-object-rest-spread'],
          useBuiltIns: 'entry',
          targets: { node: 'current' },
          corejs: { version: 3, proposals: true }
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ['babel-plugin-styled-components', { displayName: true, fileName: true }]
    ],
    env: {
      /* Production Plugins */
      production: {
        plugins: [
          ['babel-plugin-styled-components', { displayName: false, fileName: false }]
        ]
      },
      /* Test Only Plugins */
      test: {
        plugins: [
          'babel-plugin-styled-components',
          'transform-es2015-modules-commonjs'
        ]
      }
    }
  }
}
