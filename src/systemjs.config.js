/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
  //   node: {
  //    crypto: true,
  //  },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      'crypto': 'node_modules/crypto-js',
      // 'wsse': 'node_modules/wsse',
    
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      "crypto": {
        "main":"index.js",
        "defaultExtension": "js"
      },
      // "wsse": {
      // "main":"index.js",
      //   "defaultExtension": "js"
      // },
      
    },

  });

})(this);
