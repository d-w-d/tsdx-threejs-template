/**
 * This let's you customize externals bundling
 * See here for notes: https://github.com/formium/tsdx/issues/898
 */

module.exports = {
  rollup(config) {
    // -------->>>

    if (config.output.format === 'umd') {
      /**
       * Modify the `external` method
       * Returning false means "DO bundle this"
       */
      const origExternal = config.external;
      config.external = id => {
        if (id.startsWith('three/examples/')) return false;
        if (id === 'three' && process.env.BUNDLE_THREE) return false;
        return origExternal(id);
      };
      config.output.globals['three'] = 'THREE';
    }

    if (config.output.format === 'esm') {
      // Don't bother bundling into esm
      // Leave it to the consumer app to do the bundling
    }

    if (config.output.format === 'cjs') {
      // Don't bother bundling into cjs
      // Leave it to the consumer app to do the bundling
    }

    return config;
  },
};
