var isPublic = typeof window != "undefined";

(function(global) {
    // map tells the System loader where to look for things
    var map = {
      'app':                    'client', // 'dist',
      '@angular':               (isPublic) ? 'node/@angular' : 'node_modules/@angular',
      'rxjs':                   (isPublic) ? 'node/rxjs' : 'node_modules/rxjs',
      'ng2-bootstrap':          (isPublic) ? 'node/ng2-bootstrap' : 'node_modules/ng2-bootstrap',
      'moment':                 (isPublic) ? 'node/moment/moment.js' : 'node_modules/moment/moment.js',
      'angular2-jwt':           (isPublic) ? 'node/angular2-jwt/angular2-jwt.js' : 'node_modules/angular2-jwt/angular2-jwt.js',
      'js-base64':              (isPublic) ? 'node/js-base64/base64.js' : 'node_modules/js-base64/base64.js',
      'buffer':                 '@empty', //jwt buffer
      '@progress':              (isPublic) ? 'node/@progress' : 'node_modules/@progress',
      '@telerik':               (isPublic) ? 'node/@telerik' : 'node_modules/@telerik',
      'chroma-js':              (isPublic) ? 'node/chroma-js/chroma.js' : 'node_modules/chroma-js/chroma.js'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
      'app':                            { main: 'main.js',  defaultExtension: 'js' },
      'rxjs':                           { defaultExtension: 'js' },
      'ng2-bootstrap':                  { defaultExtension: 'js' },
      '@telerik/kendo-draggable':       { main: './dist/npm/js/main.js', defaultExtension: 'js' },
      '@telerik/kendo-intl':            { main: './dist/npm/js/main.js', defaultExtension: 'js' },
      '@progress/kendo-angular-charts': { main: './dist/npm/js/main.js', defaultExtension: 'js' },
      '@progress/kendo-angular-intl':   { main: './dist/npm/js/main.js', defaultExtension: 'js' },
      '@progress/kendo-angular-popup':  { main: './dist/npm/js/main.js', defaultExtension: 'js' },
      '@progress/kendo-charts':         { main: './dist/npm/js/main.js', defaultExtension: 'js' },
      '@progress/kendo-popup-common':   { main: './dist/npm/js/main.js', defaultExtension: 'js' },
      '@progress/kendo-drawing':        { main: './dist/npm/js/main.js', defaultExtension: 'js' }
    };
    var ngPackageNames = [
      'common',
      'forms',
      'compiler',
      'core',
      'router',
      'http',
      'platform-browser',
      'platform-browser-dynamic'
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
      packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
      packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
      map: map,
      packages: packages
    };
    System.config(config);
})(this);