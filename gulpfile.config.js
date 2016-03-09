'use strict';

var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './app/dev/';
        this.dist = './app/dist/';

        this.allTypeScript = [
            'typings/main.d.ts',
            this.source + '**/*.ts'
        ];
        this.tsOutputPath = this.dist + 'js';

        this.allHtml = this.source + '**/*.html';
        this.allSass = this.source + '**/*.scss';
        this.cssOutputPath = this.dist + 'css';

        // define 3rd party JS libraries
        this.nodeRoot = './node_modules/';
        this.libFilesJS = [
            this.nodeRoot + 'angular2/bundles/angular2-polyfills.js',
            this.nodeRoot + 'systemjs/dist/system.src.js',
            this.nodeRoot + 'rxjs/bundles/Rx.js',
            this.nodeRoot + 'angular2/bundles/angular2.js'
        ];
        this.libOutputPath = this.dist + 'js';
    }
    return gulpConfig;
})();

module.exports = GulpConfig;