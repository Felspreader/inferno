import bublePlugin from 'rollup-plugin-buble';

import commonjs from 'rollup-plugin-commonjs';

import nodeResolve from 'rollup-plugin-node-resolve';

import replacePlugin from 'rollup-plugin-replace';

import { terser } from 'rollup-plugin-terser';

import { aliasPlugin } from './alias.js';

export function createPlugins(version, options) {
  const plugins = [
    aliasPlugin,
    nodeResolve({
      extensions: ['.js', '.json'],
      mainFields: ['module', 'main'],
      preferBuiltins: true
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ];

  if (!options.esnext) {
    plugins.push(bublePlugin());
  }

  const replaceValues = {
    'process.env.INFERNO_VERSION': JSON.stringify(options.version)
  };

  if (options.replace) {
    replaceValues['process.env.NODE_ENV'] = JSON.stringify(options.env);
  }

  plugins.push(replacePlugin(replaceValues));

  if (options.minify) {
    plugins.push(
      terser({
        compress: {
          ecma: 5,
          inline: true,
          if_return: false,
          reduce_funcs: false,
          passes: 5,
          comparisons: false
        },
        ie8: false,
        mangle: {
          toplevel: true
        },
        parse: {
          html5_comments: false,
          shebang: false
        },
        toplevel: false,
        warnings: false
      })
    );
  }

  return plugins;
}
