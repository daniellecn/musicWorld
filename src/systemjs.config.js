/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  let map = {
    // our app is within the app folder
    'app': 'app',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/animations/browser': 'https://unpkg.com/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    // '@angular/material': 'https://rawgit.com/angular/material2-builds/master/bundles/material.umd.js',
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
    '@angular/cdk': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk.umd.js',
    '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
    '@angular/flex-layout': 'https://rawgit.com/angular/flex-layout-builds/master/bundles/flex-layout.umd.js',
    // '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
    // '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
    // '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
    // '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    // '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
    // CDK Secondary entry points
    // '@angular/cdk/a11y': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-a11y.umd.js',
    '@angular/cdk/bidi': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-coercion.umd.js',
    '@angular/cdk/keycodes': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/observers': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-observers.umd.js',
    // '@angular/cdk/platform': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-portal.umd.js',
    '@angular/cdk/rxjs': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/table': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-table.umd.js',
    '@angular/cdk/testing': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-testing.umd.js',
    '@angular/cdk/overlay': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-overlay.umd.js',
    '@angular/cdk/scrolling': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/collections': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-collections.umd.js',
    '@angular/cdk/stepper': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-stepper.umd.js',
    '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
    // CDK individual packages
    // '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
    // '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',

    // other libraries
    // 'apollo-angular':     'npm:apollo-angular/build/bundles/apollo.umd.js',
    // 'apollo-client-rxjs': 'npm:apollo-client-rxjs/apollo-rxjs.umd.js',
    // 'apollo-client-rxjs/index': 'npm:apollo-client-rxjs/apollo-rxjs.umd.js',
    // 'apollo-client/index': 'npm:apollo-client/apollo.umd.js',
    // 'apollo-client': 'npm:apollo-client/apollo.umd.js',
    // 'apollo-link-core': 'npm:apollo-link-core/lib/index.js',
    // 'whatwg-fetch': 'npm:whatwg-fetch/fetch.js',
    // 'redux': 'npm:redux/dist/redux.js',
    // 'symbol-observable': 'npm:symbol-observable/index.js',
    // 'graphql': 'npm:graphql',
    // 'graphql-anywhere': 'npm:graphql-anywhere/lib/src/index.js',
    // 'rxjs': 'npm:rxjs',
    // #docregion systemjs-apollo-client-map,
    'tslib': 'npm:tslib/tslib.js',
    'symbol-observable': 'npm:symbol-observable',
    'redux': 'npm:redux/dist/redux.min.js',
    // #enddocregion systemjs-apollo-client-map

    // #docregion systemjs-apollo-test-utils-map
    // #docregion systemjs-graphql-server-map
    'deprecated-decorator': 'npm:deprecated-decorator',
    'node-uuid': 'npm:node-uuid',
    'uuid': 'npm:uuid',
    'iterall': 'npm:iterall',
    'lodash': 'npm:lodash',
    'rxjs': 'npm:rxjs',
    'subscriptions-transport-ws': 'npm:subscriptions-transport-ws',
    'backo2': 'npm:backo2',
    'eventemitter3': 'npm:eventemitter3',
    'lodash.isstring': 'npm:lodash.isstring',
    'lodash.isobject': 'npm:lodash.isobject',
    'lodash.assign': 'npm:lodash.assign',
    'd3-selection': 'npm:d3-selection',
    'd3-scale': 'npm:d3-scale',
    'd3-shape': 'npm:d3-shape',
    'd3-path': 'npm:d3-path',
    'd3-array': 'npm:d3-array',
    'd3-collection': 'npm:d3-collection',
    'd3-interpolate': 'npm:d3-interpolate',
    'd3-format': 'npm:d3-format',
    'd3-time': 'npm:d3-time',
    'd3-time-format': 'npm:d3-time-format',
    'd3-color': 'npm:d3-color',
    '@agm/core': 'npm:@agm/core/core.umd.js',
    'ws': 'npm:ws',
    'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
  };

  let packages = {
    app: {
      defaultExtension: 'js',
      meta: {
        './*.js': {
          loader: 'systemjs-angular-loader.js'
        }
      }
    },
    'redux': { format: 'cjs', defaultExtension: 'js' },
    'symbol-observable': { main: './index.js', defaultExtension: 'js' },
    'backo2': {
      main: '/index.js',
      defaultExtension: 'js',
    },
    'd3-selection': {
      main: 'build/d3-selection.js',
      defaultExtension: 'js',
    },
    'd3-shape': {
      main: 'build/d3-shape.js',
      defaultExtension: 'js',
    },
    'd3-scale': {
      main: 'build/d3-scale.js',
      defaultExtension: 'js',
    },
    'd3-collection': {
      main: 'build/d3-collection.js',
      defaultExtension: 'js',
    },
    'd3-interpolate': {
      main: 'build/d3-interpolate.js',
      defaultExtension: 'js',
    },
    'd3-format': {
      main: 'build/d3-format.js',
      defaultExtension: 'js',
    },
    'd3-time': {
      main: 'build/d3-time.js',
      defaultExtension: 'js',
    },
    'd3-color': {
      main: 'build/d3-color.js',
      defaultExtension: 'js',
    },
    'd3-time-format': {
      main: 'build/d3-time-format.js',
      defaultExtension: 'js',
    },
    'd3-path': {
      main: 'build/d3-path.js',
      defaultExtension: 'js',
    },
    'd3-array': {
      main: 'build/d3-array.js',
      defaultExtension: 'js',
    },
    'eventemitter3': {
      main: '/index.js',
      defaultExtension: 'js',
    },
    'lodash.isstring': {
      main: '/index.js',
      defaultExtension: 'js',
    },
    'lodash.isobject': {
      main: '/index.js',
      defaultExtension: 'js',
    },
    'lodash.assign': {
      main: '/index.js',
      defaultExtension: 'js',
    },
    'ws': {
      main: '/index.js',
      defaultExtension: 'js',
    },
    // #enddocregion systemjs-apollo-client-packages

    // #docregion systemjs-apollo-test-utils-packages
    // #docregion systemjs-graphql-server-packages
    'deprecated-decorator': { main: '/bld/index.js', defaultExtension: 'js' },
    'node-uuid': { main: './uuid.js', defaultExtension: 'js' },
    'uuid': { main: './lib/rng-browser.js', defaultExtension: 'js' },
    'iterall': { main: './index.js', defaultExtension: 'js' },
    'lodash': { main: './index.js', defaultExtension: 'js' },
    rxjs: {
      defaultExtension: 'js'
    }
  };
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map,
    // packages tells the System loader how to load when no filename and/or no extension
    packages
  });
})(this);
